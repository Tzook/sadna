import {SongResult} from '../db/server-db.model';
import {Injectable} from '@angular/core';
import {SongsService} from '../songs/server-songs.service';
import * as e from "express";

@Injectable()
export class ViewSongController {

    constructor(private songsService: SongsService) { }

    public returnSong(req: e.Request, res: e.Response, next: Function) {
        this.songsService.getCompleteSongById(req.params.id)
            .then(result => res.send(result.rows))
            .catch(e => next("Error while fetching song " + e));
    }
}