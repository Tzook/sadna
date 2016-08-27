import {ViewSongComponent} from '../view-song/view-song.component';
import {HttpModule} from '@angular/http';
import {SongsListComponent} from '../songs-list/songs-list.component';
import {AddSongComponent} from '../add-song/add-song.component';
import {XmlComponent} from '../db/backup/xml.component';
import {routing} from '../navigation/client-routes';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {ClientMainComponent} from './client-main';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing
	],
	declarations: [
		ClientMainComponent,
		AddSongComponent,
		SongsListComponent,
		ViewSongComponent,
		XmlComponent,
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