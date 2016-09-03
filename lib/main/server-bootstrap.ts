/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../main.d.ts" />
import * as shim from "core-js";
shim;
import {ServerMain} from './server-main';
import {serviceContainer} from './service-container';

let main: ServerMain = serviceContainer.get(ServerMain);
main.useDependencies();
main.beginServer();