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
const xml_constants_1 = require('./xml.constants');
const http_1 = require('@angular/http');
const core_1 = require('@angular/core');
let XmlHttpService = class XmlHttpService {
    constructor(http) {
        this.http = http;
    }
    getXmlData() {
        console.log('calling', xml_constants_1.XML_BACKUP_FILE_URL);
        return this.http.get(xml_constants_1.XML_BACKUP_FILE_URL);
    }
};
XmlHttpService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], XmlHttpService);
exports.XmlHttpService = XmlHttpService;
//# sourceMappingURL=xml.httpService.js.map