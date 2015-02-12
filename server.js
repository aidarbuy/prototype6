var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('*', function(req, res) {
    res.render('index');
});

console.log("Listening on port " + process.env.PORT);

app.listen(process.env.PORT, process.env.IP);