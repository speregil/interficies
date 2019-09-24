import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Http, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable()
export class DownloadService {

    constructor(private http: Http) {}

    downloadFile(url) {		
        return this.http.get(url, { responseType: ResponseContentType.Blob });
    }
}