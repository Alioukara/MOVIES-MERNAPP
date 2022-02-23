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
  const id = socket.handshake.query.id
 
  socket.join(id)
 
 socket.on('message', async  ({ name, message, userId }) => {
  
   io.emit('message', {name, message, userId})
   const messageTime =   `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} <${new Date().getHours() + ":" + new Date().getMinutes()}>`
   const conversation = await new Conversation({ name, message, userId, messageTime})

  
  
 conversation.save()


 })

})


//Cors middleware
app.use(cors({ credentials: true, origin: process.env.URL_ORIGIN }));

//import Routes
const authRoute =  require('./routes/auth')
const userRoutes =  require('./routes/userRoutes')
const movieRoutes = require('./routes/moviesRoutes')
const commentRoutes = require('./routes/commentsRoutes')
const conversationRoutes = require('./routes/conversationRoutes')

//Route Middlecares
app.use('/api', authRoute)
app.use('/api/user', userRoutes)

app.use('/', movieRoutes)
app.use('/comments', commentRoutes)
app.use('/conversations', conversationRoutes)


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log('Server started: Port:',PORT)
  });