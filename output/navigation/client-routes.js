"use strict";
const routes_constants_1 = require('../navigation/routes.constants');
const lobby_component_1 = require('../lobby/lobby.component');
const add_song_component_1 = require('../add-song/add-song.component');
const router_1 = require('@angular/router');
const routes = [
    {
        path: '',
        redirectTo: "/" + routes_constants_1.ROUTE_LOBBY,
        pathMatch: 'full'
    },
    {
        path: routes_constants_1.ROUTE_LOBBY,
        component: lobby_component_1.LobbyComponent
    },
    {
        path: routes_constants_1.ROUTE_ADD_SONG,
        component: add_song_component_1.AddSongComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(routes);
;
//# sourceMappingURL=client-routes.js.map