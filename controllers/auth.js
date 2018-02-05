'use strict'

const mongoose = require('mongoose');
const user = require('../models/user');
const service = require('../services');

function signUp(req, res){
const User = new user({
    email: req.body.email,
    displayName: req.body.displayName
});

User.save((err) => {
    if(err) res.status(500).send({message: `Error al crear el usuario ${err}`});

    return res.status(200).send({token: service.createToken(User)});
});
}

function signIn(){

}

module.exports = {
    signIn,
    signUp
}