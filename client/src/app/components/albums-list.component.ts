import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
import { UserService } from '../services/user.service';
import { SongService } from '../services/song.service';
import { AlbumService } from '../services/album.service';
import { GLOBAL } from '../services/global';
import { Song } from '../models/song';
import { Album } from '../models/album';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
    selector: 'albums-list',
    templateUrl: '../views/albums-list.html',
    providers: [UserService, SongService, AlbumService]
})

export class AlbumsListComponent implements OnInit{
    public titulo: string;
    public songs: Song;
    public albums: Album[];
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public next_page;
    public prev_page;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _albumService: AlbumService,
        private _songService: SongService

    ){
        this.titulo ='Listar Albúms';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.next_page = 1;
        this.prev_page = 1;
    }

    ngOnInit(){
        console.log('albums.list.component.ts cargado');
        this.getAlbumsList();
        
      
    }

    getAlbumsList(){
        this._route.params.forEach((params: Params) => {
            let page = +params['page'];
            if(!page){
                page =1;
            }else{
                this.next_page= page+1;
                this.prev_page= page-1;
                
                if(this.prev_page==0){
                    this.prev_page=1;
                }
            }
            this._songService.getSongs(this.token).subscribe(
                response =>{
                    
                    if(!response.songs){
                        this.alertMessage="Este album no tiene canciones";
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
            this._albumService.getAlbumsList(this.token, page).subscribe(
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

    startPlayer(song){
        let song_player = JSON.stringify(song);
        let file_path = this.url + 'get-song-file/' + song.file;
        let image_path = this.url + 'get-image-album/' + song.album.image;

        localStorage.setItem('sound_song', song_player);

        document.getElementById("mp3-source").setAttribute("src", file_path);
        (document.getElementById("player") as any).load();        
        (document.getElementById("player") as any).play();

        document.getElementById('play-song-title').innerHTML = song.name;
        document.getElementById('play-song-artist').innerHTML = song.album.artist.name;
        document.getElementById('play-image-album').setAttribute('src', image_path);
    }


    onGenderList(){
        return this.albums;
        
    }
}