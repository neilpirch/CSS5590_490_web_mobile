/**
 * Created by karthik on 7/14/17.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();

var url='mongodb://dbUser:R893$9o\'aei3VAVhfg@ds119323.mlab.com:19323/aplwebdemo';//1.Modify this url with the credentials of your db name and password.
var ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/create', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
});

app.get('/get', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        db.collection('books').find().toArray(function(err, result){
            if(err)
            {
                res.write("get Failed");
                res.end();
            }else
            {

                res.send(JSON.stringify(result));
            }
            console.log("Got All Documents");

        });
    });

});

app.get('/delete/:toBeDeleted_id', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        var delQuery = {"_id" : ObjectID(req.params.toBeDeleted_id)};
        db.collection('books').deleteOne(delQuery,function(err, obj) {
            if (err) {
                res.write("Delete Failed");
                res.end();
            }else {
                console.log("1 document deleted");
                res.end();
            }
        });



    });
});


app.get('/update/:toBeUpdated_id', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        var objID = {"_id": ObjectID(req.params.toBeUpdated_id)};
        var item = req.query;
        var updateQuery = {"ISBN": item.ISBN,"authorName":item.authorName,"bookName":item.bookName};
        db.collection('books').updateOne(objID,updateQuery,function(err, obj) {
            if (err) {
                res.write("Update Failed");
                res.end();
            }else {
                console.log("1 document updated");
                res.end();
            }
        });
        //console.log(req.params.toBeUpdated_id);
        //console.log(req.params);
        //console.log(req);
    });

});


var insertDocument = function(db, data, callback) {
    db.collection('books').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the books collection.");
        callback();
    });
};

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});