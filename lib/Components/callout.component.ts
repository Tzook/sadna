import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'callout',
    styles: [`
        div {
            position: absolute;
            width: 90%;
            max-height: 300px;
            overflow-y: scroll;
            background: white;
            border-radius: 2px;
            padding: 20px;
            box-shadow: 0 0 9px -1px;
            left: 0;
            right: 0;
            margin: auto;
        }
    `],
    template: `
        <div>
            <ng-content></ng-content>
        </div>
    `
})
export class CalloutComponent implements OnInit {
    constructor() { }

    ngOnInit() {

    }
}