import {wrap} from 'popsicle/dist/plugins';
import {SongsPeekService} from './songs-peek.service';
import {Component, Input} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'songs-peek',
    styles: [`
        :host {
            line-height: 25px;
            letter-spacing: 1.5px;
        }
        :host:not(:last-child):after {
            content: " | ";
        }
    `],
    template: `
        <callout-wrap (calloutShown)="fillSongs()">
            <pre-callout>{{word}}</pre-callout>
            <callout>
                {{songs | json}}
            </callout>
        </callout-wrap>
    `
})
export class SongsPeekComponent {
    @Input() word: string;

    private songs;
    private fetched: boolean;

    constructor(private songsPeekService: SongsPeekService) {
        this.fetched = false;
    }

    private fillSongs() {
        if (!this.fetched) {
            this.fetched = true;
            this.songsPeekService.getSongs(this.word)
                .subscribe(
                    success => this.songs = success.json(),
                    error => console.log(error)
                );
        }
    }
}