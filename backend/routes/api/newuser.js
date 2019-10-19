var express = require('express');
var mongodb = require('mongodb');

var router = express.Router();

router.post("/", async (res, req)=>{
    const users = loadUserCollection();
    await users.insertOne({
        name:req.body.name,
        classes: req.body.classes,
        image: req.body.image,
        firebaseid: req.body.firebaseid
    })
});



async function loadUserCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://hackru:hackru2019@tutorcluster-gfcpf.mongodb.net/test?retryWrites=true&w=majority',{
            useNewUrlParser: true
        }
    );

    return client.db('tutor_list').collection('users');
}

module.exports = router; 