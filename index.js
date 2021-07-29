const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/'; //custom form, port#
const dbname = 'nucampsite'; //database name

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => { //later on, it wont be nec (topology) no details
 
    assert.strictEqual(err, null); //check err is not null, checking against (null)

    console.log('Connected correctly to server'); //the mongodb server

    const db = client.db(dbname);

    db.dropCollection('campsites', (err, result) => { //dropping=deleting(but not really) its a serious op and had to get back
        assert.strictEqual(err, null); //is not null and cunt on
        console.log('Dropped Collection', result); //true if succ

        const collection = db.collection('campsites');

        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"}, //inserting
        (err, result) => { //callback fun looking fami
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops); //ops=operations

            collection.find().toArray((err, docs) => { //can use filter meth to find docs, but we're doing empty array
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);
                
                client.close();
            });
        });
    });
});