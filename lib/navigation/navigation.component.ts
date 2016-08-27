import {TABS} from './tabs.constants';
import {COLORS, TAB_SPACE_AROUND} from './navigation-style.constants';
import {Component} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'navigation',
    styles: [`
        ul {
            background-color: ${COLORS.NAVIGATION_BG};
            display: flex;
            justify-content: center;
        }
        a {
            display: block;
            text-decoration: none;
            color: ${COLORS.TEXT};
            padding: ${TAB_SPACE_AROUND}px;
            transition: all 0.3s ease;
        }
        .active {
            color: ${COLORS.ACTIVE_TEXT};
        }
        a:hover {
            background-color: ${COLORS.HOVER_BG};
        }
    `],
    template: `
        <ul class="animated fadeIn">
            <li *ngFor="let link of links">
                <a [routerLink]="link.url" routerLinkActive="active">{{link.name}}</a>
            </li>
        </ul>
    `
})
export class NavigationComponent {
    private links = TABS;
}