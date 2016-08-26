import {AddSongMiddleware} from './add-song.middleware';
import {ADD_SONG_URL} from './add-song.constants';
import {Injectable} from '@angular/core';

@Injectable()
export class AddSongRouter {
    constructor(private addSongMiddleware: AddSongMiddleware) { }

    init(app) {
        app.post(ADD_SONG_URL,
            this.addSongMiddleware.validateRequest.bind(this.addSongMiddleware));
    }
}