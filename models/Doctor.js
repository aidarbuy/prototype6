var mongoose = require('mongoose');

var doctorSchema = mongoose.Schema({
    name: String,
    description: String
});

var Doctor = mongoose.model('Doctor', doctorSchema);

exports.seedDoctors = function() {
    Doctor.find({}).exec(function(error, collection) {
        if(collection.length === 0) {
            Doctor.create({name:"Doctor 1", description:"Description 1"});
            Doctor.create({name:"Doctor 2", description:"Description 2"});
            Doctor.create({name:"Doctor 3", description:"Description 3"});
            Doctor.create({name:"Doctor 4", description:"Description 4"});
            Doctor.create({name:"Doctor 5", description:"Description 5"});
            Doctor.create({name:"Doctor 6", description:"Description 6"});
            Doctor.create({name:"Doctor 7", description:"Description 7"});
        }
    });
};