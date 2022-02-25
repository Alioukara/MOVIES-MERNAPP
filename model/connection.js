const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConnectionSchema = new Schema({

    id: {
    type: String,
  },

 

});


const connectionModel = mongoose.model('connection', ConnectionSchema);

module.exports = connectionModel;