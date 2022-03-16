const express = require('express');

const router = express.Router();
const authorized = require('../util/verifyToken')
const commentsController = require('../controllers/commentsController');


router.route('/:movieId')
  .get(commentsController.getMovieComments)

  router.route('/newcomment')
  .post(commentsController.postComment)




  module.exports = router;