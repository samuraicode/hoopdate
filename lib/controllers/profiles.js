'use strict';

var mongoose = require('mongoose'),
    Profile = mongoose.model('Profile');

/**
 *  Get user's profile
 */
exports.me = function (req, res, next) {
  var userId = req.user._id;

  Profile.findOne({userId:userId}, function (err, profile) {
    if (err) return next(err);
    if (!profile) return res.send(404);

    res.json(profile);
  });
};