import {ChooseRoomComponent} from '../choose-room/choose-room.component';
import {RouterConfig, provideRouter} from '@angular/router';

const routes: RouterConfig = [
    { path: '', component: ChooseRoomComponent },
    //   { path: 'heroes', component: HeroListComponent },
    //   { path: 'hero/:id', component: HeroDetailComponent },
    //   { path: '**', component: PageNotFoundComponent }
];

export const appRouterProviders = [
    provideRouter(routes)
];