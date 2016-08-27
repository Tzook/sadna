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
const core_1 = require('@angular/core');
const xml_service_1 = require('./xml.service');
let XmlController = class XmlController {
    constructor(_xmlService) {
        this._xmlService = _xmlService;
    }
    backupToXml(req, res, next) {
        this._xmlService.backupToXml()
            .then((xmlData) => {
            res.send(xmlData);
        });
    }
    backupFromXml(req, res, next) {
    }
};
XmlController = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [xml_service_1.XmlService])
], XmlController);
exports.XmlController = XmlController;
//# sourceMappingURL=xml.controller.js.map