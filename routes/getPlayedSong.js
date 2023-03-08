const router = require("express").Router()
const client = require('../client');
const readServerVariables = require("../functions/readServerVariables");


router.get("/", async (req, res) => {

    const guildID = req.query.guild;
    const areAPIActivated = readServerVariables(client,guildID,"areAPIActivated");


    if (areAPIActivated)
    {
        let queue = client.player.getQueue(guildID);

        if(queue && queue.playing)
        {
            const song = queue.current.title;
            res.status(200).send({ message: song })
        }
        else {
            res.status(200).send({ message: "No music right now" })
        }
    }
    else {
        res.status(200).send({ message: "Server api is off" })
    }

    
    //sendMessage('772230530045444137', '772230530623733792', 'I send this message via HTTP request', client);

    
})
module.exports = router