import {GroupsComponent} from '../groups/groups.component';
import {ViewSongComponent} from '../view-song/view-song.component';
import {ROUTE_SONGS_LIST, ROUTE_GROUPS, ROUTE_ADD_SONG, ROUTE_VIEW_SONG, ROUTE_XML_BACKUP} from './routes.constants';
import {SongsListComponent} from '../songs-list/songs-list.component';
import {AddSongComponent} from '../add-song/add-song.component';
import {XmlComponent} from '../db/backup/xml.component';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: ROUTE_SONGS_LIST,
        component: SongsListComponent
    },
    {
        path: ROUTE_GROUPS,
        component: GroupsComponent
    },
    {
        path: ROUTE_ADD_SONG,
        component: AddSongComponent
    },
    {
        path: ROUTE_VIEW_SONG,
        component: ViewSongComponent
    },
    {
        path: ROUTE_XML_BACKUP,
        component: XmlComponent
    },
    {
        path: '**',
        redirectTo: "/" + ROUTE_SONGS_LIST,
        pathMatch: 'full'
    }
];

export const routing = RouterModule.forRoot(routes);