import {LobbyComponent} from '../lobby/lobby.component';
import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <lobby></lobby>
        <router-outlet></router-outlet>
    `,
    directives: [LobbyComponent]
})
export class ClientMainComponent {}