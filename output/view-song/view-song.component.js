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
const router_1 = require('@angular/router');
const view_song_service_1 = require('./view-song.service');
const core_1 = require('@angular/core');
let ViewSongComponent = class ViewSongComponent {
    constructor(viewSongService, route) {
        this.viewSongService = viewSongService;
        this.route = route;
    }
    ngOnInit() {
        let params = this.route.snapshot.params;
        this.viewSongService.getSong(params["id"])
            .subscribe(success => console.log(success.json()), error => console.log(error));
    }
};
ViewSongComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'view-song',
        styles: [`

    `],
        template: `
        View a specific song be here
    `,
        viewProviders: [view_song_service_1.ViewSongService]
    }), 
    __metadata('design:paramtypes', [view_song_service_1.ViewSongService, router_1.ActivatedRoute])
], ViewSongComponent);
exports.ViewSongComponent = ViewSongComponent;
//# sourceMappingURL=view-song.component.js.map