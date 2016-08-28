import {Group} from '../db/server-db.model';
import {ClientGroupsService} from './groups.service';
import {Component, group, OnInit} from '@angular/core';

@Component({
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
})
export class GroupListComponent implements OnInit {
    private groups: Group[];

    constructor(private clientGroupsService: ClientGroupsService) {
        this.groups = [];
    }

    ngOnInit() {
        this.clientGroupsService.getGroups()
            .subscribe(
                success => this.groups = success.json(),
                error => console.log(error)
            );
    }
}