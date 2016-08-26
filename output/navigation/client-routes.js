"use strict";
const routes_constants_1 = require('../navigation/routes.constants');
const songs_list_component_1 = require('../songs-list/songs-list.component');
const add_song_component_1 = require('../add-song/add-song.component');
const router_1 = require('@angular/router');
const routes = [
    {
        path: routes_constants_1.ROUTE_SONGS_LIST,
        component: songs_list_component_1.SongsListComponent
    },
    {
        path: routes_constants_1.ROUTE_ADD_SONG,
        component: add_song_component_1.AddSongComponent
    },
    {
        path: '**',
        redirectTo: "/" + routes_constants_1.ROUTE_SONGS_LIST,
        pathMatch: 'full'
    }
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=client-routes.js.map