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
const add_group_model_1 = require('./add-group.model');
const groups_constants_1 = require('./groups.constants');
const groups_service_1 = require('./groups.service');
const core_1 = require('@angular/core');
let AddGroupComponent = class AddGroupComponent {
    constructor(clientGroupsService) {
        this.clientGroupsService = clientGroupsService;
        this.model = new add_group_model_1.AddGroup();
        this.loading = false;
        this.message = "";
    }
    ngOnInit() { }
    addGroup() {
        this.loading = true;
        this.message = "Adding group...";
        this.clientGroupsService.addGroup(this.model)
            .subscribe(success => this.message = "The group has been added successfully.", error => this.message = "Error: " + error._body);
    }
};
AddGroupComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'add-group',
        styleUrls: ['../../style/form-styles.css'],
        template: `
        <form (ngSubmit)="addGroup()" #addGroupForm="ngForm">
            <table>
                <tr>
                    <td><label for="name">Name:</label></td>
                    <td><input type="text" placeholder="Name" maxlength="${groups_constants_1.MAX_GROUP_NAME_LENGTH}" id="name" [(ngModel)]="model.name" name="name" autofocus required></td>
                </tr>
                <tr>
                    <td><label for="words">Words:</label></td>
                    <td><input type="text" placeholder="Words (coma separated)" maxlength="${groups_constants_1.MAX_WORDS_LENGTH}" id="words" [(ngModel)]="model.words" name="words" required></td>
                </tr>
                <tr>
                    <td><label for="is_expression">Is expression:</label></td>
                    <td><input type="checkbox" id="is_expression" [(ngModel)]="model.is_expression" name="is_expression"></td>
                </tr>
                <tr>
                    <td></td>
                    <td id="submit"><button type="submit" [disabled]="!addGroupForm.form.valid || loading">Add group</button></td>
                </tr>
            </table>

            <div [hidden]="!message">
                {{message}}
            </div>
        </form>
    `
    }), 
    __metadata('design:paramtypes', [groups_service_1.ClientGroupsService])
], AddGroupComponent);
exports.AddGroupComponent = AddGroupComponent;
//# sourceMappingURL=add-group.component.js.map