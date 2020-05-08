'user strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  user_name: {
    type: String, 
    require: true
  },
  name: {
    type: String, 
    require: true
  },
  last_name: {
    type: String, 
    require: true
  },
  email: {
    type: String, 
    require: true, 
    validate: {
      validator: (text) => {
        return text.indexOf('@') === 0;
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