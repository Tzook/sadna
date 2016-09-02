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
var xml_constants_1 = require('./xml.constants');
var xml_httpService_1 = require('./xml.httpService');
var router_1 = require('@angular/router');
var core_1 = require('@angular/core');
var XmlComponent = (function () {
    function XmlComponent(_route, _xmlHttpService) {
        var _this = this;
        this._route = _route;
        this._xmlHttpService = _xmlHttpService;
        this._loading = false;
        this._xmlBackupUrl = xml_constants_1.XML_BACKUP_FILE_URL;
        this._route.queryParams.forEach(function (param) {
            if (param['status'] === 'success')
                _this._succesfull = true;
        });
    }
    /**
     * Calling for backup service to get XML data
     */
    XmlComponent.prototype.backup = function () {
        var _this = this;
        this._loading = true;
        var reader = new FileReader();
        this._xmlHttpService.getXmlData()
            .subscribe(function (response) {
            var blob = new Blob([response.text()], { type: 'text/xml' });
            reader.readAsDataURL(blob);
        }, function (error) {
            _this._loading = false;
            console.log(error);
        });
        reader.onloadend = function (event) {
            window.location.href = reader.result;
        };
    };
    /**
     * Read the XML file and upload it as multipart
     */
    XmlComponent.prototype.uploadFile = function (event) {
        this._loading = true;
        var form = document.getElementsByTagName('form')[0];
        form.submit();
    };
    XmlComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'xml-backup',
            styles: ["\n        h1 {\n            text-align: center;\n            font-size: 28px;\n        }\n        button {\n            margin: 10px 0;\n        }\n        .btn-container {\n            display: flex;\n            justifiy-content: center;\n            flex-direction: column;\n            max-width: 350px;\n            margin: 10px auto 0;\n        }\n        label {\n            display: block;\n            cursor: pointer;\n        }\n        input[type=file] {\n            visibility: hidden;\n            height: 0;\n            position: absolute;\n        }\n    "],
            template: "\n    <div class=\"animated fadeIn\">\n        <h1>Backup or Restore from XML</h1>\n        <div class=\"btn-container animated fadeIn\" *ngIf=\"!_loading && !_succesfull\">\n            <button (click)=\"backup()\">BACKUP TO XML</button>\n            <button>\n                <form action=\"{{_xmlBackupUrl}}\" enctype=\"multipart/form-data\" method=\"post\">\n                    <label>RESTORE FROM XML<input type=\"file\" (change)=\"uploadFile($event)\" name=\"data\"/></label>\n                </form>\n            </button>\n        </div>\n        <h1 class=\"animated fadeIn\" *ngIf=\"_loading\"><br>LOADING...</h1>\n        <h1 class=\"animated fadeIn\" *ngIf=\"_succesfull\"><br>DB has restored successfully from XML file!</h1>\n    </div>\n    ",
            viewProviders: [xml_httpService_1.XmlHttpService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, xml_httpService_1.XmlHttpService])
    ], XmlComponent);
    return XmlComponent;
}());
exports.XmlComponent = XmlComponent;
//# sourceMappingURL=xml.component.js.map