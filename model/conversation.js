const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({

    name: {
    type: String,
   

  },

  message: {
    type: String,
  
    
  },
 

});


const ConversationModel = mongoose.model('conversation', ConversationSchema);

module.exports = ConversationModel;