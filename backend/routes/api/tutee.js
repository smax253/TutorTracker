// tutee function for the api
var express = require('express');
var mongodb = require('mongodb');

var router = express.Router();

// Get tutee
router.get('/', async (req, res) => {
    const tutee = await loadTuteeCollection();
    res.send(await tutee.find({}).toArray());
})

// Add tutee
router.post('/', async (req, res) => {
    const tutee = await loadTuteeCollection();
    await tutee.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})
// Delete tutee
router.delete('/:id', async (req, res) =>{
    const tutee = await loadTuteeCollection();
    await tutee.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadTuteeCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://hackru:hackru2019@tutorcluster-gfcpf.mongodb.net/test?retryWrites=true&w=majority',{
            useNewUrlParser: true
        }
    );

    return client.db('tutee_list').collection('tutees');
}

module.exports = router;