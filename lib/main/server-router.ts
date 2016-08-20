import {SongsRouter} from '../routers/server-songs.router';
import {Injectable} from '@angular/core';

@Injectable()
export class Router {
    private _app: any;

    constructor(
        private _songsRouter: SongsRouter
    ) {

    }
    
    init (app) {
        this._app = app;
        let routers = [
            this._songsRouter,
        ];
        for (let i = 0, l = routers.length; i < l; i++) {
            routers[i].init(app);
        }
    }  
}