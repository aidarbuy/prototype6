var express = require('express');
var doctorModel = require('./models/Doctor');
var doctorsData = require('./doctors-data');

var app = express();

require('./doctors-service')(doctorsData, app);

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.render('index');
});

doctorsData.connectDB('mongodb://dbuser:dbpassword@ds045001.mongolab.com:45001/prototype6')
    .then(function() {
        console.log("Connected to localhost MongoDB successfully!");
        doctorsData.seedDoctors();
});

console.log("Listening on port " + process.env.PORT);

app.listen(process.env.PORT, process.env.IP);