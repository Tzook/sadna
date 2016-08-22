"use strict";
const add_song_component_1 = require('../songs/add-song.component');
const router_1 = require('@angular/router');
const routes = [
    {
        path: '',
        component: add_song_component_1.AddSongComponent,
        pathMatch: 'full'
    }
];
exports.routing = router_1.RouterModule.forRoot(routes);
;
//# sourceMappingURL=client-routes.js.map