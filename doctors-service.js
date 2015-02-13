var bodyParser = require('body-parser');

module.exports = function(db, app) {
    app.use(bodyParser.json());
    
    app.get('/api/doctors', function(req, res) {
        db.findDoctors().then(function(collection) {
            res.send(collection);
        })
    });
    
    app.post('/api/doctors', function(req, res) {
        db.saveDoctor(req.body);
        res.end();
    })
};
