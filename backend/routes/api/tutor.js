// tutor function for the api
var express = require('express');
var mongodb = require('mongodb');
var axios = require('axios');

var router = express.Router();
const {creds} = require('../credentials');

// Get tutor
router.get('/', async (req, res) => {
    const tutor = await loadTutorCollection().collection('tutors');
    res.send(await tutor.find({}).toArray());
});
// Search tutor
router.get('/search', async (req, res) => {
    const tutor = await loadTutorCollection().collection('tutors');
    query = req.query.query;
    lat = req.query.lat;
    long = req.query.long;
    const relevant = tutor.find({classes:'query'}).toArray();
    let coordinates = [];
    for (i=0, len = relevant.length; i<len; ++i){
        coordinates += [relevant[i].lat+","+relevant[i].long];
    }
    origin = lat+","+long;
    apicall = axios.get("http://maps.googleapis.com/maps/api/distancematrix/json?key="+creds.google+"&mode=walking&origins="+origin+"&destinations="+coordinates.join("|"))
                .then(response => {
                    times = response.rows.elements;

                    for(i=0, len=times.length; i<len; ++i){
                        relevant[i].duration = times[i].duration;
                    }
                    res.send(relevant);
                });

});
// Add tutor
router.post('/', async (req, res) => {
    const tutor = await loadTutorCollection();
    const userID = req.body.id;
    const info = tutor.collection('users').findOne({id:userID});
    const lat = req.query.lat;
    const long = req.query.long;
    await tutor.insertOne({
        name: info.name,
        lat: lat,
        long: long,
        image: info.image,
        classes: info.classes,
        location: req.query.location,
        id: userID
    });
    res.status(201).send();
});
// Delete tutor
router.delete('/:id', async (req, res) =>{
    const tutor = await loadTutorCollection();
    await tutor.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadTutorCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://hackru:hackru2019@tutorcluster-gfcpf.mongodb.net/test?retryWrites=true&w=majority',{
            useNewUrlParser: true
        }
    );

    return client.db('tutor_list').collection('tutors');
}

module.exports = router;