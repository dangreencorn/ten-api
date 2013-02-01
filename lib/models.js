var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

var organizationsSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  }
});

var locationsSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  organization: {
    type: mongoose.Schema.ObjectId,
    ref: 'Organizations'
  },
  access_mode: {
    type: String,
    enum: ['organization', 'invite']
  },
  status: {
    type: String,
    enum: ['online', 'warning', 'offline'],
    default: 'warning'
  }
});

var slidesSchema = mongoose.Schema({

});

module.exports = {
  Users: mongoose.model('Users', usersSchema),
  Organizations: mongoose.model('Organizations', organizationsSchema),
  Locations: mongoose.model('Locations', locationsSchema),
  Slides: mongoose.model('Slides', slidesSchema)
};