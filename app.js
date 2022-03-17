const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const app = express()
const compression = require('compression');
const server = require('http').Server(app)
const Conversation = require('./model/conversation');
const Connection = require('./model/connection');
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require('jsonwebtoken')
/// for media
const { Navigator } = require("node-navigator");
const navigator = new Navigator();
///

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

app.use(compression());

const io = require("socket.io")(server, {
  cors: {
  origin: ["http://localhost:3000",   "https://weloveallmovies.herokuapp.com/"]
  }
})

io.on('connection',  socket => {
  const id = socket.handshake.query.id
  
 //get the number of connection way1 (ps: socket io provid a better way to get numver of connected client)
  // const newConnection = new Connection({ id})
  // newConnection.save()
 
 
 socket.on('message', async  ({ name, message, userId }) => {
  
   io.emit('message', {name, message, userId})
   const messageTime =   `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} ${new Date().getHours() + ":" + new Date().getMinutes()}`

   //save messages in db
   const conversation = await new Conversation({ name, message, userId, messageTime})

 conversation.save()
 })

  //get the number of connection way2
socket.on("connections-counter", (callback) => {
  
    const count = io.of("/").sockets.size 
  callback(count)
  })
  socket.on('audio',  async ({name, message, userId, recorderData}) => {
    const url = recorderData.audioDetails.url

    console.log("message sent")
    
      // can choose to broadcast it to whoever you want
       io.emit('audio', {name, message, userId, url})

 socket.on("disconnect", () => {
   try {

     const disconnectedUser = socket.handshake.query.id
  
     db.collection("connections").deleteMany({ id: disconnectedUser })
   
   }
   catch(err){
    console.log(err)
   }
});




    //save messages in db but we can't retreive the audio here because we have to stock the file in a cloud for exemple */}
    const messageTime =   `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} ${new Date().getHours() + ":" + new Date().getMinutes()}`
    const conversation = await new Conversation({ name, message, userId, messageTime, url})
    

    conversation.save()
  
});

})






























//Cors middleware
app.use(cors({ credentials: true, origin: "https://weloveallmovies.herokuapp.com" }));

//import Routes
const authRoute =  require('./routes/auth')
const userRoutes =  require('./routes/userRoutes')
const movieRoutes = require('./routes/moviesRoutes')
const commentRoutes = require('./routes/commentsRoutes')
const conversationRoutes = require('./routes/conversationRoutes');
const connectionsRoutes = require('./routes/connectionsRoutes');

//Route Middlecares
app.use('/api', authRoute)
app.use('/api/user', userRoutes)

app.use('/', movieRoutes)
app.use('/comments', commentRoutes)
app.use('/conversations', conversationRoutes)
app.use('/connections', connectionsRoutes)

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log('Server started: Port:',PORT)
  });