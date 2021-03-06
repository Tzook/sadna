import {DbService} from '../db/server-db';
import {ServerRouter} from '../navigation/server-router';
import * as express from 'express';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as http from 'http';
import * as path from 'path';

import {Injectable} from '@angular/core';

@Injectable()
export class ServerMain {
    private _app: any;
    constructor(private _dbService: DbService, private serverRouter: ServerRouter) {
        this._app = express();
    }

    useDependencies() {
		this._app.use(compression({level: 1}));
		this._app.use(cookieParser());
		this._app.use(bodyParser.json());
		this._app.use(cors());
    }

    beginServer() {
		this._app.set('view engine', 'jade');
		this._app.set('port', (process.env.PORT || 5000));
        var rootDir = this.getRootDir(__dirname);
        this._app.use(express.static(rootDir));
        this._app.use(/\/(?!(data)).*/, (req, res) => {
            res.sendFile('index.html', { root: rootDir });
        });
        let server = http.createServer(this._app).listen(this._app.get('port'));
        this._dbService.connect()
            .then(() => {
                this.serverRouter.init(this._app);
            })
            .catch((e)=>{console.error(e)});
		console.log("\t+*+*+ New server on localhost:" + this._app.get('port') + " +*+*+");
	}

    private getRootDir(dirname: string): string {
        var paths = dirname.split(path.sep);
        paths.splice(paths.length - 2);
        dirname = paths.join(path.sep);
        return dirname;
    }
}