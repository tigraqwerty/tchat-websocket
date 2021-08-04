import WebSocket, { WebSocketServer } from 'ws';
import { v4 as uuid } from 'uuid';

import { loadFile, saveFile } from './helpers/file.helper.js';
import { staticFilename } from './constants/path-name.constant.js';

const wss = new WebSocketServer({ port: '8088' });

const logs = loadFile(staticFilename.backupMessages);
const clients = {};
const messages = JSON.parse(logs) || [];

wss.on('connection', (ws) => {
  const id = uuid();
  clients[id] = ws;
  console.info(`SERVER: client with id "${id}" added`);

  ws.send(JSON.stringify(messages));

  ws.on('message', (newMessage) => {
    let { name, message } = JSON.parse(newMessage);
    messages.push({ name, message });

    for (let clientId in clients) {
      clients[clientId].send(JSON.stringify([{ name, message }]));
    }
  });

  ws.on('close', () => {
    delete clients[id];
    console.info(`SERVER: client with "${id}" deleted`);
  });
});

process.on('SIGINT', () => {
  wss.close();
  saveFile(staticFilename.backupMessages, messages);
});
