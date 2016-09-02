import {ClientGroupsService} from './groups.service';
import {Component, OnInit} from '@angular/core';

@Component({
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
    providers: [ClientGroupsService],
})
export class GroupsComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}