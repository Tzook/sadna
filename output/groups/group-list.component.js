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
const groups_service_1 = require('./groups.service');
const core_1 = require('@angular/core');
let GroupListComponent = class GroupListComponent {
    constructor(clientGroupsService) {
        this.clientGroupsService = clientGroupsService;
        this.groups = [];
    }
    ngOnInit() {
        this.clientGroupsService.getGroups()
            .subscribe(success => this.groups = success.json(), error => console.log(error));
    }
};
GroupListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'group-list',
        styles: [`
        section {
            display: flex;
            justify-content: space-around;
        }
        div {
            margin-bottom: 10px;
        }
    `],
        template: `
        <section *ngIf="groups.length">
            <span>
                <div>Groups</div>
                <select>
                    <template ngFor let-group [ngForOf]="groups">
                        <option *ngIf="!group.is_expression" [ngValue]="group">{{group.name}}</option>
                    </template>
                </select>
            </span>

            <span>
                <div>Expressions</div>
                <select>
                    <template ngFor let-group [ngForOf]="groups">
                        <option *ngIf="group.is_expression" [ngValue]="group">{{group.name}}</option>
                    </template>
                </select>
            </span>
        </section>
    `
    }), 
    __metadata('design:paramtypes', [groups_service_1.ClientGroupsService])
], GroupListComponent);
exports.GroupListComponent = GroupListComponent;
//# sourceMappingURL=group-list.component.js.map