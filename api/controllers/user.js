'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');


function pruebas(req, res){
    res.status(200).send({message: 'probando controlador usuario'});

}


function saveUser(req, res){
    var user = new User();
    var params = req.body;

    
    user.name = params.name;
    user.suname = params.suname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    if(params.password){ //encriptar cpntraseña
        bcrypt.hash(params.password, null, null, function(err, hash){
            user.password = hash;
            if(user.name!= null && user.suname!= null && user.email!= null){
                //guardar el ususario
                user.save((err, userStored) =>{
                    if(err){
                        res.status(500).send({message: 'error al guardar el usuario'});
                    }else{
                        if(!userStored){
                            res.status(404).send({message: 'no se a registrado el usuario'});
                        }else{
                            res.status(200).send({user: userStored});
                        }

                    }
                });
            }else{
                res.status(200).send({message: 'Introduce todos los campos'});
            }
        });
    }else{
        res.status(200).send({message: 'Introduce la contraseña'});
    }
}


function loginUser(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user)=>{
        if(err){
            res.status(500).send({message: 'error en la petición'});
        }else{
            if(!user){
                res.status(404).send({message: 'el usuario no existe'});
            }else{
                //comprobar contraseña
                bcrypt.compare(password, user.password, function(err, check){
                    if(check){
                        //devolver los datos de usuario logeado
                        if(params.gethash){
                            //devolver un toker de twt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        
                        }else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({message: 'el usuario no a podido logearse'});
                    }
                });
            }
        }
    });
}


function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    if (userId != req.user.sub){
        return res.status(500).send({message: 'No tienes permiso para actualizar este usuario'});
    }
    User.findByIdAndUpdate(userId, update, (err, userUpdated)=>{
        if(err){
            res.status(500).send({message: 'error al actualizar el usuario'});
        }else{
			if(!userUpdated){
				res.status(404).send({message: 'No se a  podido actualizzar el usuario'});
			}else{
				res.status(200).send({user: userUpdated});
			}
		}
    });
}

function uploadImage(req, res){
	var userId = req.params.id;
	var file_name ='No subido...';
	
	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];
		
		var ext_split = file_path.split('\.');
		var file_ext = ext_split[1];
		if(file_ext == 'png' || file_ext == 'PNG' || file_ext == 'jpg' || file_ext == 'JPG' || file_ext == 'gif' || file_ext == 'GIF'){
			User.findByIdAndUpdate(userId, {image: file_name},(err, userUpdated) =>{
				if(err){
					res.status(500).send({message: 'error al actualizar el usuario'});
				}else{
					if(!userUpdated){
						res.status(404).send({message: 'No se a  podido actualizzar el usuario'});
					}else{
				res.status(200).send({image: file_name, user: userUpdated});
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
    var path_file = './uploads/users/'+imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen'});
        }
    });
}


module.exports = {
	updateUser,
    pruebas,
    saveUser,
    loginUser,
	uploadImage,
    getImageFile
};