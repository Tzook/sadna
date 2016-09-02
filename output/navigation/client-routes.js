"use strict";
var groups_component_1 = require('../groups/groups.component');
var view_song_component_1 = require('../view-song/view-song.component');
var routes_constants_1 = require('./routes.constants');
var songs_list_component_1 = require('../songs-list/songs-list.component');
var add_song_component_1 = require('../add-song/add-song.component');
var xml_component_1 = require('../db/backup/xml.component');
var router_1 = require('@angular/router');
var routes = [
    {
        path: routes_constants_1.ROUTE_SONGS_LIST,
        component: songs_list_component_1.SongsListComponent
    },
    {
        path: routes_constants_1.ROUTE_GROUPS,
        component: groups_component_1.GroupsComponent
    },
    {
        path: routes_constants_1.ROUTE_ADD_SONG,
        component: add_song_component_1.AddSongComponent
    },
    {
        path: routes_constants_1.ROUTE_VIEW_SONG,
        component: view_song_component_1.ViewSongComponent
    },
    {
        path: routes_constants_1.ROUTE_XML_BACKUP,
        component: xml_component_1.XmlComponent
    },
    {
        path: '**',
        redirectTo: "/" + routes_constants_1.ROUTE_SONGS_LIST,
        pathMatch: 'full'
    }
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=client-routes.js.map