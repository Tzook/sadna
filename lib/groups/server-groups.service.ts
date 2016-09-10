import {Injectable} from '@angular/core';
import {DbService} from '../db/server-db';
import {WordsService} from '../words/server-words.service';
import {Group, GroupResult, Word, WordResult, WordInSong, WordInSongResult,
    WordInGroup, WordInGroupResult, CompleteWordInGroupResult, DbError} from '../db/server-db.model';

@Injectable()
export class GroupsService
{
    private _dbClient: any;
    constructor(private _dbService: DbService,
                 private _wordsService: WordsService) {}
    get dbClient () {
        return this._dbClient = this._dbClient || this._dbService.dbClient;
    }

    /**
     * Insert song safe to songs table
     */
    insertGroup(group: Group) : Promise<GroupResult>
    {
        console.info(`inserting group ${group.name}`);
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            // running safe insert, since song name must be unique
            dbClient.query(`
                WITH s_group AS (
                    SELECT id, name
                    FROM groups
                    WHERE UPPER(name) like UPPER($1)
                ),
                i_group AS (
                    INSERT INTO groups (name, is_expression)
                    SELECT $1, $2
                    WHERE NOT EXISTS (SELECT 1 FROM s_group)
                    RETURNING id, name
                )
                SELECT id, name
                FROM i_group
                UNION ALL --only one of those will be filled
                SELECT id, name
                FROM s_group
            `, [group.name, group.is_expression],
            (e: DbError, result: GroupResult) => {
                if (e) reject (e);
                else {
                    console.info(`done inserting group ${group.name}`);
                    resolve(result);
                }
            })
        });
    }

    loadGroup(group: Group, words: Word[]) : Promise <boolean> {
        return new Promise((resolve, reject) => {
            console.log(`start loading group ${group.name} with ${words.length} words.`);
            let promiseLand = [],
                wordPromises = [],
                group_id = null;

            promiseLand.push(this.insertGroup(group));
            promiseLand.push(this._wordsService.insertWords(words));

            Promise.all(promiseLand)
                .then(promiseLandRes => {
                    console.log(`resolved words and group for ${group.name}`);
                    let songResult: GroupResult = promiseLandRes.shift(),
                        group_id : number = songResult.rows[0].id;

                    this._wordsService.insertWordsInGroup(words, group_id)
                        .then(wordPromisesRes => {
                            console.log(`resolved all for ${group.name}`);
                            resolve(true);
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }

    updateGroup(id: number, words: Word[]) : Promise <boolean> {
        return new Promise((resolve, reject) => {
            console.log(`start updating group ${id} with ${words.length} words.`);

            this._wordsService.removeWordsInGroup(id)
                .then(() => {
                    return this._wordsService.insertWordsInGroup(words, id);
                })
                .then(wordPromisesRes => {
                    console.log(`resolved all for ${id}`);
                    resolve(true);
                })
                .catch(reject);
        });
    }

    /**
     * Select all groups
     */
    selectGroups() : Promise<GroupResult> {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            dbClient.query(`
                SELECT * FROM groups;
            `,
            (e: DbError, result: GroupResult) => {
                if (e) reject (e);
                else resolve(result);
            })
        });
    }

    selectGroup(id: string) : Promise<CompleteWordInGroupResult> {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            dbClient.query(`
                select wig.id, w.value
                from word_in_group as wig,
                    words as w
                where group_id = $1
                    and w.id = wig.word_id
                order by id;
            `, [id],
            (e: DbError, result: CompleteWordInGroupResult) => {
                if (e) reject (e);
                else resolve(result);
            })
        });
    }

    /**
     * Will get words in order in all songs
     */
    getWordGroupPossibilities(words:string[]) : Promise<WordInSongResult> {
        console.info(`getting list of words for ${ words.toString() }`);
        let startTime = Date.now();
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            // running safe insert, since song name must be unique
            dbClient.query(`
                select distinct s.*
                from first_word($1, $2) as f,
                     songs as s
                where f.song_id = s.id;
            `, [words.shift(), words],
            (e: DbError, result: WordInSongResult) => {
                if (e) reject (e);
                else {
                    console.info(`done! getting list of words for ${ words.toString() } and it took ${ Date.now() - startTime }ms!`);
                    resolve(result);
                }
            })
        });
    }

    /**
     * init the getWordGroupPossibilities needed functions,
     * they should be registered in the db already, but just in case
     */
    initNextWordFunctions() : Promise<boolean>
    {
        let dbClient = this.dbClient;
        return new Promise((resolve, reject) => {
            dbClient.query(`
                CREATE OR REPLACE FUNCTION next_word(s_id int, cur_col int, cur_row int, w_val text, word_vals text[])
                RETURNS SETOF word_in_song AS
                $$
                DECLARE
                    l int;         -- will be set for the word_vals array length
                    n1_col int;    -- will be set to the next possible column with the same row (cur_row, cur_col+1)
                    n2_row int;    -- will be set to the next possible row with the coloumn 0 (cur_row+1, 0)
                BEGIN
                    if word_vals = '{}' then -- this is the stop condition to return the word
                        return query
                            select * from word_in_song
                                where
                                    song_id = s_id
                                    and word_id in (
                                        select id from words
                                            where UPPER(value) like UPPER(w_val)
                                    )
                                    and col = cur_col
                                    and row = cur_row;
                    else
                        l := array_length(word_vals, 1);
                        n1_col := cur_col + 1;
                        n2_row := cur_row + 1;
                        return query -- build n1 as the next column and n2 as the first word in the next row, note that we need to make sure there is no word at all in the next column for using the next row.
                            with n1 as (
                                select * from next_word(s_id, n1_col, cur_row, word_vals[1], word_vals[2:l])
                            ),
                            n2 as (
                                select * from next_word(s_id, 0, n2_row, word_vals[1], word_vals[2:l])
                                    where not exists ( -- make sure n1 is empty
                                        select * from word_in_song
                                            where
                                                song_id = s_id
                                                and col = n1_col
                                                and row = cur_row
                                    )
                            ),
                            r as (
                                select * from word_in_song
                                where
                                song_id = s_id
                                and word_id in (
                                    select id from words
                                    where UPPER(value) like UPPER(w_val)
                                )
                                and col = cur_col
                                and row = cur_row
                            ) -- r is what we want to add n1 or n2 results to, becuase if we got this far than it's value is good
                            select * from r where exists (select * from n1) union select * from n1
                            union
                            select * from r where exists (select * from n2) union select * from n2;
                    end if;
                    RETURN;
                END
                $$ LANGUAGE plpgsql;

                -- this function will look up a word, and for each findings will search if the next set of words
                -- it will resolve that recursivley by adding up the results of either the next column or the next row in column 0
                CREATE OR REPLACE FUNCTION first_word(word_val text, word_vals text[])
                    RETURNS SETOF word_in_song AS
                $$
                DECLARE
                    r word_in_song%rowtype;
                BEGIN
                    for r in select * from word_in_song
                        where word_id in (
                                SELECT id
                                FROM words
                                WHERE UPPER (value) like UPPER(word_val))
                    loop
                        return query
                            select * from
                                next_word(r.song_id, r.col, r."row", word_val, word_vals);
                    end loop;
                    RETURN;
                END
                $$ LANGUAGE plpgsql;
            `,
            (e: DbError, result: any) => {
                if (e) reject(e);
                else resolve(true);
            });
        });
    }

    /**
     * @param {array} arr
     * @returns
     */
    getQueryVarsForArray(arr:any[]) : string {
        let queryVars = ``;
        for (let i = 0, l = arr.length; i < l; i++) {
            queryVars += `$${i+1}${i !== l - 1 ? ',' : ''}`;
        }
        return queryVars;
    }

    /**
     * Mock to check that eveyrthing is working curretly with groups
     */
    mockLoader() : void {
        let group: Group = {
            name: 'noam_group',
            is_expression: false,
        }
        let words : Word[] = [];
        let val = 'word_group';
        for (let i = 0; i < 10; i++) {
            words.push({
                value: `${val}_${i}`,
                is_punctuation: false,
            });
        }
        this.loadGroup(group, words)
            .catch(err => console.log(err));
    }
}