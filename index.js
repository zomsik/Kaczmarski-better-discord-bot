require('dotenv').config()
require('./deploy-commands.js');
const client = require('./client.js');

const getSongRoute = require("./routes/getPlayedSong")
const skipSongRoute = require("./routes/skipPlayedSong")


const cors = require('cors')
const express = require('express');
const app = express();

app.use(express.json())
app.use(cors())






app.use("/api/getSong", getSongRoute)
app.use("/api/skipSong", skipSongRoute)

const port = process.env.PORT

app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`))
