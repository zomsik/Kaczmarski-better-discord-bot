import dotenv from 'dotenv';
dotenv.config();

import { createServer } from "http";
import app from './initApi';
import initWebSocket from './initWebSocket';
import KaczmarskiClient from './KaczmarskiClient';
import deployCommands from './deployCommands';

const client = KaczmarskiClient.Instance;
client.login(process.env.TOKEN);

const httpServer = createServer(app);
const webSocketServer = initWebSocket(httpServer)

const port = process.env.PORT;
httpServer.listen(port!, () => console.log(`Nasłuchiwanie na porcie ${port}`));

deployCommands(client);
export { webSocketServer };