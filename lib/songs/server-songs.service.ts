import {Injectable} from '@angular/core';
import {DbService} from '../db/server-db';
import {WordsService} from '../words/server-words.service';
import {Song, SongResult, Word, WordResult, WordInSong,
    WordInSongResult, CompleteSong, CompleteSongResult,
    SongStatisticsRowsResult, SongStatisticsHousesResult, DbError} from '../db/server-db.model';

@Injectable()
export class SongsService
{
    private _dbClient: any;
    constructor(private _dbService: DbService,
                 private _wordsService: WordsService) {}

    /**
     * Insert song safe to songs table
     */
    insertSong(song: Song) : Promise<SongResult>
    {
        console.info(`inserting song ${song.name}`);
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            // running safe insert, since song name must be unique
            dbClient.query(`
                WITH s_song AS (
                    SELECT id, name
                    FROM songs
                    WHERE name = $1
                ),
                i_song AS (
                    INSERT INTO songs (name, path, writer, composer)
                    SELECT $1, $2, $3, $4
                    WHERE NOT EXISTS (SELECT 1 FROM s_song)
                    RETURNING id, name
                )
                SELECT id, name
                FROM i_song
                UNION ALL --only one of those will be filled
                SELECT id, name
                FROM s_song
            `, [song.name, song.path, song.writer, song.composer],
            (e: DbError, result: SongResult) => {
                if (e) reject (e);
                else {
                    console.info(`done inserting song ${song.name}`);
                    resolve(result);
                }
            })
        });
    }

    /**
     * Load a song in the DB, from a song and all it's components
     */
    loadSong(song:Song, words:Word[], wordInSong: WordInSong[]) : Promise<boolean> {
        return new Promise((resolve, reject) => {
            console.log(`start loading song ${song.name} with ${words.length} words.`);
            let promiseLand = [],
                wordPromises = [],
                song_id = null;

            promiseLand.push(this.insertSong(song));
            promiseLand.push(this._wordsService.insertWords(words));

            Promise.all(promiseLand)
                .then(promiseLandRes => {
                    console.log(`resolved words and song for ${song.name}`);
                    let songResult: SongResult = promiseLandRes.shift(),
                        song_id : number = songResult.rows[0].id;

                    this._wordsService.insertWordsInSong(wordInSong, words, song_id)
                        .then(wordPromisesRes => {
                            console.log(`resolved all for ${song.name}`);
                            resolve(true);
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    }

    selectSongs() : Promise<SongResult> {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            dbClient.query(`
                SELECT * FROM songs;
            `,
            (e: DbError, result: SongResult) => {
                if (e) reject (e);
                else resolve(result);
            });
        });
    }

    selectSongsByWord(word: string) : Promise<SongResult> {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            dbClient.query(`
                select distinct s.name, s.id, s.writer, s.composer
                from
                    word_in_song w,
                    words ww,
                    songs s
                where
                    lower(ww.value) = $1
                    and ww.id = w.word_id
                    and s.id = w.song_id;
            `, [word],
            (e: DbError, result: SongResult) => {
                if (e) reject (e);
                else resolve(result);
            });
        });
    }

    /**
     * Get all the words in a song
     */
    getCompleteSongById(id: number) : Promise <CompleteSongResult> {
        return new Promise((resolve, reject) => {
            console.log(`getting complete song for id: ${id}`);
            let dbClient = this.dbClient;
            dbClient.query(`
                select w.id, w.song_id, w.word_id, ww.value as word_value, ww.is_punctuation, w.col, w."row", w.house, w.sentence, w.word_num
                from
                    word_in_song w,
                    words ww
                where
                    w.song_id = $1
                    and ww.id = w.word_id;
            `, [id],
            (e: DbError, result: CompleteSongResult) => {
                if (e) reject (e);
                else {
                    console.log(`done getting complete song for id: ${id}`);
                    resolve(result);
                }
            });
        });
    }

    /**
     * Stats for amount of words and letters in a song rows,
     * With this we can also show the amount of words and letters overall in a song
     */
    selectSongStatisticsRows(songId: number) : Promise<SongStatisticsRowsResult> {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            dbClient.query(`
                select s.id, ws.row, count(ws.id) as words_count, sum(char_length(w.value)) as letters_sum
                    from word_in_song ws inner join songs s on ws.song_id = s.id
                    inner join words w on ws.word_id = w.id
                    where song_id = $1
                    group by ws.row, s.id;
            `, [songId],
            (e: DbError, result: SongStatisticsRowsResult) => {
                if (e) reject (e);
                else {
                    resolve(result);
                }
            });
        });
    }

    /**
     * Stats for amount of words and letters in a song houses,
     * With this we can also show the amount of words and letters overall in a song
     */
    selectSongStatisticsHouses(songId: number) : Promise<SongStatisticsHousesResult> {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            dbClient.query(`
                select s.id, ws.house, count(ws.id) as words_count, sum(char_length(w.value)) as letters_sum
                    from word_in_song ws inner join songs s on ws.song_id = s.id
                    inner join words w on ws.word_id = w.id
                    where song_id = $1
                    group by ws.house, s.id;
            `, [songId],
            (e: DbError, result: SongStatisticsHousesResult) => {
                if (e) reject (e);
                else {
                    resolve(result);
                }
            });
        });
    }

    get dbClient () {
        return this._dbClient = this._dbClient || this._dbService.dbClient;
    }

    /**
     * Mock loader to check that everything is going well
     */
    mockLoader() : Promise<boolean> {
        return new Promise((resolve, reject) => {
            let song: Song = {
                name: 'noamel_song44',
            }
            let words : Word[] = [];
            let wordsInSong : WordInSong[] = [];
            let val = 'word';
            for (let i = 0; i < 50; i++) {
                words.push({
                    value: `${val}_${i}`,
                    is_punctuation: false,
                });
                wordsInSong.push({
                    col: i,
                    row: 1 + i,
                    house: 1,
                    sentence: i,
                    word_num: i + 2,
                });
            }
            this.loadSong(song, words, wordsInSong)
                .then(() => {
                    console.log('done!!');
                    resolve(true);
                })
                .catch(e => {
                    console.log('error', e);
                    reject(e);
                });
        });
    }
}