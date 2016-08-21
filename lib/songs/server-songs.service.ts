import {Injectable} from '@angular/core';
import {DbService} from '../main/server-db';
import {Song, SongResult, DbError} from '../db/server-db.model';

@Injectable()
export class SongsService
{
    private _dbClient: any;
    constructor(private _dbService: DbService) {}

    insertSong(song: Song) : Promise<SongResult|DbError>
    {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            dbClient.query(`
                INSERT INTO songs (name, path, writer, composer)
                    values ($1, $2, $3, $4);
            `, [song.name, song.path, song.writer, song.composer],
            (e: DbError, result: SongResult) => {
                if (e) reject (e);
                else resolve(result);
            })
        });
    }

    selectSongs() {
        return new Promise((resolve, reject) => {
            let dbClient = this.dbClient;
            dbClient.query(`
                SELECT * FROM songs;
            `,
            (e: DbError, result: SongResult) => {
                if (e) reject (e);
                else resolve(result);
            })
        });
    }

    get dbClient () {
        return this._dbClient = this._dbClient || this._dbService.dbClient;
    }
}