import {SongAnalyzeService} from '../songs/song-analyze.service';
import {SongsService} from '../songs/server-songs.service';
import {AddSong} from './add-song.model';
import {Injectable} from '@angular/core';
import * as e from "express";

@Injectable()
export class AddSongController {

    constructor(private songAnalyzeService: SongAnalyzeService,
                private songsService: SongsService) {}

    public processSong(req: e.Request, res: e.Response, next: Function) {
        let model: AddSong = req.body.model;

        this.songAnalyzeService.analyze(model.text)
            .then(resultWords => {
                req.body.words = resultWords.words;
                req.body.wordsInSong = resultWords.wordsInSong;
                next();
            });
    }

    public insertSong(req: e.Request, res: e.Response, next: Function) {
        this.songsService.loadSong(req.body.model, req.body.words, req.body.wordsInSong)
            .then(() => res.send())
            .catch(e => next(e));
    }
}