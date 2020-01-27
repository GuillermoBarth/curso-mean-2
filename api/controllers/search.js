'use strict'

var fs = require('fs');
var path = require('path');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

var mongoosePaginate = require('mongoose-pagination');

function albumSearch(req, res){
    
    var param = req.params.param;
    
    if(!param){
		//sacar todos los albums de la bbdd
        var find = Album.find({}).sort('title');
	}else{
		//sacar los albums de la busqueda
        var find = Album.find({"title":{"$regex": "^" + param}}).sort('title');
    }
    
    find.exec((err, albums)=>{
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

function artistSearch(req, res){
    
    var param = req.params.param;
    
    if(!param){
		//sacar todos los albums de la bbdd
        var find = Artist.find({}).sort('name');
	}else{
		//sacar los albums de la busqueda
        var find = Artist.find({"name":{"$regex": "^" + param}}).sort('name');
    }
    
    find.exec((err, artists)=>{
        if(err){
            res.status(500).send({message: 'error en el servidor'});
        }else{
            if(!artists){
                res.status(404).send({message: 'no hay artistas'});
            }else{
 
                res.status(200).send({artists});
                
            }
        }
    });

}

function songSearch(req, res){
    
    var param = req.params.param;
    
    if(!param){
		//sacar todos los albums de la bbdd
        var find = Song.find({}).sort('name');
	}else{
		//sacar los albums de la busqueda
        var find = Song.find({"name":{"$regex": "^" + param}}).sort('name');
    }
    
    find.exec((err, songs)=>{
        if(err){
            res.status(500).send({message: 'error en el servidor'});
        }else{
            if(!songs){
                res.status(404).send({message: 'no hay canciones'});
            }else{
 
                res.status(200).send({songs});
                
            }
        }
    });

}




module.exports = {
    albumSearch,
    artistSearch,
    songSearch
};