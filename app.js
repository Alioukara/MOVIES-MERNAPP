const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const app = express()
const server = require('http').Server(app)
const Conversation = require('./model/conversation');
const cookieParser = require("cookie-parser");


//eg: to be able to read req.body 
app.use(express.json())
const cors = require('cors');
dotenv.config();
app.use(cookieParser());
//DB CONNECTION 
mongoose.connect(process.env.DB_CONNECT)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('DB Connected'))

const io = require("socket.io")(server, {
  cors: {
  origin: ["http://localhost:3000",   /*"https://messageschat.herokuapp.com"*/]
  }
})
io.on('connection',  socket => {
 socket.on('message', async  ({ name, message }) => {
 
   io.emit('message', {name, message})
   const conversation = await new Conversation({ name, message })
  
 conversation.save()
 console.log("conversation",conversation)
 })

})


//Cors middleware
app.use(cors({ credentials: true, origin: process.env.URL_ORIGIN }));

//import Routes
const authRoute =  require('./routes/auth')
const userRoutes =  require('./routes/userRoutes')
const movieRoutes = require('./routes/moviesRoutes')
const commentRoutes = require('./routes/commentsRoutes')

//Route Middlecares
app.use('/api', authRoute)
app.use('/api/user', userRoutes)

app.use('/', movieRoutes)
app.use('/comments', commentRoutes)


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log('Server started: Port:',PORT)
  });