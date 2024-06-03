const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbs = client.db('webproject');
const collection = dbs.collection('appointment');

const messcollection = dbs.collection('message');

const logincollection=dbs.collection('login');

async function connectToMongo() {
    try {
        await client.connect();
        console.log('Connected to appointment MongoDB');
        return collection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

async function connectToMongomess() {
    try {
        await client.connect();
        console.log('Connected to message MongoDB');
        return messcollection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}
async function connectToMongologin() {
    try {
        await client.connect();
        console.log('Connected to login MongoDB');
        return logincollection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}
module.exports = { connectToMongo , connectToMongomess , connectToMongologin };