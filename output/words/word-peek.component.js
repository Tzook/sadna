"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const callout_component_1 = require('../Components/callout.component');
const word_peek_service_1 = require('./word-peek.service');
const core_1 = require('@angular/core');
let WordPeekComponent = class WordPeekComponent {
    constructor(wordPeekService) {
        this.wordPeekService = wordPeekService;
        this.showCallout = false;
    }
    ngOnInit() { }
    showRows() {
        this.wordRows = this.wordRows || this.wordPeekService.getWordRows(this.word);
        this.showCallout = true;
    }
    hideRows() {
        this.showCallout = false;
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], WordPeekComponent.prototype, "word", void 0);
WordPeekComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'word-peek',
        styles: [`
        .word {
            padding-bottom: 5px;
        }
        .rows:not(:last-child) {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 2px dotted;
        }
    `],
        template: `
        <span (mouseenter)="showRows()" (mouseleave)="hideRows()">
            <span class="word">{{word}}</span>
            <callout *ngIf="showCallout">
                <div class="rows" *ngFor="let wordRow of wordRows">
                    <div *ngFor="let row of wordRow">
                        {{row}}
                    </div>
                </div>
            </callout>
        </span>
    `,
        directives: [callout_component_1.CalloutComponent]
    }), 
    __metadata('design:paramtypes', [word_peek_service_1.WordPeekService])
], WordPeekComponent);
exports.WordPeekComponent = WordPeekComponent;
//# sourceMappingURL=word-peek.component.js.map