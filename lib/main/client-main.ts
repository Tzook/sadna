import {NavigationComponent} from '../navigation/navigation.component';
import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <navigation></navigation>
        <router-outlet></router-outlet>
    `,
    directives: [NavigationComponent]
})
export class ClientMainComponent { }