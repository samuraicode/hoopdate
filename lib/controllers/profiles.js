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

exports.show = function (req, res, next) {
  var profileId = req.params.id;

  Profile.findById(profileId, function (err, profile) {
    if (err) return next(err);
    if (!profile) return res.send(404);

    res.json(profile);
  });
};

exports.list = function (req, res, next) {
  Profile.find({}).limit(8).exec(function (err, profiles) {
    if (err) return next(err);
    if (!profiles) return res.send(404);

    res.json(profiles);
  });
};