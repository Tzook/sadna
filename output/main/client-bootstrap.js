"use strict";
const client_socket_service_1 = require('../socket/client-socket.service');
const client_routes_1 = require('./client-routes');
const client_main_1 = require('./client-main');
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
platform_browser_dynamic_1.bootstrap(client_main_1.ClientMainComponent, [client_routes_1.appRouterProviders, client_socket_service_1.ClientSocketService])
    .catch(err => console.error(err));
//# sourceMappingURL=client-bootstrap.js.map