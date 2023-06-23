const express = require('express');
const app = express();
const port = 19000
const bodyParser = require('body-parser')
require('dotenv').config();
const cors = require('cors');
app.use(cors());
const MongoDBClient = require('./database');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const notificationRoutes =require('./routes/notificationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use s'applique sur toutes les routes
app.use(bodyParser.json())

userRoutes(app);
authRoutes(app);
messageRoutes(app, io);
notificationRoutes(app,io);

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
  
    // userRoutes(app);
    // authRoutes(app);
    // messageRoutes(app, io);
    // notificationRoutes(app,io);
    
    socket.on('disconnect', () => {
      console.log('user disconnected'+  socket.id);
    });
  
});
  



server.listen(port, ()=>{
    console.log('connecté au port '+port)
    MongoDBClient.initialize()
})