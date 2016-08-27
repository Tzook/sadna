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
    `,
    viewProviders: [ViewSongService]
})
export class ViewSongComponent implements OnInit {
    constructor(private viewSongService: ViewSongService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        let params = this.route.snapshot.params;
        this.viewSongService.getSong(params["id"])
                .subscribe(
                    success => console.log(success.json()),
                    error => console.log(error)
                );
    }
}