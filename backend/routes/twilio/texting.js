var express = require('express');
var mongodb = require('mongodb');
const mongocollection = require("../../mongo/collections");
var twilio = require('twilio');
var mongocollection = require('../../mongo/collections');
var router = express.Router();
var creds = require("../credentials");

router.post("/", (req, res)=>{
    let responseobject = {};
    let memory = JSON.parse(req.query.Memory);
    let answers = memory.twilio.collected_data.find_tutor.answers;
    let course = answers.course.answer;
    let location = answers.location.answer;
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
                    relevant.sort((a,b)=>{return a.duration.value-b.duration.value});
                    responseobject = {
                        "actions":[
                            {
                                "say": {"speech":"Here are the top (up to 3) tutors near you."}
                            },
                            {
                                "say": {"speech":""}
                            }
                        ]
                    }
                });
});


module.exports = router;