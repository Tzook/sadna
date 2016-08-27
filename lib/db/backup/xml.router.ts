import { Injectable } from '@angular/core';
import {XmlController} from './xml.controller';
import {XML_BACKUP_FILE_URL} from './xml.constants';
import * as multer from 'multer';

@Injectable()
export class XmlRouter {
    private _upload : multer.Instance;
    constructor(private _xmlController: XmlController) {
        this._upload = multer()
    }

    /**
     * List the routes
     */
    init(app) {
        app.get(XML_BACKUP_FILE_URL,
                this._xmlController.backupToXml.bind(this._xmlController));

        app.post(XML_BACKUP_FILE_URL, this._upload.single('data'),
                this._xmlController.backupFromXml.bind(this._xmlController));
    }
}