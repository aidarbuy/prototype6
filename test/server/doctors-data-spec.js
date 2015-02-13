var expect = require('chai').expect;
var mongoose = require('mongoose');
var doctorModel = require('../../models/Doctor');
var Promise = require('bluebird');
var doctorsData = require('../../doctors-data');

function resetDoctors () {
    return new Promise(function(resolve, reject) {
        mongoose.connection.collections['doctors'].drop(resolve, reject);
    });
}

describe("db get doctors", function() {
    
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
    
    after(function() {
        mongoose.connection.close();
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

describe("db save doctors", function() {
    
    var doctor = {name:"Dbsave Doctor", description:"db saving doctor"};
    var doctors;
    
    function saveTestDoctor() {
        return doctorsData.saveDoctor(doctor);
    }
    
    before(function(done) {
        doctorsData.connectDB('mongodb://localhost/prototype6')
            .then(resetDoctors)
            .then(function() { return doctorsData.saveDoctor(doctor) })
            .then(doctorsData.findDoctors)
            .then(function setDoctors(collection) {
                doctors = collection;
                done();
            });
    });
    
    after(function() {
        mongoose.connection.close();
    });
    
    it("should never be empty since our doctors are seeded", function() {
        expect(doctors).to.have.length(1);
    });
    
});