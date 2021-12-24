const mongoose = require('mongoose');

const chatterSchema = mongoose.Schema({
  message:String,
  name:String,
  timestamp:String,
  received:String
})

module.exports = mongoose.model('messagecontents',chatterSchema)

