const router = require("express").Router()
const sendMessage = require('../functions/sendMessage');
const client = require('../client');


router.get("/", async (req, res) => {

    res.status(200).send({ message: "Wysłano request!" })
    sendMessage('772230530045444137', '772230530623733792', 'I send this message via HTTP request', client);

    
})
module.exports = router