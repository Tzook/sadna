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
var tabs_constants_1 = require('./tabs.constants');
var navigation_style_constants_1 = require('./navigation-style.constants');
var core_1 = require('@angular/core');
var NavigationComponent = (function () {
    function NavigationComponent() {
        this.links = tabs_constants_1.TABS;
    }
    NavigationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'navigation',
            styles: [("\n        ul {\n            background-color: " + navigation_style_constants_1.COLORS.NAVIGATION_BG + ";\n            display: flex;\n            justify-content: center;\n        }\n        a {\n            display: block;\n            text-decoration: none;\n            color: " + navigation_style_constants_1.COLORS.TEXT + ";\n            padding: " + navigation_style_constants_1.TAB_SPACE_AROUND + "px;\n            transition: all 0.3s ease;\n        }\n        .active {\n            color: " + navigation_style_constants_1.COLORS.ACTIVE_TEXT + ";\n        }\n        a:hover {\n            background-color: " + navigation_style_constants_1.COLORS.HOVER_BG + ";\n        }\n    ")],
            template: "\n        <ul class=\"animated fadeIn\">\n            <li *ngFor=\"let link of links\">\n                <a [routerLink]=\"link.url\" routerLinkActive=\"active\">{{link.name}}</a>\n            </li>\n        </ul>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], NavigationComponent);
    return NavigationComponent;
}());
exports.NavigationComponent = NavigationComponent;
//# sourceMappingURL=navigation.component.js.map