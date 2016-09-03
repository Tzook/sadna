import {ViewWordsRouter} from '../view-words/view-words.router';
import {GroupsRouter} from '../groups/groups.router';
import {ViewSongRouter} from '../view-song/view-song.router';
import {SongsListRouter} from '../songs-list/songs-list.router';
import {AddSongRouter} from '../add-song/add-song.router';
import {XmlRouter} from '../db/backup/xml.router';
import {Injectable} from '@angular/core';

@Injectable()
export class ServerRouter {
    private app: any;

    constructor(
        private addSongRouter: AddSongRouter,
        private songsListRouter: SongsListRouter,
        private viewWordsRouter: ViewWordsRouter,
        private groupsRouter: GroupsRouter,
        private viewSongRouter: ViewSongRouter,
        private xmlRouter: XmlRouter
    ) {

    }

    init (app) {
        this.app = app;
        let routers = [
            this.addSongRouter,
            this.songsListRouter,
            this.viewWordsRouter,
            this.xmlRouter,
            this.viewSongRouter,
            this.groupsRouter,
        ];
        for (let i = 0, l = routers.length; i < l; i++) {
            routers[i].init(this.app);
        }
    }
}