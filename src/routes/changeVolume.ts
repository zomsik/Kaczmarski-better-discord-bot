import { useQueue } from 'discord-player';
import { Router, Request, Response } from 'express';
import readServerVariables from '../functions/readServerVariables';
import sendMessage from '../functions/sendMessage';
import KaczmarskiClient from '../KaczmarskiClient';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const guildID = req.query.guild as string;
    const channelID = req.query.channel as string;

    const areAPIActivated: boolean | string = readServerVariables(guildID,"areAPIActivated");

    if (areAPIActivated) {
        const apiPassword: boolean | string = readServerVariables(guildID, "apiPassword");
    
        if (req.query.apiPassword == apiPassword || req.query.apipassword == apiPassword || !apiPassword) {
            let queue = useQueue(guildID);

    
            if (queue) {
                const volume: number = Number(req.query.volume as string);
                const operation = req.query.operation as string;
                const previousVolume: number = queue.node.volume; 
                const client = KaczmarskiClient.Instance;

                if (isNaN(volume)) {
                    res.status(200).send({ message: "Volume is not a number" });
                    return;
                }

        
                if (volume > 100 || volume < 0)
                {
                    res.status(200).send({ message: "Volume level must be a number between 0-100" });
                    return;
                }
                else
                {

                    switch (operation)
                    {

                        case "add": {
                            if (volume+previousVolume >= 100) {
                                queue.node.setVolume(100);
                            } else {
                                queue.node.setVolume(previousVolume+volume);
                            }

                            res.status(200).send({ message: `Volume level set to ${queue.node.volume}` });
                            if (channelID)
                                sendMessage(guildID, channelID, `Volume changed with API to ${queue.node.volume}!`, client);
                            break;
                        }                     
                        case "sub": {
                            if (previousVolume-volume <= 0) {
                                queue.node.setVolume(0);
                            } else {
                                queue.node.setVolume(previousVolume-volume);
                            }

                            res.status(200).send({ message: `Volume level set to ${queue.node.volume}` });
                            if (channelID)
                                sendMessage(guildID, channelID, `Volume changed with API to ${queue.node.volume}!`, client);
                            break;
                        } 
                        case "set": {
                            queue.node.setVolume(volume);
                            res.status(200).send({ message: `Volume level set to ${queue.node.volume}` });
                            if (channelID)
                                sendMessage(guildID, channelID, `Volume changed with API to ${queue.node.volume}!`, client);
                            break;
                        }
                        default: {
                            res.status(200).send({ message: `Undefined volume change operation` });
                            break;
                        }
                    }

                }
            }
            else {
                res.status(200).send({ message: "Could not set volume" });
            }

        } else {
          res.status(200).send({ message: "No access" });
        }
      } else {
        res.status(200).send({ message: "Server api is off" });
      }

});

export default router;