'use strict';

var mongoose = require('mongoose'),
	ObjectId = mongoose.Schema.Types.ObjectId,
    Schema = mongoose.Schema;

var PhotoSchema = require('./photo').PhotoSchema;

// Character limits
var QuoteLength = 144;
var InfoLength = 5000;
    
/**
 * Profile Schema
 */
var ProfileSchema = new Schema({
  name: String,
  quote: String,
  info: String,
  gender: String,
  dob: Date,
  userId: ObjectId,
  wantGender: String,
  wantAgeLow: Number,
  wantAgeHigh: Number,
  photos: [ PhotoSchema ],
  active: { type: Boolean, default: false }
});

/**
 * Validations
 */
ProfileSchema.path('quote').validate(function (quote) {
  return quote.length <= QuoteLength;
}, 'Quote must be less than ' + QuoteLength + ' characters');

ProfileSchema.path('info').validate(function (info) {
  return info.length <= InfoLength;
}, 'Info must be less than ' + InfoLength + ' characters');

mongoose.model('Profile', ProfileSchema);