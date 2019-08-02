import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ChallengesService {

    host = 'localhost:3100';

    constructor( private http: HttpClient ) {}

    getMasterChallenges( type ){
        return this.http.get<{}>('http://' + this.host + '/challenges/master/list/' + type);
    }
}