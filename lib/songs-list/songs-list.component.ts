import {SongsListService} from './songs-list.service';
import {Component, OnInit} from '@angular/core';
import {Song} from '../db/server-db.model';

@Component({
    moduleId: module.id,
    selector: 'songs-list',
    styles: [`

    `],
    template: `
        Songs list be here
    `,
    viewProviders: [SongsListService]
})
export class SongsListComponent implements OnInit {
    private list: Song[];

    constructor(private songsListService: SongsListService) {}

    ngOnInit() {
        this.songsListService.getSongs()
            .subscribe(
                success => {
                    console.log('success', success);
                    this.list = success.json();
                    console.log(this.list);
                },
                error => console.log(error)
            );
    }
}