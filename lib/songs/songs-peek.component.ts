import {wrap} from 'popsicle/dist/plugins';
import {SongsPeekService} from './songs-peek.service';
import {ViewSongService} from '../view-song/view-song.service';
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
        div {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            width: 100%;
        }
        div:not(:last-child) {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 2px dotted;
        }
    `],
    template: `
        <callout-wrap (calloutShown)="fillSongs()" delay="100">
            <pre-callout>{{word}}</pre-callout>
            <callout>
                <div *ngFor="let song of songs">
                    <song-info [song]="song"></song-info>
                    <button [routerLink]="viewSongService.getSongUrl(song)">View song</button>
                </div>
            </callout>
        </callout-wrap>
    `
})
export class SongsPeekComponent {
    @Input() word: string;

    private songs;
    private fetched: boolean;

    constructor(private songsPeekService: SongsPeekService,
                private viewSongService: ViewSongService) {
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