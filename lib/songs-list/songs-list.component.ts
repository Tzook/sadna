import {SongsListService} from './songs-list.service';
import {ViewSongService} from '../view-song/view-song.service';
import {Component, OnInit, Input} from '@angular/core';
import {Song} from '../db/server-db.model';

@Component({
    moduleId: module.id,
    selector: 'songs-list',
    styles: [`
        div {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: 15px;
            margin-bottom: 20px;
            border: 1px solid;
            border-radius: 2px;
            box-shadow: 1px 2px 2px -1px rgba(0,0,0,.6);
        }
    `],
    template: `
        <div *ngFor="let song of list" class="animated fadeInDown">
            <song-info [song]="song"></song-info>
            <span>
                <button [routerLink]="viewSongService.getSongUrl(song)">View song</button>
            </span>
        </div>
    `,
    viewProviders: [ViewSongService, SongsListService]
})
export class SongsListComponent implements OnInit {
    @Input() list: Song[];

    constructor(private songsListService: SongsListService,
                private viewSongService: ViewSongService) {}

    ngOnInit() {
        if (!this.list) {
            this.songsListService.getSongs()
                .subscribe(
                    success => this.list = success.json(),
                    error => console.log(error)
                );
        }
    }
}