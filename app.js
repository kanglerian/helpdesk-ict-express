const express = require('express');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const { Chat } = require('./models');
const { Server } = require('socket.io');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/rooms');
const chatsRouter = require('./routes/chats');

const allowedOriginSocket = [
  'http://localhost',
  'http://127.0.0.1:5173',
  'http://localhost:5173',
];

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOriginSocket,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
  }
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);
app.use('/chats', chatsRouter);

io.on('connection', (socket) => {
  console.log('client connected');

  socket.on("message", async (response) => {
    if (!response.not_save) {
      try {
        const data = await Chat.create({
          client: response.client,
          name_room: response.name_room,
          token: response.token,
          not_save: response.not_save,
          uuid_sender: response.uuid_sender,
          name_sender: response.name_sender,
          role_sender: response.role_sender,
          message: response.message,
          reply: response.reply,
          date: response.date,
          latitude: response.latitude,
          longitude: response.longitude,
        });
        io.emit('message', data)
      } catch (err) {
        console.log(err.message);
      }
    } else {
      const data = {
        client: response.client,
        name_room: response.name_room,
        token: response.token,
        not_save: response.not_save,
        uuid_sender: response.uuid_sender,
        name_sender: response.name_sender,
        role_sender: response.role_sender,
        message: response.message,
        reply: response.reply,
        date: response.date,
        latitude: response.latitude,
        longitude: response.longitude,
      };
      io.emit('message', data)
    }
  });
});

module.exports = { app, server };
