var mongoose = require('mongoose');
var Promise = require('bluebird');
var doctorsSeed = require('./doctors-seed');

var Doctor = mongoose.model('Doctor');

var findDoctors = function(query) {
    return Promise.cast(mongoose.model('Doctor').find({}).exec());
};

exports.findDoctors = findDoctors;

exports.connectDB = Promise.promisify(mongoose.connect, mongoose);

var createDoctor = Promise.promisify(Doctor.create, Doctor);

exports.seedDoctors = function() {
    return findDoctors({}).then(function(collection) {
        if(collection.length === 0) {
            return Promise.map(doctorsSeed.doctors, function(doctor) {
                return createDoctor(doctor);
            });
        }
    });
};
