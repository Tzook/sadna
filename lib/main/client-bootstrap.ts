import {WordByIndexComponent} from '../words/word-by-index.component';
import {CalloutComponent} from '../Components/callout.component';
import {WordPeekComponent} from '../words/word-peek.component';
import {FullSongComponent} from '../view-song/full-song.component';
import {SongInfoComponent} from '../songs/song-info.component';
import {AddGroupComponent} from '../groups/add-group.component';
import {GroupListComponent} from '../groups/group-list.component';
import {NavigationComponent} from '../navigation/navigation.component';
import {GroupsComponent} from '../groups/groups.component';
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
		routing,
	],
	declarations: [
		NavigationComponent,
		AddGroupComponent,
		GroupListComponent,
		SongInfoComponent,
		WordPeekComponent,
		FullSongComponent,
		WordByIndexComponent,
		CalloutComponent,
		ClientMainComponent,
		SongsListComponent,
		GroupsComponent,
		AddSongComponent,
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