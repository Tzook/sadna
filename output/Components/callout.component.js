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
var CalloutComponent = (function () {
    function CalloutComponent() {
    }
    CalloutComponent.prototype.ngOnInit = function () {
    };
    CalloutComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'callout',
            styles: ["\n        div {\n            position: absolute;\n            width: 90%;\n            max-height: 300px;\n            overflow-y: scroll;\n            background: white;\n            border-radius: 2px;\n            padding: 20px;\n            box-shadow: 0 0 9px -1px;\n            left: 0;\n            right: 0;\n            margin: auto;\n        }\n    "],
            template: "\n        <div>\n            <ng-content></ng-content>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], CalloutComponent);
    return CalloutComponent;
}());
exports.CalloutComponent = CalloutComponent;
//# sourceMappingURL=callout.component.js.map