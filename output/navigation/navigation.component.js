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
const tabs_constants_1 = require('./tabs.constants');
const navigation_style_constants_1 = require('./navigation-style.constants');
const core_1 = require('@angular/core');
let NavigationComponent = class NavigationComponent {
    constructor() {
        this.links = tabs_constants_1.TABS;
    }
};
NavigationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'navigation',
        styles: [`
        ul {
            background-color: ${navigation_style_constants_1.COLORS.NAVIGATION_BG};
            display: flex;
            justify-content: center;
        }
        a {
            display: block;
            text-decoration: none;
            color: ${navigation_style_constants_1.COLORS.TEXT};
            padding: ${navigation_style_constants_1.TAB_SPACE_AROUND}px;
        }
        .active {
            color: ${navigation_style_constants_1.COLORS.ACTIVE_TEXT};
        }
        a:hover {
            background-color: ${navigation_style_constants_1.COLORS.HOVER_BG};
        }
    `],
        template: `
        <ul>
            <li *ngFor="let link of links">
                <a [routerLink]="link.url" routerLinkActive="active">{{link.name}}</a>
            </li>
        </ul>
    `
    }), 
    __metadata('design:paramtypes', [])
], NavigationComponent);
exports.NavigationComponent = NavigationComponent;
//# sourceMappingURL=navigation.component.js.map