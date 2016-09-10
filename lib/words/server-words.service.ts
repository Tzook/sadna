import {Injectable} from '@angular/core';
import {DbService} from '../db/server-db';
import {Word, WordResult, WordInSong, WordInSongResult,
    WordInGroup, WordInGroupResult, CompleteSongResult,
    WordStatistics, WordStatisticsResult,  DbError} from '../db/server-db.model';

@Injectable()
export class WordsService
{
    private _dbClient: any;
    constructor(private _dbService: DbService) {}

    get dbClient () {
        return this._dbClient = this._dbClient || this._dbService.dbClient;
    }

    /**
     * Insert words to words table
     */
    insertWords(words: Word[]) : Promise<WordResult>
    {
        console.info(`inserting words amount ${words.length}`);
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            let bindings = [], query = `
                INSERT INTO words (value, is_punctuation)
                    values`;
            for (let i = 0, l = words.length*2; i < l; i+=2) {
                query = `${query}
                        ($${i+1}, $${i+2})${i === l - 2 ? '' : ','}`;

                bindings.push(words[i/2].value, words[i/2].is_punctuation || false);
            }
            query = `${query}
                        ON CONFLICT DO NOTHING;`;
            dbClient.query(query, bindings, (e: DbError, result: WordResult) => {
                if (e) reject (e);
                else {
                    console.info(`done inserting word ${words.length}`);
                    resolve(result);
                }
            });
        });
    }

    /**
     * Insert words to word_in_song table
     */
    insertWordsInSong(wordsInSong: WordInSong[], words: Word[], song_id: number) : Promise<WordInSongResult> {
        console.info(`inserting word in song id: ${song_id} and words length is: ${wordsInSong.length}`);
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient,
                j,
                bindings = [], query = `
                INSERT INTO word_in_song (song_id, word_id, col, "row", house, sentence, word_num)
                    values`;
            for (let i = 0, l = wordsInSong.length*6; i < l; i+=6) {
                j = i/6;
                query = `${query}
                        (${song_id}, (SELECT id FROM words
                            WHERE value = $${i+1}
                        ), $${i+2}, $${i+3}, $${i+4}, $${i+5}, $${i+6})${i === l - 6 ? '' : ','}`;

                bindings.push(words[j].value, wordsInSong[j].col, wordsInSong[j].row,
                    wordsInSong[j].house, wordsInSong[j].sentence, wordsInSong[j].word_num);
            }
            query = `${query}
                        ON CONFLICT DO NOTHING;`;
            dbClient.query(query, bindings, (e: DbError, result: WordInSongResult) => {
                if (e) reject (e);
                else {
                    console.info(`done inserting word in song id: ${song_id} and words length was: ${wordsInSong.length}`);
                    resolve(result);
                }
            });
        });
    }

    /**
     * Insert words to word_in_group table
     */
    insertWordsInGroup(words: Word[], group_id: number) : Promise<WordInGroupResult> {
        console.info(`inserting word in group id: ${group_id} and words length is: ${words.length}`);
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            let bindings = [];
            let query = `
                INSERT INTO word_in_group (group_id, word_id)
                    values`;
            for (let i = 0, l = words.length; i < l; i++) {
                query = `${query}
                        (${group_id}, (SELECT id FROM words
                            WHERE value = $${i+1})
                        )${i === l - 1 ? '' : ','}`;

                bindings.push(words[i].value);
            }
            query = `${query}
                        ON CONFLICT DO NOTHING;`;
            dbClient.query(query, bindings, (e: DbError, result: WordInGroupResult) => {
                if (e) reject (e);
                else {
                    console.info(`done inserting word in group id: ${group_id} and words length was: ${words.length}`);
                    resolve(result);
                }
            });
        });
    }

    removeWordsInGroup(group_id: number): Promise<boolean> {
        console.info(`removing word in group id: ${group_id}`);
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;

            dbClient.query(
                `delete
                 from word_in_group
                 where group_id = $1;`,
                [group_id],
                (e: DbError, result: WordInGroupResult) => {
                    if (e) reject (e);
                    else {
                        console.info(`deleted rows successfully`);
                        resolve(true);
                    }
                }
            );
        });
    }

    /**
     * Select all the words
     */
    selectWords() : Promise<WordResult> {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            dbClient.query(`
                SELECT * FROM words;
            `,
            (e: DbError, result: WordResult) => {
                if (e) reject (e);
                else resolve(result);
            });
        });
    }

    selectUniqueWords() : Promise<WordResult> {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            dbClient.query(`
                SELECT DISTINCT lower(value) as value
                FROM words w
                WHERE w.is_punctuation = false
                ORDER BY value;
            `,
            (e: DbError, result: WordResult) => {
                if (e) reject (e);
                else resolve(result);
            });
        });
    }

    /**
     * This selects all occournces of words what so ever
     * Add here limit if this becomes slow
     */
    selectWordsEverywhere() : Promise<CompleteSongResult> {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            dbClient.query(`
                select s.name as song_name, w.song_id, w.word_id, ww.value as word_value, ww.is_punctuation, w.col, w."row", w.house, w.sentence, w.word_num
            	from
            		songs s,
            		word_in_song w,
            		words ww;
            `,
            (e: DbError, result: WordResult) => {
                if (e) reject (e);
                else resolve(result);
            });
        });
    }

    /**
     * Select all word_in_song table
     */
    selectWordInSong() : Promise<WordInSongResult> {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            dbClient.query(`
                SELECT * FROM word_in_song;
            `,
            (e: DbError, result: WordInSongResult) => {
                if (e) reject (e);
                else resolve(result);
            })
        });
    }

    /**
     * Select all word_in_group table
     */
    selectWordInGroup() : Promise<WordInGroupResult> {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            dbClient.query(`
                SELECT * FROM word_in_group;
            `,
            (e: DbError, result: WordInGroupResult) => {
                if (e) reject (e);
                else resolve(result);
            })
        });
    }

    /**
     * This returns a WordStatistics Result obj
     * With a lot of stats for all words:
     *     you can limit the query to some words by providing a string array and also a specific song by providing a song id
     */
    selectWordStatistics(words?: string[], songId?: number) : Promise<WordStatisticsResult> {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient,
            query,
            bindings = [];

            query = `
                select w.id, w.value, w.is_punctuation, count(ws.id) as word_count, char_length(w.value) as word_length
                    from word_in_song ws inner join words w on ws.word_id = w.id
                    ${songId ? `where ws.song_id = ${songId}` : ``}`;
            if (words && words.length) {
                query = `${query}
                    ${songId ? `and` : `where`} UPPER(w.value) in (`;
                for (let i = 0, l = words.length; i < l; i++) {
                    query = `${query}UPPER($${i+1})${i === l - 1 ? ')' : ','}`;
                    bindings.push(words[i]);
                }
            }
            query = `${query}
                    group by ws.word_id, w.id;`;
            console.log(query);
            dbClient.query(query, bindings,
            (e: DbError, result: WordInGroupResult) => {
                if (e) reject (e);
                else resolve(result);
            })
        });
    }
}