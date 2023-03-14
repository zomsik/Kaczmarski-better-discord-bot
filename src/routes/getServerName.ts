import { Router, Request, Response } from 'express';
import { useQueue } from 'discord-player';
import readServerVariables from '../functions/readServerVariables';
import KaczmarskiClient from '../KaczmarskiClient';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const guildID = req.query.guild as string;

  const areAPIActivated: boolean | string = readServerVariables(guildID, 'areAPIActivated');


  if (areAPIActivated) {
    const client = KaczmarskiClient.Instance;
    const guild = await client.guilds.fetch(guildID)


    res.status(200).send({ message: guild.name });
    
  } else {
    res.status(200).send({ message: 'Server api is off' });
  }
});

export default router;