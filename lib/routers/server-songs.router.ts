import {SongsService} from '../songs/server-songs.service';
import {GroupsService} from '../groups/server-groups.service';
import {WordsService} from '../words/server-words.service';
import {Song, SongResult} from '../db/server-db.model';
import {XmlService} from '../db/backup/xml.service';
import {Injectable} from '@angular/core';

@Injectable()
export class SongsRouter {
    private _app: any;

    constructor(private _songsService: SongsService, private _groupsService: GroupsService,
                private _xmlService: XmlService, private _wordsService: WordsService) {}

    init (app) {
        this._app = app;
    }  
}