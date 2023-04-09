const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { v4: uuid } = require("uuid");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5005;

app.use(cors());

let connectedUsers = [];
let rooms = [];

app.get("/api/room-exists/:roomId", (req, res) => {
  const { roomId } = req.params;
  const room = rooms.find((room) => room.id === roomId);

  if (room) {
    if (room.connectedUsers.length > 3) {
      return res.send({ roomExists: true, full: true });
    } else {
      return res.send({ roomExists: true, full: false });
    }
  } else {
    return res.send({ roomExists: false });
  }
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(
    `Connect with Socket.IO Client successfully! Socket.id: ${socket.id}`
  );

  socket.on("create-new-room", (data) => {
    createNewRoomHandler(data, socket);
  });

  socket.on("join-room", (data) => {
    joinRoomHandler(data, socket);
  });

  socket.on("disconnect", () => {
    disconnectHandler(socket);
  });

  socket.on("conn-signal", (data) => {
    signalingHandler(data, socket);
  });

  socket.on("conn-init", (data) => {
    initializeConnectionHandler(data, socket);
  });
});

const createNewRoomHandler = (data, socket) => {
  console.log("Host is creating a new room...");
  console.log(data);
  const { identity, isOnlyAudio } = data;

  const roomId = uuid();

  const newUser = {
    identity,
    id: uuid(),
    roomId,
    socketId: socket.id,
    isOnlyAudio,
  };

  connectedUsers = [...connectedUsers, newUser];

  const newRoom = {
    id: roomId,
    connectedUsers: [newUser],
  };

  socket.join(roomId);

  rooms = [...rooms, newRoom];

  socket.emit("room-id", { roomId });

  socket.emit("room-update", { connectedUsers: newRoom.connectedUsers });
};

const joinRoomHandler = (data, socket) => {
  console.log("User is joining room...");
  console.log(data);
  const { identity, roomId, isOnlyAudio } = data;

  const newUser = {
    identity,
    id: uuid(),
    roomId,
    socketId: socket.id,
    isOnlyAudio,
  };

  const room = rooms.find((room) => room.id === roomId);

  room.connectedUsers = [...room.connectedUsers, newUser];

  socket.join(roomId);

  connectedUsers = [...connectedUsers, newUser];

  // inform other users existed in the room(respondents) except initiator to prepare for WebRTC connection
  room.connectedUsers.forEach((user) => {
    if (user.socketId !== socket.id) {
      const data = {
        // initiator's socketId
        connUserSocketId: socket.id,
      };

      io.to(user.socketId).emit("conn-prepare", data);
    }
  });

  io.to(roomId).emit("room-update", { connectedUsers: room.connectedUsers });
};

const disconnectHandler = (socket) => {
  const user = connectedUsers.find((user) => user.socketId === socket.id);

  if (user) {
    const room = rooms.find((room) => room.id === user.roomId);

    room.connectedUsers = room.connectedUsers.filter(
      (user) => user.socketId !== socket.id
    );

    socket.leave(user.roomId);

    if (room.connectedUsers.length > 0) {
      // disconnect WebRTC connection
      io.to(room.id).emit("user-disconnected", { socketId: socket.id });

      io.to(room.id).emit("room-update", {
        connectedUsers: room.connectedUsers,
      });
    } else {
      rooms = rooms.filters((r) => r.id !== room.id);
    }
  }
};

const signalingHandler = (data, socket) => {
  // connUserSocketId => initiator's socketId
  // connUserSocketId => respondent's socketId
  const { signal, connUserSocketId } = data;
  // socket.id => connUserSocketId => respondent's socketId
  // socket.id => connUserSocketId => initiator's socketId
  const signalingData = { signal, connUserSocketId: socket.id };

  io.to(connUserSocketId).emit("conn-signal", signalingData);
};

const initializeConnectionHandler = (data, socket) => {
  // connUserSocketId => initiator's socketId
  const { connUserSocketId } = data;
  // connUserSocketId => respondent's socketId
  const initData = {
    connUserSocketId: socket.id,
  };

  io.to(connUserSocketId).emit("conn-init", initData);
};

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
