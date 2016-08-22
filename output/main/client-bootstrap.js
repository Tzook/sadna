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
const add_song_component_1 = require('../songs/add-song.component');
const core_1 = require('@angular/core');
const platform_browser_1 = require('@angular/platform-browser');
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
const client_main_1 = require('./client-main');
const client_routes_1 = require('./client-routes');
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            client_routes_1.routing
        ],
        declarations: [
            client_main_1.ClientMainComponent,
            add_song_component_1.AddSongComponent
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