const express = require('express');

const Comment = require('../model/comment');
const jwt = require('jsonwebtoken')

// exports.getMovieComments = (req, res) => {
//     // const movieId = req.params.movieId;
// const comments =  Comment.find({})

// console.log(comments)
// res.status(201).send(comments);
// }

exports.getMovieComments = async (req, res) => {
   const movieId = req.params.movieId;
  const comments = await Comment.find({filmsId : movieId}).sort({ _id: -1 });
  res.send(comments).status(200)
  }

exports.postComment = async (req, res, next) => {
    if (req.body == null) {
      res.send("Your comment is empty!!");
    }
  const id = jwt.verify(req.header('auth-token'), process.env.SECRET_KEY).user._id
    const userName = jwt.verify(req.header('auth-token'), process.env.SECRET_KEY).user.username
    const { body, username = userName, filmsId, userId = id, commentTime} = req.body;
    
    const newComment = await Comment.create({
        body,
        username,
        filmsId,
        userId,
        commentTime
      });
  
    console.log(newComment);
  
    res.status(201).json({
      status: 'success',
      data: newComment,
    });
  };