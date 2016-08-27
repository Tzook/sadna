import {SongsListService} from './songs-list.service';
import {SongInfoComponent} from '../songs/song-info.component';
import {Component, OnInit} from '@angular/core';
import {ROUTE_VIEW_SONG} from '../navigation/routes.constants';
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
        <div *ngFor="let song of songsList" class="animated fadeInDown">
            <song-info [song]="song"></song-info>
            <span>
                <button [routerLink]="getSongUrl(song)">View song</button>
            </span>
        </div>
    `,
    directives: [SongInfoComponent],
    viewProviders: [SongsListService]
})
export class SongsListComponent implements OnInit {
    private songsList: Song[];

    constructor(private songsListService: SongsListService) {}

    ngOnInit() {
        this.songsListService.getSongs()
            .subscribe(
                success => this.songsList = success.json(),
                error => console.log(error)
            );
    }

    private getSongUrl(song: Song): string {
        return "/" + ROUTE_VIEW_SONG
                        .replace(":id", "" + song.id)
                        .replace(":name", song.name)
                        .replace(":writer", "" + song.writer)
                        .replace(":composer", "" + song.composer);
    }
}