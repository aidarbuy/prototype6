var expect = require('chai').expect;
var mongoose = require('mongoose');
var doctorModel = require('../models/Doctor');
var Promise = require('bluebird');
var doctorsData = require('../doctors-data');

function resetDoctors () {
    return new Promise(function(resolve, reject) {
        mongoose.connection.collections['doctors'].drop(resolve, reject);
    });
}

describe("get doctors", function() {
    
    var doctors;
    
    before(function(done) {
        doctorsData.connectDB('mongodb://localhost/prototype6')
            .then(resetDoctors)
            .then(doctorsData.seedDoctors)
            .then(doctorsData.findDoctors)
            .then(function(collection) {
                doctors = collection;
                done();
            });
    });
    
    it("should never be empty since our doctors are seeded", function() {
        expect(doctors.length).to.be.at.least(1);
    });
    
    it("should have a doctor with a name", function() {
        expect(doctors[0].name).to.not.be.empty;
    });

    it("should have a doctor with a description", function() {
        expect(doctors[0].description).to.not.be.empty;
    });
});