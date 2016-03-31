var MongoClient = require('mongodb').MongoClient,
    test = require('assert');
// Connection url
var url = 'mongodb://localhost:27017/duliengine';
// Connect using MongoClient
MongoClient.connect(url, function(err, db) {
    // Use the admin database for the operation
    // var adminDb = db.admin();
    // // List all the available databases
    // adminDb.listDatabases(function(err, dbs) {
    //   test.equal(null, err);
    //   test.ok(dbs.databases.length > 0);
    //   console.log(dbs)
    //   db.close();
    // });

    // var db_engine = db.db("duliengine");
    // console.log(db_engine.listCollections)
    db.collections(function(err, collections) {
        test.equal(null, err);
        test.ok(collections.length > 0);
        for (var i = 0; i < collections.length; i++) {
            console.log(collections[i].s.name);
        }
        db.close();
    });
});