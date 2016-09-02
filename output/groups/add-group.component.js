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
var add_group_model_1 = require('./add-group.model');
var groups_constants_1 = require('./groups.constants');
var groups_service_1 = require('./groups.service');
var core_1 = require('@angular/core');
var AddGroupComponent = (function () {
    function AddGroupComponent(clientGroupsService) {
        this.clientGroupsService = clientGroupsService;
        this.model = new add_group_model_1.AddGroup();
        this.loading = false;
        this.message = "";
    }
    AddGroupComponent.prototype.ngOnInit = function () { };
    AddGroupComponent.prototype.addGroup = function () {
        var _this = this;
        this.loading = true;
        this.message = "Adding group...";
        this.clientGroupsService.addGroup(this.model)
            .subscribe(function (success) { return _this.message = "The group has been added successfully."; }, function (error) { return _this.message = "Error: " + error._body; });
    };
    AddGroupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'add-group',
            styleUrls: ['../../style/form-styles.css'],
            template: "\n        <form (ngSubmit)=\"addGroup()\" #addGroupForm=\"ngForm\">\n            <table>\n                <tr>\n                    <td><label for=\"name\">Name:</label></td>\n                    <td><input type=\"text\" placeholder=\"Name\" maxlength=\"" + groups_constants_1.MAX_GROUP_NAME_LENGTH + "\" id=\"name\" [(ngModel)]=\"model.name\" name=\"name\" autofocus required></td>\n                </tr>\n                <tr>\n                    <td><label for=\"words\">Words:</label></td>\n                    <td><input type=\"text\" placeholder=\"Words (coma separated)\" maxlength=\"" + groups_constants_1.MAX_WORDS_LENGTH + "\" id=\"words\" [(ngModel)]=\"model.words\" name=\"words\" required></td>\n                </tr>\n                <tr>\n                    <td><label for=\"is_expression\">Is expression:</label></td>\n                    <td><input type=\"checkbox\" id=\"is_expression\" [(ngModel)]=\"model.is_expression\" name=\"is_expression\"></td>\n                </tr>\n                <tr>\n                    <td></td>\n                    <td id=\"submit\"><button type=\"submit\" [disabled]=\"!addGroupForm.form.valid || loading\">Add group</button></td>\n                </tr>\n            </table>\n\n            <div [hidden]=\"!message\">\n                {{message}}\n            </div>\n        </form>\n    "
        }), 
        __metadata('design:paramtypes', [groups_service_1.ClientGroupsService])
    ], AddGroupComponent);
    return AddGroupComponent;
}());
exports.AddGroupComponent = AddGroupComponent;
//# sourceMappingURL=add-group.component.js.map