import {AddSongComponent} from '../songs/add-song.component';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: AddSongComponent,
        pathMatch: 'full'
    }
];

export const routing = RouterModule.forRoot(routes);;