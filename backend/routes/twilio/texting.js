var express = require('express');
var mongodb = require('mongodb');
const mongocollection = require("../../mongo/collections");
var twilio = require('twilio');
var router = express.Router();
var axios = require('axios');
var creds = require("../credentials");

router.post("/test", (req, res) =>{
    console.log(req.query);
})

router.post("/", async (req, res)=>{
    let responseobject = {};
    console.log(req);
    query = req.body.Field_course_Value;
    location = req.body.Field_location_Value;
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
                    relevant.reverse();
                    responseobject = {
                        "actions":[
                            {
                                "say": "Here are the top (up to 3) tutors near you."
                            },
                            {
                                "remember":{
                                    "ids":new Array(),
                                    "lat":new Array(),
                                    "long":new Array(),
                                    "name": new Array()
                                }
                            },
                            {
                                "collect":{
                                    "name":"more_info",
                                    "questions":[
                                        {
                                            "question":"Text back a corresponding number to get their location.",
                                            "name":"choice"
                                        }
                                    ],
                                    "on_complete":{
                                        "redirect":"https://aurometalsaurus-squirrel-7226.twil.io/moreinfo"
                                    }
                                }
                            }
                        ]
                    }
                    for (i = 0, len = relevant.length; i<3 && i<len; ++i){
                        current = relevant[i];
                        responseobject.actions[1].remember.ids.push(current._id);
                        responseobject.actions[1].remember.lat.push(current.lat);
                        responseobject.actions[1].remember.long.push(current.long);
                        responseobject.actions[1].remember.name.push(current.name);

                        responseobject.actions[0].say+=('\n\n'+(i+1)+". "+current.name+'\n'+current.location+'\n'+current.duration.text);
                    }
                    //responseobject.actions[0].say+="\nText back a corresponding number to get their location!"
                    res.send(responseobject);
                });
});
router.post('/location', async(req, res) =>{
    let id = req.query.id;
    const tutor = await mongocollection.tutors();
    const relevant = await tutor.findOne({_id:id});
    let responseobject = {};
    let directionlink = "https://www.google.com/maps/dir/";
    directionlink += relevant.lat+","+relevant.long;
    responseobject = {
        "actions":[
            {
            "say": "Find " + relevant.name+" here: "+directionlink
            }
        ]
    }
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