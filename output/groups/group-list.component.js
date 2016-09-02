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
var GroupListComponent = (function () {
    function GroupListComponent(clientGroupsService) {
        this.clientGroupsService = clientGroupsService;
        this.groups = [];
    }
    GroupListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.clientGroupsService.getGroups()
            .subscribe(function (success) { return _this.groups = success.json(); }, function (error) { return console.log(error); });
    };
    GroupListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'group-list',
            styles: ["\n        section {\n            display: flex;\n            justify-content: space-around;\n        }\n        div {\n            margin-bottom: 10px;\n        }\n    "],
            template: "\n        <section *ngIf=\"groups.length\">\n            <span>\n                <div>Groups</div>\n                <select>\n                    <template ngFor let-group [ngForOf]=\"groups\">\n                        <option *ngIf=\"!group.is_expression\" [ngValue]=\"group\">{{group.name}}</option>\n                    </template>\n                </select>\n            </span>\n\n            <span>\n                <div>Expressions</div>\n                <select>\n                    <template ngFor let-group [ngForOf]=\"groups\">\n                        <option *ngIf=\"group.is_expression\" [ngValue]=\"group\">{{group.name}}</option>\n                    </template>\n                </select>\n            </span>\n        </section>\n    "
        }), 
        __metadata('design:paramtypes', [groups_service_1.ClientGroupsService])
    ], GroupListComponent);
    return GroupListComponent;
}());
exports.GroupListComponent = GroupListComponent;
//# sourceMappingURL=group-list.component.js.map