import {ROUTE_LOBBY, ROUTE_ADD_SONG} from '../navigation/routes.constants';
import {LobbyComponent} from '../lobby/lobby.component';
import {AddSongComponent} from '../songs/add-song.component';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: "/" + ROUTE_LOBBY,
        pathMatch: 'full'
    },
    {
        path: ROUTE_LOBBY,
        component: LobbyComponent
    },
    {
        path: ROUTE_ADD_SONG,
        component: AddSongComponent
    }
];

export const routing = RouterModule.forRoot(routes);;