import {Injectable} from '@angular/core';
import {DbService} from '../main/server-db';
import {Song, SongResult, Word, WordResult, WordInSong, WordInSongResult, DbError} from '../db/server-db.model';

@Injectable()
export class GroupsService
{
    private _dbClient: any;
    constructor(private _dbService: DbService) {}
    get dbClient () {
        return this._dbClient = this._dbClient || this._dbService.dbClient;
    }
    /**
     * Will get words in order in all songs
     */
    getWordGroupPossibilities(words:string[]) : Promise<WordInSong[]>{
        console.info(`getting list of words for ${words.toString}`);
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            // running safe insert, since song name must be unique
            dbClient.query(`
            CREATE OR REPLACE FUNCTION next_word(s_id int, cur_col int, cur_row int, w_val text, word_vals text[])
	            RETURNS SETOF word_in_song AS
            $$
            DECLARE
                l int;
                n1_col int;
                n2_row int;
            BEGIN
                if word_vals = '{}' then
                    return query 
                        select * from word_in_song
                            where
                                song_id = s_id
                                and word_id in (
                                    select id from words
                                        where value = w_val
                                )
                                and col = cur_col
                                and row = cur_row;
                else
                    l := array_length(word_vals, 1);
                    n1_col := cur_col + 1;
                    n2_row := cur_row + 1;
                    return query
                        with n1 as (
                            select * from next_word(s_id, n1_col, cur_row, word_vals[1], word_vals[2:l])
                        ),
                        n2 as (
                            select * from next_word(s_id, 0, n2_row, word_vals[1], word_vals[2:l])
                                where not exists (
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
                                where value = w_val
                            )
                            and col = cur_col
                            and row = cur_row
                        )
                        select * from r where exists (select * from n1) union select * from n1
                        union
                        select * from r where exists (select * from n2) union select * from n2;
                end if;
                RETURN;          
            END
            $$ LANGUAGE plpgsql;

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
                            WHERE value = word_val)
                loop
                    return query
                        select * from
                            next_word(r.song_id, r.col, r."row", word_val, word_vals);
                end loop;
                RETURN;  
            END
            $$ LANGUAGE plpgsql;

            select * from first_word($1, $2);
            `, [words.shift(), words],
            (e: DbError, result: WordInSongResult) => {
                if (e) reject (e);
                else {
                    console.info(`getting list of words for ${words.toString}`);
                    resolve(result);
                }
            })
        });
    }
}