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
const xml_controller_1 = require('./xml.controller');
const xml_contants_1 = require('./xml.contants');
let XmlRouter = class XmlRouter {
    constructor(_xmlController) {
        this._xmlController = _xmlController;
    }
    /**
     * List the routes
     */
    init(app) {
        app.get(xml_contants_1.XML_BACKUP_FILE_URL, this._xmlController.backupToXml.bind(this._xmlController));
        app.post(xml_contants_1.XML_BACKUP_FILE_URL, this._xmlController.backupFromXml.bind(this._xmlController));
    }
};
XmlRouter = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [xml_controller_1.XmlController])
], XmlRouter);
exports.XmlRouter = XmlRouter;
//# sourceMappingURL=xml.router.js.map