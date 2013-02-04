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
    type: String,
    required: true,
    lowercase: true
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
  location: {
    type: String,
    required: true,
    lowercase: true
  },
  organization: {
    type: String,
    required: true,
    lowercase: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  remarks: {
    type: String
  },
  type: {
    type: String,
    required: true,
    enum: ['image', 'video', 'text', 'webpage'],
    default: 'image'
  },
  url: {
    type: String
  },
  asset_data: {
    type: String
  },
  status: {
    type: String,
    enum: ['submitted', 'rejected', 'online', 'offline', 'expired', 'draft'],
    default: 'submitted'
  }
});

module.exports = {
  Users: mongoose.model('Users', usersSchema),
  Organizations: mongoose.model('Organizations', organizationsSchema),
  Locations: mongoose.model('Locations', locationsSchema),
  Slides: mongoose.model('Slides', slidesSchema)
};