"use strict";
/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../main.d.ts" />
var shim = require("core-js");
shim;
var server_main_1 = require('./server-main');
var service_container_1 = require('./service-container');
var main = service_container_1.serviceContainer.get(server_main_1.ServerMain);
main.useDependencies();
main.beginServer();
//# sourceMappingURL=server-bootstrap.js.map