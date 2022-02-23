const express = require('express');

const Conversation = require('../model/conversation');


exports.getAllconversations = async (req, res) => {
const conversation = await Conversation.find({});
res.send(conversation).status(200)
}