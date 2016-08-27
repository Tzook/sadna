import {XML_BACKUP_FILE_URL} from './xml.constants';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class XmlHttpService {
    constructor(private http: Http) { }

    public getXmlData() : Observable<Response> {
        console.log('calling', XML_BACKUP_FILE_URL);
        return this.http.get(XML_BACKUP_FILE_URL);
    }
}