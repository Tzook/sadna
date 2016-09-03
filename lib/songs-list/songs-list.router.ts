import {SongsListController} from './songs-list.controller';
import {GET_SONGS_LIST_URL, GET_SONGS_BY_WORD_URL} from './songs-list.constants';
import {Injectable} from '@angular/core';

@Injectable()
export class SongsListRouter {

    constructor(private songsListController: SongsListController) { }

    init(app) {
        app.get(GET_SONGS_LIST_URL,
                this.songsListController.returnSongs.bind(this.songsListController));

        app.get(GET_SONGS_BY_WORD_URL,
                this.songsListController.returnSongsByWord.bind(this.songsListController));
    }
}