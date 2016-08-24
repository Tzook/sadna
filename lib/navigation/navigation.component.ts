import {TABS} from './tabs.constants';
import {Component, OnInit} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'navigation',
    styles: [`
        ul {
            background-color: #333;
            display: flex;
            justify-content: center;
        }
        a {
            display: block;
            color: white;
            padding: 14px 16px;
            text-decoration: none;
        }
        .active {
            color: sandybrown;
        }
        a:hover {
            background-color: #111;
        }
    `],
    template: `
        <ul>
            <li *ngFor="let link of links">
                <a [routerLink]="link.url" routerLinkActive="active">{{link.name}}</a>
            </li>
        </ul>
    `
})
export class NavigationComponent implements OnInit {
    private links;
    constructor() {
        this.links = TABS;
    }

    ngOnInit() { }
}