'use strict';

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

//Clear old things, then add things in
Thing.find({}).remove(function() {
  Thing.create({
    name : 'HTML5 Boilerplate',
    info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
    awesomeness: 10
  }, {
    name : 'AngularJS',
    info : 'AngularJS is a toolset for building the framework most suited to your application development.',
    awesomeness: 10
  }, {
    name : 'Karma',
    info : 'Spectacular Test Runner for JavaScript.',
    awesomeness: 10
  }, {
    name : 'Express',
    info : 'Flexible and minimalist web application framework for node.js.',
    awesomeness: 10
  }, {
    name : 'MongoDB + Mongoose',
    info : 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
    awesomeness: 10
  }, function() {
      console.log('finished populating things');
    }
  );
});

// Clear old users, then add a default user
User.find({}).remove(function() {
  var count = 0;
  people.map(function(person){
    User.create({
      provider: 'local',
      name: person.name,
      email: 'test' + count + '@test.com',
      password: 'test'
    }, function(err, user) {
        Profile.find({}).remove(function() {
          Profile.create({
            name: person.name,
            quote: "I'm a pirate, just here for the booty",
            info: "Blah blah, I'm cool.",
            gender: 'm',
            dob: new Date(1970, 2, 10),
            userId: user._id,
            wantGender: 'f',
            wantAgeLow: 35,
            wantAgeHigh: 45,
            photos: person.photos,
            active: true
          }, function() {
            count++;
            if (count === people.length) {
              console.log('finished populating profiles');
            }
          });
        });
      }
    );
  });
});
