import {SongsService} from '../songs/server-songs.service';
import {Song, SongResult} from '../db/server-db.model';
import {Injectable} from '@angular/core';

@Injectable()
export class SongsRouter {
    private _app: any;

    constructor(private _songsService: SongsService) {}

    init (app) {
        this._app = app;
        this._songsService.selectSongs()
            .then((result: SongResult) => {
                console.log('rows', result.rows);
            });
    }  
}