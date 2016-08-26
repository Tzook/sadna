import {SongsListService} from './songs-list.service';
import {Component, OnInit} from '@angular/core';
import {Song} from '../db/server-db.model';

@Component({
    moduleId: module.id,
    selector: 'songs-list',
    styles: [`
        section {
            padding: 20px;
        }
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
        h2 {
            font-size: 22px;
            margin-bottom: 5px;
        }
    `],
    template: `
        <section>
            <div *ngFor="let song of songsList">
                <span>
                    <h2>{{song.name}}</h2>
                    <h3>Written by {{song.writer}} | Composed by {{song.composer}}</h3>
                </span>
                <span>
                    <button (click)="viewSong(song)">View song</button>
                </span>
            </div>
        </section>
    `,
    viewProviders: [SongsListService]
})
export class SongsListComponent implements OnInit {
    private songsList: Song[];

    constructor(private songsListService: SongsListService) {}

    ngOnInit() {
        this.songsListService.getSongs()
            .subscribe(
                success => {
                    this.songsList = success.json();
                },
                error => console.log(error)
            );
    }

    private viewSong(song: Song) {
        console.log('viewing song', song);
    }
}