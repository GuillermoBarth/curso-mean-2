import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//importn home
import{HomeComponent} from './components/home.component';

//Importn Users
import {UserEditComponent} from './components/user-edit.component';

//Import Artists
import {ArtistListComponent} from './components/artist-list.component';
import{ArtistAddComponent} from './components/artist-add.component';
import{ArtistEditComponent} from './components/artist-edit.component';
import{ArtistDetailComponent} from './components/artist-detail.component';

//Importn Albums
import{AlbumAddComponent} from './components/album-add.component';
import{AlbumEditComponent} from './components/album-edit.component';
import{AlbumDetailComponent} from './components/album-detail.component';
import{AlbumsListComponent} from './components/albums-list.component';
//importn song
import{SongAddComponent} from './components/song-add.component';
import{SongEditComponent} from './components/song-edit.component';

//buscar
import{SearchComponent} from './components/search.component';

const appRoutes: Routes =[
    {path: '', component: HomeComponent},
    {path: 'artistas/:page', component:ArtistListComponent},
    {path: 'crear-artista', component:ArtistAddComponent},
    {path: 'editar-artista/:id', component:ArtistEditComponent},
    {path: 'artista/:id', component:ArtistDetailComponent},
    {path: 'crear-album/:artist', component:AlbumAddComponent},
    {path: 'editar-album/:id', component:AlbumEditComponent},
    {path: 'album/:id', component:AlbumDetailComponent},
    {path: 'albums/:page', component:AlbumsListComponent},
    {path: 'editar-tema/:id', component:SongEditComponent},
    {path: 'mis-datos', component:UserEditComponent},
    {path: 'crear-tema/:album', component:SongAddComponent},
    {path: 'buscar/:param', component:SearchComponent},
    {path: '**', component: HomeComponent}
    
];

export const appRoutingProviders: any[] =[];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);

