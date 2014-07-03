'use strict';

var mongoose = require('mongoose'),
  ObjectId = mongoose.Schema.Types.ObjectId,
    Schema = mongoose.Schema;

// Character limits
var CaptionLength = 144;
    
/**
 * Photo Schema
 */
var PhotoSchema = new Schema({
  url: String,
  caption: String,
  taken: Date
});

/**
 * Validations
 */
PhotoSchema.path('caption').validate(function (caption) {
  return caption.length <= CaptionLength;
}, 'Caption must be less than ' + CaptionLength + ' characters');

mongoose.model('Photo', PhotoSchema);

exports.PhotoSchema = PhotoSchema;