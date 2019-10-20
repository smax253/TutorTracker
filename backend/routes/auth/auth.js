// auth function for the api
var express = require('express');
var mongodb = require('mongodb');
var firebase = require('firebase');
var axios = require('axios');

var router = express.Router();

// create credentials
router.post('/', async (req, res) => {
    var credential = firebase.auth.GoogleAuthProvider.credential(res.body.id_token);
    firebase.auth().signInWithCredential(credential).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        res.status(201).send();
      });
    
    
});


module.exports = router;