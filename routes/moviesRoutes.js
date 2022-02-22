const express = require('express');

const router = express.Router();
const authorized = require('../util/verifyToken')
const moviesController = require('../controllers/moviesController');


router.route('/movies/:page')
  .get(moviesController.getAllmoviespages)





router.route('/movie/:id')
  .get(moviesController.getMovieById)






  module.exports = router;