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
var groups_constants_1 = require('./groups.constants');
var routes_constants_1 = require('../navigation/routes.constants');
var view_words_constants_1 = require('../view-words/view-words.constants');
var modify_group_model_1 = require('./modify-group.model');
var groups_service_1 = require('./groups.service');
var core_1 = require('@angular/core');
var GroupListComponent = (function () {
    function GroupListComponent(clientGroupsService) {
        this.clientGroupsService = clientGroupsService;
        this.groups = [];
        this.loading = false;
        this.model = new modify_group_model_1.ModifyGroup();
        this.message = "";
    }
    GroupListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.clientGroupsService.getGroups()
            .subscribe(function (success) { return _this.groups = success.json(); }, function (error) { return console.log(error); });
    };
    GroupListComponent.prototype.showGroup = function (id, isExpression) {
        var _this = this;
        this.cleanPreviousSelection();
        if (id) {
            this.showGroupSubscription = this.clientGroupsService.getGroup(id)
                .subscribe(function (success) {
                var words = success.json();
                var values = [];
                for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
                    var word = words_1[_i];
                    values.push(word.value);
                }
                _this.model.words = values.join(" ");
                _this.model.id = id;
                _this.isExpression = isExpression;
            }, function (error) { return console.log(error); });
        }
    };
    GroupListComponent.prototype.cleanPreviousSelection = function () {
        if (this.showGroupSubscription) {
            this.message = "";
            this.model.words = null;
            this.showGroupSubscription.unsubscribe();
        }
    };
    GroupListComponent.prototype.saveGroup = function () {
        var _this = this;
        console.log("saving group", this.model);
        this.loading = true;
        this.clientGroupsService.modifyGroup(this.model)
            .subscribe(function (success) {
            _this.loading = false;
            _this.message = "The group has been saved successfully.";
        }, function (error) {
            _this.loading = false;
            _this.message = "Error: " + error._body;
        });
    };
    GroupListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'group-list',
            styles: ["\n        #groups {\n            display: flex;\n            justify-content: space-around;\n        }\n        h3,\n        input,\n        button {\n            margin-bottom: 10px;\n        }\n        form {\n            margin-top: 20px;\n        }\n    "],
            template: "\n        <section *ngIf=\"groups.length\">\n            <span id=\"groups\">\n                <span>\n                    <h3>Groups</h3>\n                    <select #selectGroup (change)=\"showGroup(selectGroup.value, false)\">\n                        <option value=\"\"></option>\n                        <template ngFor let-group [ngForOf]=\"groups\">\n                            <option *ngIf=\"!group.is_expression\" [value]=\"group.id\">{{group.name}}</option>\n                        </template>\n                    </select>\n                </span>\n\n                <span>\n                    <h3>Expressions</h3>\n                    <select #selectExpression (change)=\"showGroup(selectExpression.value, true)\">\n                        <option value=\"\"></option>\n                        <template ngFor let-group [ngForOf]=\"groups\">\n                            <option *ngIf=\"group.is_expression\" [value]=\"group.id\">{{group.name}}</option>\n                        </template>\n                    </select>\n                </span>\n            </span>\n            <form *ngIf=\"model.words != null\" (ngSubmit)=\"saveGroup()\">\n                <input type=\"text\" placeholder=\"Words (coma separated)\" maxlength=\"" + groups_constants_1.MAX_WORDS_LENGTH + "\" [(ngModel)]=\"model.words\" name=\"words\" required>\n                <button type=\"submit\" [disabled]=\"loading\">Save changes</button>\n                <button type=\"button\" [routerLink]=\"['/" + routes_constants_1.ROUTE_WORDS + "', {" + view_words_constants_1.PARAM_WORDS_LIST + ": model.words, " + view_words_constants_1.PARAM_IS_EXPRESSION + ": isExpression}]\">View occurrences</button>\n                <span *ngIf=\"message\">{{message}}</span>\n            </form>\n        </section>\n    "
        }), 
        __metadata('design:paramtypes', [groups_service_1.ClientGroupsService])
    ], GroupListComponent);
    return GroupListComponent;
}());
exports.GroupListComponent = GroupListComponent;
//# sourceMappingURL=group-list.component.js.map