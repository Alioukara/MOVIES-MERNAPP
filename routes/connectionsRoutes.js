const express = require('express');

const router = express.Router();

const connectionsController = require('../controllers/connectionsController');

router.route('/allconnections')
  .get(connectionsController.getAllconnections)

  module.exports = router;