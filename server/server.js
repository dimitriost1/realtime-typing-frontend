import { WebSocketServer } from 'ws';
import http from 'http';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library for unique client IDs

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.id = uuidv4(); // Assign a unique ID to each client
  console.log(`New client connected: ${ws.id}`);

  ws.on('message', (data) => {
    const message = JSON.parse(data.toString());
    console.log(`Message received from ${message.senderId}: ${message.text}`);
    // Broadcast the message to all connected clients except the sender
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === client.OPEN) {
        client.send(JSON.stringify({ senderId: message.senderId, text: message.text }));
      }
    });
  });

  ws.on('close', () => {
    console.log(`Client disconnected: ${ws.id}`);
  });
});

server.listen(8081, '0.0.0.0', () => {
  console.log('WebSocket server running on port 8081');
});

