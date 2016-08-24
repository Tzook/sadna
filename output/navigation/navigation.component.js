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
const core_1 = require('@angular/core');
let NavigationComponent = class NavigationComponent {
    constructor() {
        this.links = tabs_constants_1.TABS;
    }
    ngOnInit() { }
};
NavigationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'navigation',
        styles: [`
        ul {
            background-color: #333;
            display: flex;
            justify-content: center;
        }
        a {
            display: block;
            color: white;
            padding: 14px 16px;
            text-decoration: none;
        }
        .active {
            color: sandybrown;
        }
        a:hover {
            background-color: #111;
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