import cors from 'cors';
import express from 'express';
import getSongRoute from './routes/getPlayedSong';
import getServerName from './routes/getServerName';
import skipSongRoute from './routes/skipPlayedSong';
import changeVolumeRoute from './routes/changeVolume';

export default function initApi() {
    const app = express();

    app.use(express.json());
    app.use(cors());
    
    app.use('/api/getSong', getSongRoute);
    app.use('/api/getServerName', getServerName);
    app.use('/api/skipSong', skipSongRoute);
    app.use('/api/changeVolume', changeVolumeRoute);

    return app;
}