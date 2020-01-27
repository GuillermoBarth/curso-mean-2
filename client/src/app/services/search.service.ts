import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Album } from '../models/album';
//import { Artist } from '../models/artist';
//import { Song } from '../models/song';

@Injectable()
export class SearchService{
    public url: string;
    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }

searchAlbum(token, param: String){
    let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization': token
    });
    
        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url + 'album-search/' + param, options)
                .map(res => res.json());
    
    
}

searchArtist(token, param){
    let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization': token
    });

    let options = new RequestOptions({headers: headers});
    return this._http.get(this.url + 'artist-search/' + param, options)
                .map(res => res.json());
}

searchSong(token, param){
    let headers = new Headers({
        'Content-Type':'application/json',
        'Authorization': token
    });

    let options = new RequestOptions({headers: headers});
    return this._http.get(this.url + 'song-search/' + param, options)
                .map(res => res.json());
}

}