import { Router, Request, Response } from 'express';
import { useQueue } from 'discord-player';
import readServerVariables from '../functions/readServerVariables';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const guildID = req.query.guild as string;

  const areAPIActivated: boolean | string = readServerVariables(guildID, 'areAPIActivated');


  if (areAPIActivated) {
    let queue = useQueue(guildID);

    if (queue && queue.node.isPlaying()) {
        if (queue.currentTrack) {
            res.status(200).send({ message: queue.currentTrack.title });
        }
        else {
            res.status(200).send({ message: 'Song without title' });
        }


    } else {
      res.status(200).send({ message: 'No music right now' });
    }
  } else {
    res.status(200).send({ message: 'Server api is off' });
  }
});

export default router;