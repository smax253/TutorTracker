var express = require('express');
var mongodb = require('mongodb');
const mongocollection = require("../../mongo/collections");
var router = express.Router();

router.post("/", async (req, res)=>{
    const users = await mongocollection.users();
    console.log(req);
    console.log(req.body);
    await users.insertOne({
        name: req['body'].name,
        classes: req.body.classes,
        image: req.body.image,
        _id: req.body['_id']
    });
    res.status(201).send();
});

router.get('/', async (req, res) => {
    const user = await mongocollection.users();
    res.send(await user.find({}).toArray());
});

router.delete('/:id', async (req, res) =>{
    const tutor = await mongocollection.users();
    await tutor.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

module.exports = router; 