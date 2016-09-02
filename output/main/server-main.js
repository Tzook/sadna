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
var server_db_1 = require('./server-db');
var server_router_1 = require('./server-router');
var express = require('express');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var http = require('http');
var path = require('path');
var core_1 = require('@angular/core');
var ServerMain = (function () {
    function ServerMain(_dbService, serverRouter) {
        this._dbService = _dbService;
        this.serverRouter = serverRouter;
        this._app = express();
    }
    ServerMain.prototype.useDependencies = function () {
        this._app.use(compression({ level: 1 }));
        this._app.use(cookieParser());
        this._app.use(bodyParser.json());
        this._app.use(cors());
    };
    ServerMain.prototype.beginServer = function () {
        var _this = this;
        this._app.set('view engine', 'jade');
        this._app.set('port', (process.env.PORT || 5000));
        var rootDir = this.getRootDir(__dirname);
        this._app.use(express.static(rootDir));
        this._app.use(/\/(?!(data)).*/, function (req, res) {
            res.sendFile('index.html', { root: rootDir });
        });
        var server = http.createServer(this._app).listen(this._app.get('port'));
        this._dbService.connect()
            .then(function () {
            _this.serverRouter.init(_this._app);
        })
            .catch(function (e) { console.error(e); });
        console.log("\t+*+*+ New server on localhost:" + this._app.get('port') + " +*+*+");
    };
    ServerMain.prototype.getRootDir = function (dirname) {
        var paths = dirname.split(path.sep);
        paths.splice(paths.length - 2);
        dirname = paths.join(path.sep);
        return dirname;
    };
    ServerMain = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [server_db_1.DbService, server_router_1.ServerRouter])
    ], ServerMain);
    return ServerMain;
}());
exports.ServerMain = ServerMain;
//# sourceMappingURL=server-main.js.map