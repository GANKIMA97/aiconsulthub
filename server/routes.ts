import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer } from "ws";
import { WebSocket } from "ws";
import { db } from "@db";

interface ChatMessage {
  type: 'message' | 'system';
  content: string;
  sender?: string;
  timestamp: number;
  id?: string;
}

export function registerRoutes(app: Express): Server {
  // API routes will be added here

  const httpServer = createServer(app);

  // Create WebSocket server with more robust configuration
  const wss = new WebSocketServer({ 
    noServer: true,
    clientTracking: true
  });

  // Handle upgrade requests separately
  httpServer.on('upgrade', (request, socket, head) => {
    const pathname = new URL(request.url!, `http://${request.headers.host}`).pathname;
    
    if (pathname === '/ws/chat') {
      const protocol = request.headers['sec-websocket-protocol'];
      
      // Explicitly reject vite-hmr connections
      if (protocol === 'vite-hmr') {
        socket.write('HTTP/1.1 400 Bad Request\r\n\r\n');
        socket.destroy();
        return;
      }

      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      // Reject non-chat WebSocket connections
      socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
      socket.destroy();
    }
  });

  // Store active chat clients separately from vite-hmr connections
  const chatClients = new Set<WebSocket>();

  wss.on('connection', (ws, req) => {
    const protocol = req.headers['sec-websocket-protocol'];
    
    // Immediately close vite-hmr connections
    if (protocol === 'vite-hmr') {
      ws.close();
      return;
    }

    // Only handle chat protocol connections
    if (!protocol || protocol === 'chat') {
      chatClients.add(ws);

      // Send welcome message
      const welcomeMessage: ChatMessage = {
        type: 'system',
        content: 'Welcome to AIConsult Hub! How can we help you today?',
        timestamp: Date.now()
      };
      
      try {
        ws.send(JSON.stringify(welcomeMessage));
      } catch (error) {
        console.error('Error sending welcome message:', error);
      }

      ws.on('message', (data) => {
        try {
          const message: ChatMessage = JSON.parse(data.toString());
          
          // Broadcast message to all other connected chat clients (not the sender)
          chatClients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              try {
                client.send(JSON.stringify(message));
              } catch (err) {
                console.error('Error broadcasting message:', err);
              }
            }
          });
        } catch (error) {
          console.error('Error processing message:', error);
        }
      });

      ws.on('close', () => {
        chatClients.delete(ws);
      });

      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        chatClients.delete(ws);
        try {
          ws.close();
        } catch (err) {
          console.error('Error closing errored connection:', err);
        }
      });
    }
  });

  // Periodic cleanup of dead connections
  setInterval(() => {
    chatClients.forEach(client => {
      if (client.readyState === 3 || client.readyState === 2) { // 3 = CLOSED, 2 = CLOSING
        chatClients.delete(client);
      }
    });
  }, 30000); // Clean up every 30 seconds

  return httpServer;
}