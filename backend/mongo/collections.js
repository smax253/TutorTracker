var mongodb = require('mongodb');
async function loadUserCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://hackru:hackru2019@tutorcluster-gfcpf.mongodb.net/test?retryWrites=true&w=majority',{
            useNewUrlParser: true
        }
    );

    return client.db('tutor_list').collection('users');
}

async function loadTutorCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://hackru:hackru2019@tutorcluster-gfcpf.mongodb.net/test?retryWrites=true&w=majority',{
            useNewUrlParser: true
        }
    );

    return client.db('tutor_list').collection('tutors');
}

module.exports = {
    users:loadUserCollection,
    tutors:loadTutorCollection
};