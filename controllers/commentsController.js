const express = require('express');
const dotenv = require('dotenv')
const router = express.Router()
const axios  = require('axios')
const authorized = require('../util/verifyToken')
const Comment = require('../model/comment');
const jwt = require('jsonwebtoken')

exports.getMovieComments = (req, res) => {
    const movieId = req.params.movieId;
const comments = Comment.find( { _id: { $all: [ [ movieId ] ] } } )
res.send(comments)
}

exports.postComment = async (req, res, next) => {
    if (req.body == null) {
      res.send("Your comment is empty!!");
    }
  const id = jwt.verify(req.header('auth-token'), process.env.SECRET_KEY).user._id
    const userName = jwt.verify(req.header('auth-token'), process.env.SECRET_KEY).user.username
    const { body, username = userName, filmsId, userId = id} = req.body;
    
    const newComment = await Comment.create({
        body,
        username,
        filmsId,
        userId  
      });
  
    console.log(newComment);
  
    res.status(201).json({
      status: 'success',
      data: newComment,
    });
  };