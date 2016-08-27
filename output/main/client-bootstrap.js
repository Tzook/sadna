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
const view_song_component_1 = require('../view-song/view-song.component');
const http_1 = require('@angular/http');
const songs_list_component_1 = require('../songs-list/songs-list.component');
const add_song_component_1 = require('../add-song/add-song.component');
const xml_component_1 = require('../db/backup/xml.component');
const client_routes_1 = require('../navigation/client-routes');
const core_1 = require('@angular/core');
const platform_browser_1 = require('@angular/platform-browser');
const forms_1 = require('@angular/forms');
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
const client_main_1 = require('./client-main');
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            client_routes_1.routing
        ],
        declarations: [
            client_main_1.ClientMainComponent,
            add_song_component_1.AddSongComponent,
            songs_list_component_1.SongsListComponent,
            view_song_component_1.ViewSongComponent,
            xml_component_1.XmlComponent,
        ],
        providers: [],
        bootstrap: [client_main_1.ClientMainComponent]
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
exports.AppModule = AppModule;
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(e => {
    console.error(e);
});
//# sourceMappingURL=client-bootstrap.js.map