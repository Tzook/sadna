import {ViewSongRouter} from '../view-song/view-song.router';
import {SongsListRouter} from '../songs-list/songs-list.router';
import {AddSongRouter} from '../add-song/add-song.router';
import {SongsRouter} from '../routers/server-songs.router';
import {XmlRouter} from '../db/backup/xml.router';
import {Injectable} from '@angular/core';

@Injectable()
export class ServerRouter {
    private app: any;

    constructor(
        private songsRouter: SongsRouter,
        private addSongRouter: AddSongRouter,
        private songsListRouter: SongsListRouter,
        private viewSongRouter: ViewSongRouter,
        private xmlRouter: XmlRouter
    ) {

    }

    init (app) {
        this.app = app;
        let routers = [
            this.songsRouter,
            this.addSongRouter,
            this.songsListRouter,
            this.xmlRouter,
            this.viewSongRouter,
        ];
        for (let i = 0, l = routers.length; i < l; i++) {
            routers[i].init(this.app);
        }
    }
}