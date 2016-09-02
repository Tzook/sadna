import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    styles: [`
        main {
            padding: 20px;
        }
    `],
    template: `
        <navigation></navigation>
        <main><router-outlet></router-outlet></main>
    `
})
export class ClientMainComponent { }