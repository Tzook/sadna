import {Component, transition, ContentChild, Output, Input, HostListener, EventEmitter} from '@angular/core';

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
        <div *ngIf="show" class="animated fast fadeIn">
            <ng-content></ng-content>
        </div>
    `
})
export class CalloutComponent {
    public show: boolean;
}

@Component({
    moduleId: module.id,
    selector: 'pre-callout',
    styles: [`
        :host {
            padding-bottom: 5px;
        }
    `],
    template: `<ng-content></ng-content>`
})
export class PreCalloutComponent {}

@Component({
    moduleId: module.id,
    selector: 'callout-wrap',
    template: `<ng-content></ng-content>`
})
export class CalloutWrapComponent {
    @ContentChild(CalloutComponent) callout: CalloutComponent;
    @Output() calloutShown = new EventEmitter();
    @Input() delay: number;

    private timer;

    @HostListener('mouseenter')
    private show() {
        this.timer = setTimeout(() => {
            this.calloutShown.emit();
            this.callout.show = true;
        }, this.delay || 0);
    }

    @HostListener('mouseleave')
    private hide() {
        clearTimeout(this.timer);
        this.callout.show = false;
    }
}