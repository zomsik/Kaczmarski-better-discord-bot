const router = require("express").Router()
const sendMessage = require('../functions/sendMessage');
const client = require('../client');
const readServerVariables = require("../functions/readServerVariables");
const { useQueue } = require("discord-player");

router.get("/", async (req, res) => {

    const guildID = req.query.guild;
    const areAPIActivated = readServerVariables(client,guildID,"areAPIActivated");

    if (areAPIActivated)
    {
        const apiPassword = readServerVariables(client,guildID,"apiPassword");

        if(req.query.apiPassword == apiPassword || req.query.apipassword == apiPassword || apiPassword == null)
        {

            let queue = useQueue(guildID);

            if(queue && queue.node.isPlaying())
            {
                    
                const skipped = queue.node.skip();
                if (skipped)
                {
                    sendMessage(guildID,req.query.channel,"Skipped song with API!",client);
                    res.status(200).send({ message: "Skipped" })
                }
                else {
                    res.status(200).send({ message: "Problem occured" })
                }
            }
            else {
                res.status(200).send({ message: "No music to skip" })
            }

        }
        else {
            res.status(200).send({ message: "No access" })
        }

    }
    else {
        res.status(200).send({ message: "Server api is off" })
    }

    
    

    
})
module.exports = router