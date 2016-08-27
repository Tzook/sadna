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
const xml_httpService_1 = require('./xml.httpService');
const core_1 = require('@angular/core');
let XmlComponent = class XmlComponent {
    constructor(_xmlHttpService) {
        this._xmlHttpService = _xmlHttpService;
        this._loading = false;
    }
    /**
     * Calling for backup service to get XML data
     */
    backup() {
        this._loading = true;
        console.log('here');
        let reader = new FileReader();
        this._xmlHttpService.getXmlData()
            .subscribe(response => {
            let blob = new Blob([response.text()], { type: 'text/xml' });
            reader.readAsDataURL(blob);
        }, error => {
            this._loading = false;
            console.log(error);
        });
        reader.onloadend = (event) => {
            window.location.href = reader.result;
        };
    }
};
XmlComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'xml-backup',
        styles: [`
        h1 {
            text-align: center;
            font-size: 28px;
        }
        button {
            margin: 10px 0;
        }
        .btn-container {
            display: flex;
            justifiy-content: center;
            flex-direction: column;
            max-width: 350px;
            margin: 10px auto 0;
        }
    `],
        template: `
    <div class="animated fadeIn">
        <h1>Backup or Restore from XML</h1>
        <div class="btn-container animated fadeIn" *ngIf="!_loading">
            <button (click)="backup()">BACKUP TO XML</button>
            <button>RESTORE FROM XML</button>
        </div>
        <h1 class="animated fadeIn" *ngIf="_loading"><br>LOADING...</h1>
    </div>
    `,
        viewProviders: [xml_httpService_1.XmlHttpService]
    }), 
    __metadata('design:paramtypes', [xml_httpService_1.XmlHttpService])
], XmlComponent);
exports.XmlComponent = XmlComponent;
//# sourceMappingURL=xml.component.js.map