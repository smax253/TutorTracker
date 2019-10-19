// tutor function for the api
var express = require('express');
var mongodb = require('mongodb');

var router = express.Router();

// Get tutor
router.get('/', async (req, res) => {
    const tutor = await loadTutorCollection();
    res.send(await tutor.find({}).toArray());
});

// Add tutor
router.post('/', async (req, res) => {
    const tutor = await loadTutorCollection();
    await tutor.insertOne({
        text: req.body.text,
        createdAt: new Date()
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