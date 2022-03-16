const express = require('express');
const { get } = require('express/lib/response');

const router = express.Router();

const moviesController = require('../controllers/moviesController');
const authorized = require('../util/verifyToken')

router.route('/movies/:page')

  .get(authorized, moviesController.getAllmoviespages)





router.route('/movie/:id')
  .get(authorized, moviesController.getMovieById)

router.route("/searchmovie/:title")
.get(authorized, moviesController.searchMovieByName)



  module.exports = router;