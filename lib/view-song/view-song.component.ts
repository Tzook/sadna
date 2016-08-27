import {CompleteSong} from '../db/server-db.model';
import {ActivatedRoute} from '@angular/router';
import {ViewSongService} from './view-song.service';
import {Component, OnInit} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'view-song',
    styles: [`

    `],
    template: `
        View a specific song be here
        <section>
            <div *ngFor="let word of words">
                {{word | json}}
            </div>
        </section>
    `,
    viewProviders: [ViewSongService]
})
export class ViewSongComponent implements OnInit {
    private words: CompleteSong[];

    constructor(private viewSongService: ViewSongService,
                private route: ActivatedRoute) {
        this.words = [];
    }

    ngOnInit() {
        let params = this.route.snapshot.params;
        this.viewSongService.getSong(params["id"])
                .subscribe(
                    success => this.words = success.json(),
                    error => console.log(error)
                );
    }
}