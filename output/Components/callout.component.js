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
let CalloutComponent = class CalloutComponent {
    constructor() {
    }
    ngOnInit() {
    }
};
CalloutComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'callout',
        styles: [`
        div {
            position: absolute;
            width: 90%;
            max-height: 300px;
            overflow-y: scroll;
            background: white;
            border-radius: 2px;
            padding: 20px;
            box-shadow: 0 0 9px -1px;
            left: 0;
            right: 0;
            margin: auto;
        }
    `],
        template: `
        <div>
            <ng-content></ng-content>
        </div>
    `
    }), 
    __metadata('design:paramtypes', [])
], CalloutComponent);
exports.CalloutComponent = CalloutComponent;
//# sourceMappingURL=callout.component.js.map