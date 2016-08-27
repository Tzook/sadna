import {Injectable} from '@angular/core';
import {XmlService} from './xml.service';
import * as e from 'express';

@Injectable()
export class XmlController {
    constructor(private _xmlService: XmlService) { }

    public backupToXml(req: e.Request, res: e.Response, next: Function) {
        this._xmlService.backupToXml()
            .then((xmlData) => {
                res.send(xmlData);
            });
    }

    public backupFromXml(req: e.Request, res: e.Response, next: Function) {
        
    }
}