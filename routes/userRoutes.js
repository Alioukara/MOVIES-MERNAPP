const express = require('express');
const router = express.Router();
const authorized = require('../util/verifyToken')

router.get('/profile',authorized, (req, res) => {
    console.log(req.user)
    res.send("HELLO authorized user")

})

module.exports = router;