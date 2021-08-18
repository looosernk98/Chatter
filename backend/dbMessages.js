const mongoose = reqiuire('mongoose');

const chatterSchema = mongoose.Schema({
  message:String,
  name:String,
  timestamp:String
})

export default mongoose.model('messageContent',chatterSchema)