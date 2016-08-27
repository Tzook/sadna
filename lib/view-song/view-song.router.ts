import {ViewSongController} from './view-song.controller';
import {GET_SONG_URL} from './view-song.constants';
import {Injectable} from '@angular/core';

@Injectable()
export class ViewSongRouter {

    constructor(private viewSongController: ViewSongController) { }

    init(app) {
        app.get(GET_SONG_URL,
                this.viewSongController.returnSong.bind(this.viewSongController));
    }
}