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
        console.log('starting to restore from XML');
        let xmlData = req.file.buffer.toString();
        this._xmlService.backupFromXml(xmlData)
            .then(() => {
                // res.send('Successfull restored the DB from XML!');
                res.redirect('/xml?status=success')
            })
            .catch(e => {
                console.log(`Error occoured: ${e}`);
                res.redirect('/xml?status=error')
            });
    }
}