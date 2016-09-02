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
var core_1 = require('@angular/core');
var xml_service_1 = require('./xml.service');
var XmlController = (function () {
    function XmlController(_xmlService) {
        this._xmlService = _xmlService;
    }
    XmlController.prototype.backupToXml = function (req, res, next) {
        console.log('starting backup to XML');
        this._xmlService.backupToXml()
            .then(function (xmlData) {
            res.send(xmlData);
        });
    };
    XmlController.prototype.backupFromXml = function (req, res, next) {
        console.log('starting to restore from XML');
        var xmlData = req.file.buffer.toString();
        this._xmlService.backupFromXml(xmlData)
            .then(function () {
            // res.send('Successfull restored the DB from XML!');
            res.redirect('/xml?status=success');
        })
            .catch(function (e) {
            console.log("Error occoured: " + e);
            res.redirect('/xml?status=error');
        });
    };
    XmlController = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [xml_service_1.XmlService])
    ], XmlController);
    return XmlController;
}());
exports.XmlController = XmlController;
//# sourceMappingURL=xml.controller.js.map