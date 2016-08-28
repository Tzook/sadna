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
const add_group_component_1 = require('./add-group.component');
const group_list_component_1 = require('./group-list.component');
const groups_service_1 = require('./groups.service');
const core_1 = require('@angular/core');
let GroupsComponent = class GroupsComponent {
    constructor() {
    }
    ngOnInit() { }
};
GroupsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'groups',
        styles: [`
        h2 {
            margin-bottom: 10px;
            text-align: center;
        }
        group-list {
            display: block;
            margin-top: 40px;
        }
    `],
        template: `
        <h2>Add group</h2>
        <add-group></add-group>
        <group-list></group-list>
    `,
        providers: [groups_service_1.ClientGroupsService],
        directives: [add_group_component_1.AddGroupComponent, group_list_component_1.GroupListComponent]
    }), 
    __metadata('design:paramtypes', [])
], GroupsComponent);
exports.GroupsComponent = GroupsComponent;
//# sourceMappingURL=groups.component.js.map