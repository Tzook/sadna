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
var groups_service_1 = require('./groups.service');
var core_1 = require('@angular/core');
var GroupsComponent = (function () {
    function GroupsComponent() {
    }
    GroupsComponent.prototype.ngOnInit = function () { };
    GroupsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'groups',
            styles: ["\n        h2 {\n            margin-bottom: 10px;\n            text-align: center;\n        }\n        group-list {\n            display: block;\n            margin-top: 40px;\n        }\n    "],
            template: "\n        <h2>Add group</h2>\n        <add-group></add-group>\n        <group-list></group-list>\n    ",
            providers: [groups_service_1.ClientGroupsService],
        }), 
        __metadata('design:paramtypes', [])
    ], GroupsComponent);
    return GroupsComponent;
}());
exports.GroupsComponent = GroupsComponent;
//# sourceMappingURL=groups.component.js.map