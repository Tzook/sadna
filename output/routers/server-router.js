"use strict";
const path = require('path');
const fs = require('fs');
class Router {
    constructor(app) {
        this.app = app;
    }
    init() {
        let descendantsFolder = path.join(path.dirname(__dirname), "descendants");
        console.log('searching', descendantsFolder);
        fs.readdirSync(descendantsFolder).forEach(file => {
            let RouterDescendant = require(file), 
            // init inhertanced routers here
            routerDescendant = new RouterDescendant(this.app);
        });
    }
}
exports.Router = Router;
//# sourceMappingURL=server-router.js.map