import {ADD_GROUP_URL, GET_GROUPS_URL} from './groups.constants';
import {AddGroup} from './add-group.model';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ClientGroupsService {

    constructor(private http: Http) {}

    public addGroup(group: AddGroup): Observable<Response> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});

        return this.http.post(ADD_GROUP_URL, JSON.stringify(group), options);
    }

    public getGroups(): Observable<Response> {
        return this.http.get(GET_GROUPS_URL);
    }
}