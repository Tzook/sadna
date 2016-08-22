import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'selector',
    template: `
        I am add song component
    `
})
export class AddSongComponent implements OnInit {
    constructor() { }

    ngOnInit() { console.log('adding song')}
}