const express = require('express');
const dotenv = require('dotenv')
const router = express.Router()
const axios  = require('axios')


exports.getAllmoviespages = (req, res) => {
    const page = req.params.page;
var config = {
  method: 'get',
  url: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-FR&page=` + page,
  headers: { },
};
axios(config)
.then(function (response) {
  res.send(response.data);
})
.catch(function (error) {
  res.send(error);
});
  
}

exports.getMovieById = (req, res) => {
  const id = req.params.id;
var config = {
method: 'get',
url: `https://api.themoviedb.org/3/movie/${id},?api_key=${process.env.API_KEY}&language=en-US`,


headers: { },

};

axios(config)
.then(function (response) {
res.send(response.data);
})
.catch(function (error) {
res.send(error);
});

}