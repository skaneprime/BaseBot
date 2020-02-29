const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/:collection', async (req, res) => {
    let collection = await loadCollection(req.params.collection);
    res.setHeader('Content-Type', 'application/json', 'charset=utf-8');
    res.send(await collection.find({}).toArray());
});

router.post('/:collection', async (req, res) => {
    let collection = await loadCollection(req.params.collection);
    // console.log(req.body);
    if (!req.body.createdAt)
        req.body.createdAt = new Date();
    await collection.insertOne(req.body);
    res.status(201).send();
});

router.delete('/:collection/:id', async(req, res) => {
    console.log(req.params)
    const collection = await loadCollection(req.params.collection);
    await collection.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});

router.get('/', async (req, res) => {
    let collections = await loadCollection();
    // console.log(await collections);
    res.setHeader('Content-Type', 'application/json', 'charset=utf-8');
    res.send(await collections.toArray());
});

async function loadCollection(collectionName) {
    const client = await mongodb.MongoClient.connect('mongodb://localhost/basebot', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    if(collectionName)
        return client.db('basebot').collection(collectionName)
    else return client.db('basebot').listCollections();
};

module.exports = router;