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
const pg = require("pg");
const core_1 = require('@angular/core');
let DbService = class DbService {
    connect() {
        let dbUrl = 'postgres://lhliohoqujljaa:vUnwJ12tti0gFdvBOi0zhOjd9B@ec2-54-225-90-198.compute-1.amazonaws.com:5432/d5brvm90sfeepi';
        return new Promise((resolve, reject) => {
            pg.defaults.ssl = true;
            pg.connect(dbUrl, (err, client) => {
                if (err)
                    reject(err);
                else {
                    console.log('Connected to postgres successfully!');
                    this.client = client;
                    resolve(this.client);
                }
            });
        });
    }
    get dbClient() {
        return this.client;
    }
};
DbService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], DbService);
exports.DbService = DbService;
//# sourceMappingURL=server-db.js.map