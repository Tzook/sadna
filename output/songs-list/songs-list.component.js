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
const songs_list_service_1 = require('./songs-list.service');
const core_1 = require('@angular/core');
let SongsListComponent = class SongsListComponent {
    constructor(songsListService) {
        this.songsListService = songsListService;
    }
    ngOnInit() {
        this.songsListService.getSongs()
            .subscribe(success => {
            this.songsList = success.json();
        }, error => console.log(error));
    }
    viewSong(song) {
        console.log('viewing song', song);
    }
};
SongsListComponent = __decorate([
    core_1.Component({
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
        viewProviders: [songs_list_service_1.SongsListService]
    }), 
    __metadata('design:paramtypes', [songs_list_service_1.SongsListService])
], SongsListComponent);
exports.SongsListComponent = SongsListComponent;
//# sourceMappingURL=songs-list.component.js.map