"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// import {ServerSocketService} from '../socket/server-socket.service';
const server_db_1 = require('./server-db');
const server_router_1 = require('./server-router');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const path = require('path');
// import * as io from "socket.io";
const core_1 = require('@angular/core');
let ServerMain = class ServerMain {
    // constructor(private _serverSocketService: ServerSocketService) {
    constructor(_dbService, _router) {
        this._dbService = _dbService;
        this._router = _router;
        this._app = express();
    }
    useDependencies() {
        this._app.use(compression({ level: 1 }));
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
        // this._app.socketio = require('socket.io')(this.app.server);
        // this._serverSocketService.init(io(server));
        this._dbService.connect()
            .then(() => {
            this._router.init(this._app);
        })
            .catch((e) => { console.error(e); });
        console.log("\t+*+*+ New server on localhost:" + this._app.get('port') + " +*+*+");
    }
    getRootDir(dirname) {
        var paths = dirname.split(path.sep);
        paths.splice(paths.length - 2);
        dirname = paths.join(path.sep);
        return dirname;
    }
};
ServerMain = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [server_db_1.DbService, server_router_1.Router])
], ServerMain);
exports.ServerMain = ServerMain;
//# sourceMappingURL=server-main.js.map