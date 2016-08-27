import { Injectable } from '@angular/core';
import {XmlController} from './xml.controller';
import {XML_BACKUP_FILE_URL} from './xml.contants';

@Injectable()
export class XmlRouter {
    constructor(private _xmlController: XmlController) {}

    /**
     * List the routes
     */
    init(app) {
        app.get(XML_BACKUP_FILE_URL,
                this._xmlController.backupToXml.bind(this._xmlController));

        app.post(XML_BACKUP_FILE_URL,
                this._xmlController.backupFromXml.bind(this._xmlController));
    }
}