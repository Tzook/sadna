/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../typings/manully.d.ts" />
import * as shim from "core-js";
shim;
import {ServerMain} from './server-main';
import {serviceContainer} from './service-container';

let main = serviceContainer.get(ServerMain);
main.useDependencies();
main.beginServer();