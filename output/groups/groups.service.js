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
var groups_constants_1 = require('./groups.constants');
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var ClientGroupsService = (function () {
    function ClientGroupsService(http) {
        this.http = http;
    }
    ClientGroupsService.prototype.addGroup = function (group) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(groups_constants_1.ADD_GROUP_URL, JSON.stringify(group), options);
    };
    ClientGroupsService.prototype.getGroups = function () {
        return this.http.get(groups_constants_1.GET_GROUPS_URL);
    };
    ClientGroupsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ClientGroupsService);
    return ClientGroupsService;
}());
exports.ClientGroupsService = ClientGroupsService;
//# sourceMappingURL=groups.service.js.map