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
var word_by_index_component_1 = require('../words/word-by-index.component');
var callout_component_1 = require('../Components/callout.component');
var word_peek_component_1 = require('../words/word-peek.component');
var full_song_component_1 = require('../view-song/full-song.component');
var song_info_component_1 = require('../songs/song-info.component');
var add_group_component_1 = require('../groups/add-group.component');
var group_list_component_1 = require('../groups/group-list.component');
var navigation_component_1 = require('../navigation/navigation.component');
var groups_component_1 = require('../groups/groups.component');
var view_song_component_1 = require('../view-song/view-song.component');
var http_1 = require('@angular/http');
var songs_list_component_1 = require('../songs-list/songs-list.component');
var add_song_component_1 = require('../add-song/add-song.component');
var xml_component_1 = require('../db/backup/xml.component');
var client_routes_1 = require('../navigation/client-routes');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var client_main_1 = require('./client-main');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                client_routes_1.routing,
            ],
            declarations: [
                navigation_component_1.NavigationComponent,
                add_group_component_1.AddGroupComponent,
                group_list_component_1.GroupListComponent,
                song_info_component_1.SongInfoComponent,
                word_peek_component_1.WordPeekComponent,
                full_song_component_1.FullSongComponent,
                word_by_index_component_1.WordByIndexComponent,
                callout_component_1.CalloutComponent,
                client_main_1.ClientMainComponent,
                songs_list_component_1.SongsListComponent,
                groups_component_1.GroupsComponent,
                add_song_component_1.AddSongComponent,
                view_song_component_1.ViewSongComponent,
                xml_component_1.XmlComponent,
            ],
            providers: [],
            bootstrap: [client_main_1.ClientMainComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(function (e) {
    console.error(e);
});
//# sourceMappingURL=client-bootstrap.js.map