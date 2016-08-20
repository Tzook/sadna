import {ClientSocketService} from '../socket/client-socket.service';
import {appRouterProviders} from './client-routes';
import {ClientMainComponent} from './client-main';
import {bootstrap} from '@angular/platform-browser-dynamic';

bootstrap(ClientMainComponent, [appRouterProviders, ClientSocketService])
    .catch(err => console.error(err));