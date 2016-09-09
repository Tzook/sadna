import {MAX_WORDS_LENGTH} from './groups.constants';
import {ModifyGroup} from './modify-group.model';
import {Group, CompleteWordInGroup} from '../db/server-db.model';
import {ClientGroupsService} from './groups.service';
import {Component, group, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'group-list',
    styles: [`
        #groups {
            display: flex;
            justify-content: space-around;
        }
        h3,
        input,
        button {
            margin-bottom: 10px;
        }
        form {
            margin-top: 20px;
        }
    `],
    template: `
        <section *ngIf="groups.length">
            <span id="groups">
                <span>
                    <h3>Groups</h3>
                    <select #selectGroup (change)="showGroup(selectGroup.value)">
                        <option value=""></option>
                        <template ngFor let-group [ngForOf]="groups">
                            <option *ngIf="!group.is_expression" [value]="group.id">{{group.name}}</option>
                        </template>
                    </select>
                </span>

                <span>
                    <h3>Expressions</h3>
                    <select #selectExpression (change)="showGroup(selectExpression.value)">
                        <option value=""></option>
                        <template ngFor let-group [ngForOf]="groups">
                            <option *ngIf="group.is_expression" [value]="group.id">{{group.name}}</option>
                        </template>
                    </select>
                </span>
            </span>
            <form *ngIf="model.words != null" (ngSubmit)="saveGroup()">
                <input type="text" placeholder="Words (coma separated)" maxlength="${MAX_WORDS_LENGTH}" [(ngModel)]="model.words" name="words" required>
                <button type="submit" [disabled]="loading">Save changes</button>
                <span *ngIf="message">{{message}}</span>
            </form>
        </section>
    `
})
export class GroupListComponent implements OnInit {
    private showGroupSubscription: Subscription;
    private groups: Group[];
    private model: ModifyGroup;
    private loading: boolean;
    private message: string;

    constructor(private clientGroupsService: ClientGroupsService) {
        this.groups = [];
        this.loading = false;
        this.model = new ModifyGroup();
        this.message = "";
    }

    ngOnInit() {
        this.clientGroupsService.getGroups()
            .subscribe(
                success => this.groups = success.json(),
                error => console.log(error)
            );
    }

    private showGroup(id: string) {
        this.cleanPreviousSelection();
        if (id) {
            this.showGroupSubscription = this.clientGroupsService.getGroup(id)
                .subscribe(
                    success => {
                        let words: CompleteWordInGroup[] = success.json();
                        let values = [];
                        for (let word of words) {
                            values.push(word.value);
                        }
                        this.model.words = values.join(" ");
                        this.model.id = id;
                    },
                    error => console.log(error)
                );
        }
    }

    private cleanPreviousSelection() {
        if (this.showGroupSubscription) {
            this.message = "";
            this.model.words = null;
            this.showGroupSubscription.unsubscribe();
        }
    }

    private saveGroup() {
        console.log("saving group", this.model);
        this.loading = true;
        this.clientGroupsService.modifyGroup(this.model)
            .subscribe(
                success => {
                    this.loading = false;
                    this.message = "The song has been added successfully."
                },
                error => {
                    this.loading = false;
                    this.message = "Error: " + error._body;
                }
            );
    }
}