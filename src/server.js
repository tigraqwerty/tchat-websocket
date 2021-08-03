import WebSocket, { WebSocketServer } from 'ws';
import {v4 as uuid} from 'uuid';
import { writeFile  } from 'fs';

const wss = new WebSocketServer({port: '8088'});

const clients = {};
const messages = []

wss.on('connection', (ws) => {
	const id = uuid(); 
	clients[id] = ws;
	console.info(`SERVER: client with id "${id}" added`);

	ws.send(JSON.stringify(messages))

	ws.on('message', (newMessage) => {
		let {name, message} = JSON.parse(newMessage);
		messages.push({name, message})

		for(let clientId in clients) {
		clients[clientId].send(JSON.stringify([{name, message}]))
		}
	});

	ws.on('close', () => {
		delete clients[id];
		console.info(`SERVER: client with "${id}" deleted`)
	});
});

process.on('SIGINT', () => {
	wss.close();
	writeFile('./logs/log.json', JSON.stringify(messages), err => {
		if(err) {
			console.log(err)
		}
		process.exit()
	})
	
})