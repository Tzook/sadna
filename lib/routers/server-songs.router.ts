import {Injectable} from '@angular/core';

@Injectable()
export class SongsRouter {
    private _app: any;

    constructor() {}

    init (app) {
        this._app = app;
    }  
}