import {MAX_WORDS_LENGTH} from './groups.constants';
import {ROUTE_WORDS} from '../navigation/routes.constants';
import {PARAM_WORDS_LIST, PARAM_IS_EXPRESSION} from '../view-words/view-words.constants';
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
                    <select #selectGroup (change)="showGroup(selectGroup.value, false)">
                        <option value=""></option>
                        <template ngFor let-group [ngForOf]="groups">
                            <option *ngIf="!group.is_expression" [value]="group.id">{{group.name}}</option>
                        </template>
                    </select>
                </span>

                <span>
                    <h3>Expressions</h3>
                    <select #selectExpression (change)="showGroup(selectExpression.value, true)">
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
                <button type="button" [routerLink]="['/${ROUTE_WORDS}', {${PARAM_WORDS_LIST}: model.words, ${PARAM_IS_EXPRESSION}: isExpression}]">View occurrences</button>
                <span *ngIf="message">{{message}}</span>
            </form>
        </section>
    `
})
export class GroupListComponent implements OnInit {
    private showGroupSubscription: Subscription;
    private groups: Group[];
    private model: ModifyGroup;
    private isExpression: boolean;
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

    private showGroup(id: string, isExpression: boolean) {
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
                        this.isExpression = isExpression;
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
                    this.message = "The group has been saved successfully."
                },
                error => {
                    this.loading = false;
                    this.message = "Error: " + error._body;
                }
            );
    }
}