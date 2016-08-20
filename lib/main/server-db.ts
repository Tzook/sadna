let pg = require('pg');

import {Injectable} from '@angular/core';

@Injectable()
export class DbService {
    private client: any;

    connect() {
        let dbUrl = 'postgres://lhliohoqujljaa:vUnwJ12tti0gFdvBOi0zhOjd9B@ec2-54-225-90-198.compute-1.amazonaws.com:5432/d5brvm90sfeepi';
        return new Promise((resolve, reject) => {
            pg.defaults.ssl = true;
            pg.connect(dbUrl, (err, client) => {
                if (err) reject(err);
                else {
                    console.log('Connected to postgres successfully!');
                    this.client = client;
                    resolve(this.client);
                }
            });
        });
    }
    
    get dbClient () {
        return this.client;
    }
}