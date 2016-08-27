import {Injectable} from '@angular/core';
import {XmlService} from './xml.service';
import * as e from 'express';

@Injectable()
export class XmlController {
    constructor(private _xmlService: XmlService) { }

    public backupToXml(req: e.Request, res: e.Response, next: Function) {
        console.log('starting backup to XML');
        this._xmlService.backupToXml()
            .then((xmlData) => {
                res.send(xmlData);
            });
    }

    public backupFromXml(req: e.Request, res: e.Response, next: Function) {
        console.log('starting restore from XML');
        let xmlData = req.file.buffer.toString();
        this._xmlService.backupFromXml(xmlData)
            .then(() => {
                res.send('Successfull resotred DB from XML!');
            })
            .catch(e => {
                res.send(`Error occoured: ${e}`);
            });
    }
}