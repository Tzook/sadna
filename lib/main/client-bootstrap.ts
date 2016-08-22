import {AddSongComponent} from '../songs/add-song.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {ClientMainComponent} from './client-main';
import {routing} from './client-routes';

@NgModule({
	imports: [
		BrowserModule,
		routing
	],
	declarations: [
		ClientMainComponent,
		AddSongComponent
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