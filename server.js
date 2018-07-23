var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')

var app = express();
const port = process.env.port || 8080;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/admin");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("DB connection alive");
});

var router = express.Router();
var MessagesModel = require('./MessagesModal');

app.get('/', function (req, res) {
    MessagesModel.find()
        .then((result) => {
            console.log(result);
            res.send(result);
        });
});

app.post('/', function (req, res) {
    console.log(req.body.userName);
    console.log(req.body.message);

    var msg = new MessagesModel();
    msg.name = req.body.userName;
    msg.message = req.body.message;

    msg.save(function (err) {
        if (err) {
            console.log(err);
            res.json({ message: 'New Message Created' });
        }
    })
    console.log('Post Completed');
    res.send('Post Method');
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

module.exports = app;