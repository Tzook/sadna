import {SongResult} from '../db/server-db.model';
import {Injectable} from '@angular/core';
import {SongsService} from '../songs/server-songs.service';
import * as e from "express";

@Injectable()
export class SongsListController {

    constructor(private songsService: SongsService) { }

    public returnSongs(req: e.Request, res: e.Response, next: Function) {
        this.songsService.selectSongs()
            .then((result: SongResult) => {
                res.send(result.rows);
            })
            .catch(e => {
                next("Error while fetching songs list" + e);
            });
    }

    public returnSongsByWord(req: e.Request, res: e.Response, next: Function) {
        this.songsService.selectSongsByWord(req.params.word)
            .then((result: SongResult) => {
                res.send(result.rows);
            })
            .catch(e => {
                next("Error while fetching songs list by word" + e);
            });
    }
}