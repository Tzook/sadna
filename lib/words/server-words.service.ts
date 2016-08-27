import {Injectable} from '@angular/core';
import {DbService} from '../main/server-db';
import {Word, WordResult, WordInSong, WordInSongResult,
    WordInGroup, WordInGroupResult, CompleteSongResult, DbError} from '../db/server-db.model';

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
            let dbClient = this.dbClient,
                bindings = [], query = `
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

    // deprecated - delete later
    /**
     * Insert word in song safe to word_in_song table
     */
    // insertWordInSong(wordInSong: WordInSong) : Promise<WordInSongResult> {
    //     console.info(`inserting word in song id: ${wordInSong.song_id} and word id: ${wordInSong.word_id}`);
    //     return new Promise((resolve, reject) => {
    //         let dbClient = this.dbClient;
    //         // running safe insert, since word in song value must be unique
    //         dbClient.query(`
    //             WITH s_wis AS (
    //                 SELECT id, song_id, word_id, col, "row", house, sentence, word_num
    //                 FROM word_in_song
    //                 WHERE song_id = $1 AND word_id = $2 AND col = $3 AND "row" = $4 AND house = $5 AND sentence = $6 AND word_num = $7
    //             ),
    //             i_wis AS (
    //                 INSERT INTO word_in_song (song_id, word_id, col, "row", house, sentence, word_num)
    //                 SELECT $1, $2, $3, $4, $5, $6, $7
    //                 WHERE NOT EXISTS (SELECT 1 FROM s_wis)
    //                 RETURNING id
    //             )
    //             SELECT id
    //             FROM s_wis
    //             UNION ALL
    //             SELECT id
    //             FROM i_wis;
    //         `, [wordInSong.song_id, wordInSong.word_id, wordInSong.col, wordInSong.row, wordInSong.house, wordInSong.sentence, wordInSong.word_num],
    //         (e: DbError, result: WordInSongResult) => {
    //             if (e) reject (e);
    //             else {
    //                 console.info(`inserting word in song id: ${wordInSong.song_id} and word id: ${wordInSong.word_id}`);
    //                 resolve(result);
    //             }
    //         });
    //     });
    // }

    // /**
    //  * Insert word safe to words table
    //  */
    // insertWord(word: Word) : Promise<WordResult>
    // {
    //     console.info(`inserting word ${word.value}`);
    //     return new Promise((resolve, reject) => {
    //         let dbClient = this.dbClient;
    //         // running safe insert, since word value must be unique
    //         dbClient.query(`
    //             WITH s_word AS (
    //                 SELECT id, value
    //                 FROM words
    //                 WHERE value = $1
    //             ),
    //             i_word AS (
    //                 INSERT INTO words (value, is_punctuation)
    //                 SELECT $1, $2
    //                 WHERE NOT EXISTS (SELECT 1 FROM s_word)
    //                 RETURNING id, value
    //             )
    //             SELECT id, value
    //             FROM i_word
    //             UNION ALL
    //             SELECT id, value
    //             FROM s_word
    //         `, [word.value, word.is_punctuation],
    //         (e: DbError, result: WordResult) => {
    //             if (e) reject (e);
    //             else {
    //                 console.info(`done inserting word ${word.value}`);
    //                 resolve(result);
    //             }
    //         });
    //     });
    // }
}