import {AddGroup} from './add-group.model';
import {MAX_GROUP_NAME_LENGTH, MAX_WORDS_LENGTH} from './groups.constants';
import {Group} from '../db/server-db.model';
import {ClientGroupsService} from './groups.service';
import {Component, style, group, OnInit} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'add-group',
    styleUrls: ['../../style/form-styles.css'],
    template: `
        <form (ngSubmit)="addGroup()" #addGroupForm="ngForm">
            <table>
                <tr>
                    <td><label for="name">Name:</label></td>
                    <td><input type="text" placeholder="Name" maxlength="${MAX_GROUP_NAME_LENGTH}" id="name" [(ngModel)]="model.name" name="name" autofocus required></td>
                </tr>
                <tr>
                    <td><label for="words">Words:</label></td>
                    <td><input type="text" placeholder="Words (coma separated)" maxlength="${MAX_WORDS_LENGTH}" id="words" [(ngModel)]="model.words" name="words" required></td>
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
})
export class AddGroupComponent implements OnInit {
    private model: AddGroup;
    private loading: boolean;
    private message: string;

    constructor(private clientGroupsService: ClientGroupsService) {
        this.model = new AddGroup();
        this.loading = false;
        this.message = "";
    }

    ngOnInit() { }

    private addGroup() {
        this.loading = true;
        this.message = "Adding group...";
        this.clientGroupsService.addGroup(this.model)
            .subscribe(
                success => this.message = "The group has been added successfully.",
                error => this.message = "Error: " + error._body);
    }
}