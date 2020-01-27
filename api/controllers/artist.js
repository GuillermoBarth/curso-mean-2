'use strict'

var fs = require('fs');
var path = require('path');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

var mongoosePaginate = require('mongoose-pagination');

function getArtist(req, res){
	var artistId = req.params.id;

	Artist.findById(artistId, (err, artist)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!artist){
				res.status(404).send({message: 'El artista no existe'});
			}else{
				res.status(200).send({artist});
			}
		}
	});

	
}


function saveArtist(req, res){
    var artist = new Artist();
    var params = req.body;

    
	artist.name = params.name;
	artist.gender = params.gender;
    artist.description = params.description;
    artist.image = 'null';

    artist.save((err, artistStored) =>{
    	if(err){
        	res.status(500).send({message: 'error al guardar el artista'});
        }else{
         	if(!artistStored){
            	res.status(404).send({message: 'no se a registrado el artista'});
            }else{
            	res.status(200).send({artist: artistStored});
            }

        }
    });
}


function getArtists(req, res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}
	
	var itemsPerPage = 4;

	Artist.find().sort('name').paginate(page, itemsPerPage, function(err, artists, total){
		if(err){
			res.status(500).send({message: 'error en la petición'});
		}else{
			if(!artists){
				res.status(404).send({message: 'No hat¿y artistas!'});
			}else{
				res.status(200).send({
					pages: total,
					artists: artists
				});
			}

		}
	});
}

function updateArtist(req, res){
	var artistId = req.params.id;
    var update = req.body;
    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated)=>{
        if(err){
            res.status(500).send({message: 'error al actualizar el artista'});
        }else{
			if(!artistUpdated){
				res.status(404).send({message: 'No se a  podido actualizzar el artista'});
			}else{
				res.status(200).send({artist: artistUpdated});
			}
		}
    });

}

function deleteArtist(req, res){
	var artistId = req.params.id;
    Artist.findByIdAndRemove(artistId, (err, artistRemoved)=>{
        if(err){
            res.status(500).send({message: 'error al eliminar artista'});
        }else{
			if(!artistRemoved){
				res.status(404).send({message: 'No se a  podido eliminar el artista'});
			}else{
				
				Album.find({artist: artistRemoved._id}).remove((err, albumRemoved)=>{
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
										res.status(200).send({artist: artistRemoved});
									}
								}
							});
						}
					}
				});

			}
		}
    });

}

function uploadImage(req, res){
	var artistId = req.params.id;
	var file_name ='No subido...';
	
	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];
		
		var ext_split = file_path.split('\.');
		var file_ext = ext_split[1];
		if(file_ext == 'png' || file_ext == 'PNG' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'gif' || file_ext == 'GIF'){
			Artist.findByIdAndUpdate(artistId, {image: file_name},(err, artistUpdated) =>{
				if(err){
					res.status(500).send({message: 'error al actualizar el usuario'});
				}else{
					if(!artistUpdated){
						res.status(404).send({message: 'No se a  podido actualizzar el usuario'});
					}else{
				res.status(200).send({artist: artistUpdated});
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
    var path_file = './uploads/artist/'+imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen'});
        }
    });
}

module.exports = {
	getArtist,
	saveArtist,
	getArtists,
	updateArtist,
	deleteArtist,
	uploadImage,
	getImageFile
};