


const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt')
const {registerValidation, loginValidation} = require('../util/validation')
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());


const createSendTokenLogin = (user, statusCode, res) => {
 
 //create and assign a token
const body = { _id: user._id, email: user.email, username: user.name };
const token = jwt.sign({user: body}, process.env.SECRET_KEY)
  // const cookieOptions = {
  //         expires: new Date((Date.now() + process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000) ,
  //         httpOnly: false
  // }
  user.password = undefined;

  res.cookie('jwt', user);
  res.send(user)
 
  

 }

router.post('/register', async (req, res) => {

    //validate data 
const {error} = registerValidation(req.body)
if(error) return res.status(400).send(error.details[0].message)
   
// Checking if the user is already in the db
let emailtest = req.body.email
const emailExist = await User.findOne({emailtest})
if(emailExist) return res.status(400).send('Email already used')
//createa nex User
const hashedpassword = await bcrypt.hash(req.body.password, 10)

const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedpassword,
    })
    try {
     
      const newUser = await user.save()
  
      res.status(201).json({userID: user._id})
    } catch (err) {
      res.status(400).json({ message: err.message })
  
    }
  })

//LOGIN
router.post('/login', async (req, res) => {
        //validate data 
const {error} = loginValidation(req.body)
if(error) return res.status(400).send(error.details[0].message)
// Checking if the email exists

const user = await User.findOne({email: req.body.email})
if(!user) return res.status(400).send('Email or password is wrong')   
//password is correct
const validPassword = await bcrypt.compare(req.body.password, user.password)
if(!validPassword) return res.status(400).send('Email or password is wrond')

createSendTokenLogin(user, 200, res)
})




module.exports = router;
