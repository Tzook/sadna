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
var ClientMainComponent = (function () {
    function ClientMainComponent() {
    }
    ClientMainComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            styles: ["\n        main {\n            padding: 20px;\n        }\n    "],
            template: "\n        <navigation></navigation>\n        <main><router-outlet></router-outlet></main>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], ClientMainComponent);
    return ClientMainComponent;
}());
exports.ClientMainComponent = ClientMainComponent;
//# sourceMappingURL=client-main.js.map