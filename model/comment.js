const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({

  body: {
    type: String,
    required: true,

  },

  username: {
    type: String,
    required: true,
    
  },
  filmsId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
  }

});


const CommentModel = mongoose.model('comment', CommentSchema);

module.exports = CommentModel;