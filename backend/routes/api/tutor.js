// tutor function for the api
var express = require('express');
var mongodb = require('mongodb');
var axios = require('axios');
const mongocollection = require('../../mongo/collections');
var router = express.Router();
const creds = require('../credentials');

// Get tutor
router.get('/', async (req, res) => {
    const tutor = await mongocollection.tutors();
    res.send(await tutor.find({}).toArray());
});
// Search tutor
router.get('/search', async (req, res) => {
    const tutor = await mongocollection.tutors();
    query = req.query.query;
    lat = req.query.lat;
    long = req.query.long;
    //console.log(req.query);
    const relevant = await tutor.find({classes:query}).toArray();
    //console.log(relevant);
    let coordinates = new Array();
    for (i=0, len = relevant.length; i<len; ++i){
        coordinates.push(relevant[i].lat+","+relevant[i].long);
    }
    origin = lat+","+long;
    //console.log(coordinates);
    apicall = axios.get("https://maps.googleapis.com/maps/api/distancematrix/json?key="+creds.google+"&mode=walking&origins="+origin+"&destinations="+coordinates.join("|"))
                .then(response => {
                    //console.log(response);
                    //console.log(response.data.rows);
                    times = response.data.rows[0].elements;

                    for(i=0, len=times.length; i<len; ++i){
                        relevant[i].duration = times[i].duration;
                    }
                    res.send(relevant);
                });

});
// Add tutor
router.post('/', async (req, res) => {
    const tutor = await mongocollection.tutors();
    
    const userID = req.body.id;
    const info1 = await mongocollection.users();
    const info = await info1.findOne({_id:userID});
    console.log(info1);
    console.log(info);
    const lat = req.body.lat;
    const long = req.body.long;
    await tutor.insertOne({
        name: info.name,
        lat: lat,
        long: long,
        image: info.image,
        classes: info.classes,
        location: req.body.location,
        _id: userID
    });
    res.status(201).send();
});
router.delete("/purge", async (req, res) =>{
    const tutor = await mongocollection.tutors();
    await tutor.remove({});
    res.status(200).send();
});
// Delete tutor
router.delete('/:id', async (req, res) =>{
    const tutor = await mongocollection.tutors();
    await tutor.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});




module.exports = router;