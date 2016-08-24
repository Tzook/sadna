import {LobbyComponent} from '../lobby/lobby.component';
import {AddSongComponent} from '../songs/add-song.component';
import {routing} from '../navigation/client-routes';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {ClientMainComponent} from './client-main';

@NgModule({
	imports: [
		BrowserModule,
		routing
	],
	declarations: [
		ClientMainComponent,
		AddSongComponent,
		LobbyComponent
	],
	providers: [
		// HeroService
	],
	bootstrap: [ ClientMainComponent ]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule)
	.catch(e => {
		console.error(e);
	});