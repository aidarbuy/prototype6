var express = require('express');
var mongoose = require('mongoose');
var doctorModel = require('./models/Doctor');

var app = express();

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/api/doctors', function(req, res) {
    mongoose.model('Doctor').find({}).exec(function(error, collection) {
        res.send(collection);
    });
});

app.get('*', function(req, res) {
    res.render('index');
});

// mongoose.connect('mongodb://localhost/prototype6');
mongoose.connect('mongodb://dbuser:dbpassword@ds045001.mongolab.com:45001/prototype6');

var con = mongoose.connection;
con.once('open', function() {
    console.log("Connected to localhost MongoDB successfully!");
    doctorModel.seedDoctors();
});

console.log("Listening on port " + process.env.PORT);

app.listen(process.env.PORT, process.env.IP);