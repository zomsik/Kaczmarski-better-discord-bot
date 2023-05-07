import dotenv from 'dotenv';
dotenv.config();

import { createServer } from "http";
import { Server } from "socket.io";
import initWebSocket from './initWebSocket';
import KaczmarskiClient from './KaczmarskiClient';
import deployCommands from './deployCommands';
import getSongRoute from './routes/getPlayedSong';
import getServerName from './routes/getServerName';
import skipSongRoute from './routes/skipPlayedSong';
import changeVolumeRoute from './routes/changeVolume';
import cors from 'cors';
import express from 'express';

const client = KaczmarskiClient.Instance;
client.login(process.env.TOKEN);

const app = express();
const httpServer = createServer(app);
const webSocketServer = initWebSocket(httpServer)


app.use(express.json());
app.use(cors());

app.use('/api/getSong', getSongRoute);
app.use('/api/getServerName', getServerName);
app.use('/api/skipSong', skipSongRoute);
app.use('/api/changeVolume', changeVolumeRoute);

const port = process.env.PORT;

httpServer.listen(port!, () => console.log(`Nasłuchiwanie na porcie ${port}`));

deployCommands(client);