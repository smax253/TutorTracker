var express = require('express');
var mongodb = require('mongodb');
const mongocollection = require("../../mongo/collections");
var twilio = require('twilio');
var router = express.Router();
var creds = require("../credentials");

router.post("/test", (req, res) =>{
    console.log(req.query);
})

router.post("/", async (req, res)=>{
    let responseobject = {};
    console.log(req.query);
    query = req.query.Field_course_Value;
    location = req.query.Field_location_Value;
    const tutors = await mongocollection.tutors();
    const relevant = await tutors.find({classes:query}).toArray();
    let coordinates = new Array();
    for (i=0, len = relevant.length; i<len; ++i){
        coordinates.push(relevant[i].lat+","+relevant[i].long);
    }
    origin = location;
    apicall = axios.get("https://maps.googleapis.com/maps/api/distancematrix/json?key="+creds.google+"&mode=walking&origins="+origin+"&destinations="+coordinates.join("|"))
                .then(response => {
                    //console.log(response);
                    //console.log(response.data.rows);
                    times = response.data.rows[0].elements;

                    for(i=0, len=times.length; i<len; ++i){
                        relevant[i].duration = times[i].duration;
                    }
                    relevant.sort((a,b)=>{return b.duration.value-a.duration.value});

                    responseobject = {
                        "actions":[
                            {
                                "say": {"speech":"Here are the top (up to 3) tutors near you."}
                            }
                        ]
                    }
                    for (i = 0, len = relevant.length; i<3 && i<len; ++i){
                        current = relevant[i];
                        responseobject.actions.push(
                            {
                                'say':current.name+'\n'+current.location+'\n'+current.duration.text
                            }
                        )
                    }
                    res.send(responseobject);
                });
});

router.post('/search', async (req, res)=>{
    const tutor = await mongocollection.tutors();
    console.log(req.query);
    query = req.query.Field_course_Value;
    location = req.query.Field_location_Value;
    const relevant = await tutor.find({classes:query}).toArray();
    //console.log(relevant);
    let coordinates = new Array();
    for (i=0, len = relevant.length; i<len; ++i){
        coordinates.push(relevant[i].lat+","+relevant[i].long);
    }
    origin = location;
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
})
module.exports = router;