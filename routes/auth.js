


const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt')
const {registerValidation, loginValidation} = require('../util/validation')
const jwt = require('jsonwebtoken')


const app = express();

const protect = async (req, res, next) => {
  //1) Get token and check if token it's there

  if (!req.cookies.accesstoken) {
    return next(new AppError('You are not logged in', 600));
  }
  const { accesstoken } = req.cookies;
  //2) Check if accesstoken has experied before decoded

  //2) Verification of accesstoken & validation of token
  const decoded = await promisify(accesstoken.verify)(accesstoken, process.env.JWT_SECRET);
  //3) Check if user exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError(
        'The token belonging to this user does no longer exists',
        401
      )
    );
  }

  //GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;

  next();
};


const createSendTokenLogin = (user, statusCode, res) => {
 
 //create and assign a token
const body = { _id: user._id, email: user.email, username: user.name };
const token = jwt.sign({user: body}, process.env.SECRET_KEY)
  const cookieOptions = {
          expires: new Date((Date.now() + process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000) ,
          httpOnly: false
  }
  user.password = undefined;

  res.cookie('accesstoken', token, cookieOptions);
  res.cookie('userID', user._id.valueOf(), cookieOptions)
  res.cookie('username', user.name, cookieOptions)
 
  res.send(user)
}

router.post('/register', async (req, res) => {

    //validate data 
const {error} = registerValidation(req.body)
if(error) return res.status(400).send(error.details[0].message)
   
// Checking if the user is already in the db
let emailtest = req.body.email
const emailExist = await User.findOne({email: emailtest})

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




module.exports = router, protect;
