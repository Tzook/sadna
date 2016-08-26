import {SongsListRouter} from '../songs-list/songs-list.router';
import {AddSongRouter} from '../add-song/add-song.router';
import {SongsRouter} from '../routers/server-songs.router';
import {Injectable} from '@angular/core';

@Injectable()
export class ServerRouter {
    private app: any;

    constructor(
        private songsRouter: SongsRouter,
        private addSongRouter: AddSongRouter,
        private songsListRouter: SongsListRouter
    ) {

    }

    init (app) {
        this.app = app;
        let routers = [
            this.songsRouter,
            this.addSongRouter,
            this.songsListRouter,
        ];
        for (let i = 0, l = routers.length; i < l; i++) {
            routers[i].init(this.app);
        }
    }
}