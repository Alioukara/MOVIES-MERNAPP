const Conversation = require('../model/conversation');
const Connection = require('../model/connection');
const express = require('express');
const app = express()
const server = require('http').Server(app)
module.exports = SocketIO = () => {
const io = require("socket.io")(server, {
    cors: {
    origin: ["http://localhost:3000",   /*"https://messageschat.herokuapp.com"*/]
    }
  })
  
  io.on('connection',  socket => {
    const id = socket.handshake.query.id
  console.log("connected")
   //get the number of connection way1 (ps: socket io provid a better way to get numver of connected client)
    // const newConnection = new Connection({ id})
    // newConnection.save()
    socket.emit("me", socket.id)
   
  
    socket.join(id)
    socket.emit("me", socket.id)
  
      socket.on("disconnect", () => {
          socket.broadcast.emit("callEnded")
      })
  
      socket.on("callUser", (data) => {
          io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
      })
  
      socket.on("answerCall", (data) => {
          io.to(data.to).emit("callAccepted", data.signal)
      })
  
  
  
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


}

