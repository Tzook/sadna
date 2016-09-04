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
    CalloutComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'callout',
            styles: ["\n        div {\n            position: absolute;\n            width: 90%;\n            max-height: 300px;\n            overflow-y: scroll;\n            background: white;\n            border-radius: 2px;\n            padding: 20px;\n            box-shadow: 0 0 9px -1px;\n            left: 0;\n            right: 0;\n            margin: auto;\n        }\n    "],
            template: "\n        <div *ngIf=\"show\" class=\"animated fast fadeIn\">\n            <ng-content></ng-content>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], CalloutComponent);
    return CalloutComponent;
}());
exports.CalloutComponent = CalloutComponent;
var PreCalloutComponent = (function () {
    function PreCalloutComponent() {
    }
    PreCalloutComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'pre-callout',
            styles: ["\n        :host {\n            padding-bottom: 5px;\n        }\n    "],
            template: "<ng-content></ng-content>"
        }), 
        __metadata('design:paramtypes', [])
    ], PreCalloutComponent);
    return PreCalloutComponent;
}());
exports.PreCalloutComponent = PreCalloutComponent;
var CalloutWrapComponent = (function () {
    function CalloutWrapComponent() {
        this.calloutShown = new core_1.EventEmitter();
    }
    CalloutWrapComponent.prototype.show = function () {
        var _this = this;
        this.timer = setTimeout(function () {
            _this.calloutShown.emit();
            _this.callout.show = true;
        }, this.delay || 0);
    };
    CalloutWrapComponent.prototype.hide = function () {
        clearTimeout(this.timer);
        this.callout.show = false;
    };
    __decorate([
        core_1.ContentChild(CalloutComponent), 
        __metadata('design:type', CalloutComponent)
    ], CalloutWrapComponent.prototype, "callout", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CalloutWrapComponent.prototype, "calloutShown", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CalloutWrapComponent.prototype, "delay", void 0);
    __decorate([
        core_1.HostListener('mouseenter'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], CalloutWrapComponent.prototype, "show", null);
    __decorate([
        core_1.HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], CalloutWrapComponent.prototype, "hide", null);
    CalloutWrapComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'callout-wrap',
            template: "<ng-content></ng-content>"
        }), 
        __metadata('design:paramtypes', [])
    ], CalloutWrapComponent);
    return CalloutWrapComponent;
}());
exports.CalloutWrapComponent = CalloutWrapComponent;
//# sourceMappingURL=callout.component.js.map