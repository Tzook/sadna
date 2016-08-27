import {AddSongController} from './add-song.controller';
import {AddSongMiddleware} from './add-song.middleware';
import {ADD_SONG_URL} from './add-song.constants';
import {Injectable} from '@angular/core';

@Injectable()
export class AddSongRouter {
    constructor(private addSongMiddleware: AddSongMiddleware,
                private addSongController: AddSongController) { }

    init(app) {
        app.post(ADD_SONG_URL,
            this.addSongMiddleware.validateRequest.bind(this.addSongMiddleware),
            this.addSongController.processSong.bind(this.addSongController),
            this.addSongController.insertSong.bind(this.addSongController));
    }
}