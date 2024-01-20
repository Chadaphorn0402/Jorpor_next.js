// import http from 'http';
// import { Server } from 'socket.io';
// import cors from 'cors';

// const httpServer = http.createServer();
// console.log("88888888888888888888888888888888888888888888888888888")

// const io = new Server(httpServer, {
//   cors: {
//     origin: 'https://platform-jorpor-chada.koyeb.app',
//     methods: ['GET', 'POST'],
//     // credentials: true,
//   },
//   transports: ['websocket'],
//   path: '/socket.io',
// });




// io.on('connection', (socket) => {
//   console.log('Socket.IO connected');
// });

// io.on('error', (error) => {
//   console.error('Socket.IO Error:', error);
// });


// const PORT = 8000; 

// httpServer.listen(PORT, () => {
//   console.log(`Socket.IO server running on http://localhost:${PORT}`);
// });


// export { io };

import http from 'http';
import { Server } from 'socket.io';

const httpServer = http.createServer();
console.log("88888888888888888888888888888888888888888888888888888")

const io = new Server(httpServer, {
  // ไม่มีการกำหนดค่า CORS ในที่นี้
  transports: ['websocket'],
  path: '/socket.io',
});

io.on('connection', (socket) => {
  console.log('Socket.IO connected');
});

io.on('error', (error) => {
  console.error('Socket.IO Error:', error);
});

const PORT = 4001; 

httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on http://localhost:${PORT}`);
});

export { io };