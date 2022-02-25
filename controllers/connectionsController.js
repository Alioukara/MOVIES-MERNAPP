const express = require('express');

const Connection = require('../model/connection');


exports.getAllconnections = async (req, res) => {
const connection = await Connection.find({});
res.send(connection).status(200)
}