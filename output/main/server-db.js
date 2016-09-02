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
var pg = require("pg");
var core_1 = require('@angular/core');
var DbService = (function () {
    function DbService() {
    }
    DbService.prototype.connect = function () {
        var _this = this;
        var dbUrl = 'postgres://lhliohoqujljaa:vUnwJ12tti0gFdvBOi0zhOjd9B@ec2-54-225-90-198.compute-1.amazonaws.com:5432/d5brvm90sfeepi';
        return new Promise(function (resolve, reject) {
            pg.defaults.ssl = true;
            pg.connect(dbUrl, function (err, client) {
                if (err)
                    reject(err);
                else {
                    console.log('Connected to postgres successfully!');
                    _this.client = client;
                    resolve(_this.client);
                }
            });
        });
    };
    Object.defineProperty(DbService.prototype, "dbClient", {
        get: function () {
            return this.client;
        },
        enumerable: true,
        configurable: true
    });
    DbService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DbService);
    return DbService;
}());
exports.DbService = DbService;
//# sourceMappingURL=server-db.js.map