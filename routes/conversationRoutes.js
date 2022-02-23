const express = require('express');

const router = express.Router();
const authorized = require('../util/verifyToken')
const conversationController = require('../controllers/conversationController');

router.route('/allmessages')
  .get(conversationController.getAllconversations)

  module.exports = router;