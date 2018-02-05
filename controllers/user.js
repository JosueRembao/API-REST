'use strict'

const mongoose = require('mongoose');
const user = require('../models/user');
const service = require('../services');

function signUp(req, res){
const User = new user({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
});

User.save((err) => {
    if(err) res.status(500).send({message: `Error al crear el usuario ${err}`});

    return res.status(200).send({token: service.createToken(User)});
});
}

function signIn(){
    User.find({email: req.body.email}, (err, user)=>{
        if(err) return res.status(500).send({message: err});
        if(!user) return  res.status(404).send({message: 'No existe el usuario'});

        req.user = user;
        res.status(200).send({
            message: 'Has iniciado sesion correctamente',
            token: service.createToken(user)
        });
    });

}

module.exports = {
    signIn,
    signUp
}