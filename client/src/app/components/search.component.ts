import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { UserService } from '../services/user.service';
import { SearchService } from '../services/search.service';
import { GLOBAL } from '../services/global';
import { Artist } from '../models/artist';
import { Album } from '../models/album';
import { Song } from '../models/song';

@Component({
    selector: 'search',
    templateUrl: '../views/search.html',
    providers: [UserService,SearchService]
})

export class SearchComponent implements OnInit{
    public titulo: string;
    public songs: Song[];
    public albums: Album[];
    public artists: Artist[];
    public identity;
    public token;
    public url: string;
    public alertMessage;
    //public param: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _searchService: SearchService

    ){
        this.titulo ='Buscador';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        //this.param = 'hola';
    }

    ngOnInit(){
        console.log('search.component.ts cargado');
        this.albumSearch();
        this.artistSearch();
        this.songSearch();
        
    }


    albumSearch(){
        this._route.params.forEach((params: Params) => {
            let param= params['param'];
            //param='Hone';
            console.log(param);
            this._searchService.searchAlbum(this.token, param).subscribe(
                response => {
                    if (!response.albums){
                        this._router.navigate(['/']);
                    }else{
                        this.albums = response.albums;
                        console.log(this.albums);
                    }
                },
                error =>{
                    var errorMessage =<any>error;
        
                    if(errorMessage!=null){
                      var body = JSON.parse(error._body);
                      //this.alertMessage = body.message;
                      console.log(error);
                    }
                }
            );
        });
    }

    artistSearch(){
        this._route.params.forEach((params: Params) => {
            let param= params['param'];
            //param='Hone';
            console.log(param);
            this._searchService.searchArtist(this.token, param).subscribe(
                response => {
                    if (!response.artists){
                        this._router.navigate(['/']);
                    }else{
                        this.artists = response.artists;
                        console.log(this.artists);
                    }
                },
                error =>{
                    var errorMessage =<any>error;
        
                    if(errorMessage!=null){
                      var body = JSON.parse(error._body);
                      //this.alertMessage = body.message;
                      console.log(error);
                    }
                }
            );
        });
    }

    songSearch(){
        this._route.params.forEach((params: Params) => {
            let param= params['param'];
            //param='Hone';
            console.log(param);
            this._searchService.searchSong(this.token, param).subscribe(
                response => {
                    if (!response.songs){
                        this._router.navigate(['/']);
                    }else{
                        this.songs = response.songs;
                        console.log(this.songs);
                    }
                },
                error =>{
                    var errorMessage =<any>error;
        
                    if(errorMessage!=null){
                      var body = JSON.parse(error._body);
                      //this.alertMessage = body.message;
                      console.log(error);
                    }
                }
            );
        });
    }
    
}