import {SongsService} from '../songs/server-songs.service';
import {GroupsService} from '../groups/server-groups.service';
import {Song, SongResult} from '../db/server-db.model';
import {XmlService} from '../db/backup/xml.service';
import {Injectable} from '@angular/core';

@Injectable()
export class SongsRouter {
    private _app: any;

    constructor(private _songsService: SongsService, private _groupsService: GroupsService,
                private _xmlService: XmlService) {}

    init (app) {
        this._app = app;
        this._xmlService.backupToXml()
            .then((result: string) => {
                console.log(typeof result);
                this._xmlService.backupFromXml(result);
            })
            .catch(err => console.log(err));
    }  
}