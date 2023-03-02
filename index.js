require('dotenv').config()
require('./deploy-commands.js');
const client = require('./client.js');

const testRoute = require("./routes/test")

const cors = require('cors')
const express = require('express');
const app = express();
app.use(express.json())
app.use(cors())






app.use("/api/test", testRoute)

const port = process.env.PORT

app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`))
