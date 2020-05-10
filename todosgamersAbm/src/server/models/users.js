'user strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  user_name: {
    type: String, 
    required: true
  },
  name: {
    type: String, 
    required: true
  },
  last_name: {
    type: String, 
    required: true
  },
  email: {
    type: String, 
    required: true, 
    validate: {
      validator: (text) => {
        return text.indexOf('@') !== -1;
      },
      message: 'Email is not valid'
    }
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('User', UserSchema);