const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({

    name: {
    type: String,
   

  },

  message: {
    type: String,
  
    
  },

  userId: {
    type: String,
  
  },

  messageTime: {
    type: String,
  },

  url: {
    type: String,
  }
 

});


const ConversationModel = mongoose.model('conversation', ConversationSchema);

module.exports = ConversationModel;