'use strict'

var fs = require('fs');
var path = require('path');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

var mongoosePaginate = require('mongoose-pagination');

function getAlbum(req, res){
	var albumId = req.params.id;

	Album.findById(albumId).populate({path: 'artist'}).exec((err, album)=>{
		if(err){
			res.status(500).send({message: 'error en la petición'});

		}else{
			if(!album){
				res.status(404).send({message: 'no existe el album'});
			}else{
				res.status(200).send({album});
			}

		}
	});
}

function saveAlbum(req, res){
    var album = new Album();
    var params = req.body;

    
    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;

    album.save((err, albumStored) =>{
    	if(err){
        	res.status(500).send({message: 'error en el servidor'});
        }else{
         	if(!albumStored){
            	res.status(404).send({message: 'no se a registrado el album'});
            }else{
            	res.status(200).send({album: albumStored});
            }

        }
    });
}

function getAlbums(req, res){
	var artistId = req.params.artist;

	if(!artistId){
		//sacar todos los albums de la bbdd
		var find = Album.find({}).sort('title');
	}else{
		//sacar los albums de un artista en concrto de la bbdd
		var find = Album.find({artist: artistId}).sort('year');
	}
	find.populate({path: 'artist'}).exec((err, albums)=>{
		if(err){
			res.status(500).send({message: 'error en el servidor'});
		}else{
			if(!albums){
				res.status(404).send({message: 'no hay albums'});
			}else{
				res.status(200).send({albums});
			}
		}
	});
}

function getAlbumsList(req, res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}
	
	var itemsPerPage = 4;

	Album.find().sort('title').populate({path: 'artist'}).paginate(page, itemsPerPage, function(err, albums, total){
		if(err){
			res.status(500).send({message: 'error en la petición'});
		}else{
			if(!albums){
				res.status(404).send({message: 'No hay albums!'});
			}else{
				res.status(200).send({
					pages: total,
					albums: albums
				});
			}

		}
	});
}



function updateAlbum(req, res){
	var albumId = req.params.id;
    var update = req.body;
    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated)=>{
        if(err){
            res.status(500).send({message: 'error al actualizar el album'});
        }else{
			if(!albumUpdated){
				res.status(404).send({message: 'No se a  podido actualizzar el album'});
			}else{
				res.status(200).send({album: albumUpdated});
			}
		}
    });

}

function deleteAlbum(req, res){
	var albumId = req.params.id;

	Album.findByIdAndRemove(albumId, (err, albumRemoved)=>{
		if(err){
			res.status(500).send({message: 'error al eliminar el album'});
		}else{
			if(!albumRemoved){
				res.status(404).send({message: 'No se a  podido eliminar el album'});
			}else{
				Song.find({album: albumRemoved._id}).remove((err, songRemoved)=>{
					if(err){
						res.status(500).send({message: 'error al eliminar la canción'});
					}else{
						if(!songRemoved){
							res.status(404).send({message: 'No se a  podido eliminar la canción'});
						}else{
							res.status(200).send({album: albumRemoved});
						}
					}
				});
			}
		}
	});
}


function uploadImage(req, res){
	var albumId = req.params.id;
	var file_name ='No subido...';
	
	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];
		
		var ext_split = file_path.split('\.');
		var file_ext = ext_split[1];
		if(file_ext == 'png' || file_ext == 'PNG' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'gif' || file_ext == 'GIF'){
			Album.findByIdAndUpdate(albumId, {image: file_name},(err, albumUpdated) =>{
				if(err){
					res.status(500).send({message: 'error al actualizar el album'});
				}else{
					if(!albumUpdated){
						res.status(404).send({message: 'No se a  podido actualizzar el album'});
					}else{
				res.status(200).send({album: albumUpdated});
					}
				}
			});
			
			
		}else{
			res.status(200).send({message: 'Extención de archivo no valida'});
		}
		
		console.log(file_ext);
	}else{
		res.status(200).send({message: 'No has subido ninguna imagen'});
	}	
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/album/'+imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen'});
        }
    });
}



module.exports = {
	getAlbum,
	saveAlbum,
	getAlbums,
	getAlbumsList,
	updateAlbum,
	deleteAlbum,
	uploadImage,
	getImageFile
};