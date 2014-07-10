'use strict';

var async = require('async');

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Profile = mongoose.model('Profile'),
  Photo = mongoose.model('Photo'),
  Thing = mongoose.model('Thing');

var fs = require('fs');
var file = __dirname + '/people.json';

var people = null;
 
fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
  people = JSON.parse(data);
});

/**
 * Populate database with sample application data
 */

console.log('Populating profiles...');
// Clear old users, then add a default user
var users = [];
var profiles = [];

User.find({}).remove(function() {
  async.each(people, function(person, callback) {
    var newUser = new User();
    newUser.provider = 'local';
    newUser.name = person.name;
    newUser.email = 'test@test.com';
    newUser.password = 'test';
    users.push(newUser);
    var birthParts = ['1973','10','2'];
    if (person.birthday && person.birthday.length > 0)
      birthParts = person.birthday.split('-');
    var profile = new Profile();
    profile.name = person.name;
    profile.quote = "I'm a pirate, just here for the booty";
    profile.info = person.biography;
    profile.gender = 'm';
    profile.dob = new Date(parseInt(birthParts[0]),parseInt(birthParts[1]),parseInt(birthParts[2]));
    profile.userId = newUser._id;
    profile.wantGender = 'f';
    profile.wantAgeLow = 35;
    profile.wantAgeHigh = 45;
    profile.photos = person.photos;
    profile.active = true;
    profiles.push(profile);
    callback();
  }, function(err) {
    if (err) console.error(err);
    else User.create(users, function(err) {
      Profile.find({}).remove(function() {
        Profile.create(profiles, function(err) {
            console.log('...finished populating profiles');
          });
        });
    });
  });
});
