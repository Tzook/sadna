import {DbService} from '../main/server-db';
import {Injectable} from '@angular/core';

@Injectable()
export class SongsRouter {
    private _app: any;

    constructor(private _dbService: DbService) {}

    init (app) {
        this._app = app;
        let dbClient = this._dbService.dbClient;
        console.log('~~dumping information_schema.tables~~');
        dbClient
            .query('SELECT table_schema,table_name FROM information_schema.tables;')
            .on('row', (row) => {
            console.log(JSON.stringify(row));
        });
    }  
}