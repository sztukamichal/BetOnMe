'use strict';

var db = require('../db');
var UserSchema = db.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true, select: false},
  registerDate: {type: Date, required: true, default: Date.now},
  firstName: {type: String, required: true},
  lastName: {type: String, required: false},
  email: {type: String, required: true},
  avatar: {type: Number, required: true, default: 27},
  notifications: [
    {
      message: {type: String},
      type:  {type: String},
      creationDate:  {type: Date, default: Date.now},
      notifiedBy:  {type: db.Schema.Types.ObjectId, ref: 'User'},
      tournamentId:  {type: db.Schema.Types.ObjectId, ref: 'Tournament'},
      isRead: {type: Boolean, default: false}
    }
  ]
});

UserSchema.statics.notify = function(notification, toUser, callback) {
  User.findOne({username: toUser}, {}, function(err, user) {
    user.notifications.push(notification);
    user.save(callback);
  });
};

var User = db.model('User', UserSchema);

module.exports = User;