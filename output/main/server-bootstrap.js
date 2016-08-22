"use strict";
/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../main.d.ts" />
const shim = require("core-js");
shim;
const server_main_1 = require('./server-main');
const service_container_1 = require('./service-container');
let main = service_container_1.serviceContainer.get(server_main_1.ServerMain);
main.useDependencies();
main.beginServer();
//# sourceMappingURL=server-bootstrap.js.map