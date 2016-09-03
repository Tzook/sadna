import {Injectable} from '@angular/core';
import {SongsService} from '../../songs/server-songs.service';
import {GroupsService} from '../../groups/server-groups.service';
import {WordsService} from '../../words/server-words.service';
import {DbService} from '../server-db';
import * as xml2js from 'xml2js';
import {Song, SongResult, Group, GroupResult, Word, WordResult, WordInSong, WordInSongResult,
    WordInGroup, WordInGroupResult, DbError} from '../server-db.model';

@Injectable()
export class XmlService {

    private _dbClient: any;
    private _parser : xml2js.Parser;
    private _builder : xml2js.Builder;
    constructor(private _dbService: DbService,
                private _songsService: SongsService,
                private _groupsService: GroupsService,
                private _wordsService: WordsService) {

        this._parser = new xml2js.Parser();
        this._builder = new xml2js.Builder();
    }

    get dbClient () {
        return this._dbClient = this._dbClient || this._dbService.dbClient;
    }

    /**
     * Create xml file string for the whole DB
     */
    public backupToXml() : Promise<string> {
        return new Promise((resolve, reject) => {

        let xmlData = '',
            promiseLand = [
                this._songsService.selectSongs(),
                this._groupsService.selectGroups(),
                this._wordsService.selectWords(),
                this._wordsService.selectWordInGroup(),
                this._wordsService.selectWordInSong(),
            ];

        Promise.all<any>(promiseLand)
            .then((promises: any[]) => {
                let songs : Song[] = promises[0].rows,
                    groups : Group[] = promises[1].rows,
                    words : Word[] = promises[2].rows,
                    wordInGroup: WordInGroup[] = promises[3].rows,
                    wordInSong: WordInSong[] = promises[4].rows;

                xmlData = this._builder.buildObject({
                    songs: songs,
                    groups: groups,
                    words: words,
                    wordInGroup: wordInGroup,
                    wordInSong: wordInSong,
                });
                resolve(xmlData);
            })
            .catch(err => {
                console.log('err');
                reject(err);
            })
        });
    }

    /**
     * Backup from an xml string to the DB
     * The xml object will have root and in this the original object will sit
     * Also, note that everything from the xml is a string,
     *     so for int need to cast and for boolean need to check if -> expression === 'true';
     */
    public backupFromXml(xmlData: string) : Promise<boolean> {
        return new Promise((resolve, reject) => {
            this._parser.parseString(xmlData, (err: any, restoredObj: any) => {
                if (err) {
                    reject(err);
                } else {
                    let firstPromiseLand = [];
                    if (restoredObj.root.songs) {
                        firstPromiseLand.push(this.restoreSongsTable(restoredObj.root.songs));
                    }
                    if (restoredObj.root.groups) {
                        firstPromiseLand.push(this.restoreGroupsTable(restoredObj.root.groups));
                    }
                    if (restoredObj.root.words) {
                        firstPromiseLand.push(this.restoreWordsTable(restoredObj.root.words));
                    }

                    Promise.all(firstPromiseLand)
                        .then(r => {
                            let secondPromiseLand = [];
                            // We do the second promises for tables that have foreign keys
                            if (restoredObj.root.wordInGroup) {
                                secondPromiseLand.push(this.restoreWordInGroupTable(restoredObj.root.wordInGroup));
                            }
                            if (restoredObj.root.wordInSong) {
                                secondPromiseLand.push(this.restoreWordInSongTable(restoredObj.root.wordInSong));
                            }
                            Promise.all(secondPromiseLand)
                                .then(r2 => {
                                    resolve(true);
                                })
                                .catch(e => {
                                    console.log(e);
                                    reject(e);
                                });
                        })
                        .catch(e => {
                            console.log(e);
                            reject(e);
                        });
                }
            });
        });
    }

    /**
     * Restore songs query
     */
    private restoreSongsTable(rows: {id:string, path: string, name:string, composer:string, writer:string}[]) : Promise<boolean> {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient,
                bindings = [],
                query = `
                    INSERT INTO songs (id, path, name, writer, composer)
                        values`;
            for (let j,i = 0, l = rows.length*5; i < l; i+=5) {
                j = i/5;
                query = `${query}
                        ($${i+1}, $${i+2}, $${i+3}, $${i+4}, $${i+5})${i === l - 5 ? '' : ','}`;

                bindings.push(Number(rows[j].id), rows[j].path || null, rows[j].name,
                    rows[j].writer || null, rows[j].composer || null);
            }
            query = `${query}
                ON CONFLICT DO NOTHING;`;
            dbClient.query(query, bindings, (e: DbError, result: any) => {
                  if (e) reject (e);
                  else resolve(result);
            });
        });
    }

    /**
     * Restore groups query
     */
    private restoreGroupsTable(rows: {id:string, name: string, is_expression:string}[]) {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient,
                bindings = [],
                query = `
                INSERT INTO groups (id, name, is_expression)
                    values`;
            for (let j,i = 0, l = rows.length*3; i < l; i+=3) {
                j = i/3;
                query = `${query}
                        ($${i+1}, $${i+2}, $${i+3})${i === l - 3 ? '' : ','}`;

                bindings.push(Number(rows[j].id), rows[j].name, (rows[j].is_expression === 'true'));
            }
            query = `${query}
                ON CONFLICT DO NOTHING;`;
            dbClient.query(query, bindings, (e: DbError, result: any) => {
                  if (e) reject (e);
                  else resolve(result);
            });
        });
    }

    /**
     * Restore words query
     */
    private restoreWordsTable(rows: {id:string, value: string, is_punctuation:string}[]) {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient,
                bindings = [],
                query = `
                INSERT INTO words (id, value, is_punctuation)
                    values`;
            for (let j,i = 0, l = rows.length*3; i < l; i+=3) {
                j = i/3;
                query = `${query}
                        ($${i+1}, $${i+2}, $${i+3})${i === l - 3 ? '' : ','}`;

                bindings.push(Number(rows[j].id), rows[j].value, (rows[j].is_punctuation === 'true'));
            }
            query = `${query}
                ON CONFLICT DO NOTHING;`;
            dbClient.query(query, bindings, (e: DbError, result: any) => {
                  if (e) reject (e);
                  else resolve(result);
            });
        });
    }

    /**
     * Restore word_in_group query
     */
    private restoreWordInGroupTable(rows: {id:string, group_id: string, word_id:string}[]) {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient,
                bindings = [],
                query = `
                INSERT INTO word_in_group (id, group_id, word_id)
                    values`;
            for (let j,i = 0, l = rows.length*3; i < l; i+=3) {
                j = i/3;
                query = `${query}
                        ($${i+1}, $${i+2}, $${i+3})${i === l - 3 ? '' : ','}`;

                bindings.push(Number(rows[j].id), Number(rows[j].group_id), Number(rows[j].word_id));
            }
            query = `${query}
                ON CONFLICT DO NOTHING;`;
            dbClient.query(query, bindings, (e: DbError, result: any) => {
                  if (e) reject (e);
                  else resolve(result);
            });
        });
    }

    /**
     * Restore word_in_song query
     */
    private restoreWordInSongTable(rows: {id: string, song_id: string, word_id: string, col: string, row: string, house: string, sentence: string, word_num: string}[]) {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient,
                bindings = [],
                query = `
                INSERT INTO word_in_song (id, song_id, word_id, col, row, house, sentence, word_num)
                    values`;
            for (let j,i = 0, l = rows.length*8; i < l; i+=8) {
                j = i/8;
                query = `${query}
                        ($${i+1}, $${i+2}, $${i+3}, $${i+4}, $${i+5}, $${i+6}, $${i+7}, $${i+8})${i === l - 8 ? '' : ','}`;

                bindings.push(Number(rows[j].id), Number(rows[j].song_id), Number(rows[j].word_id), Number(rows[j].col), Number(rows[j].row),
                                Number(rows[j].house), Number(rows[j].sentence), Number(rows[j].word_num));
            }
            query = `${query}
                ON CONFLICT DO NOTHING;`;
            dbClient.query(query, bindings, (e: DbError, result: any) => {
                  if (e) reject (e);
                  else resolve(result);
            });
        });
    }
}