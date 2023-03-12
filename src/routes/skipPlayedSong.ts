import express from "express";
import { Request, Response } from "express";
import { useQueue } from "discord-player";
import sendMessage from "../functions/sendMessage";
import KaczmarskiClient from "../KaczmarskiClient";
import readServerVariables from "../functions/readServerVariables";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const guildID = req.query.guild as string;
  const channelID = req.query.channel as string;

  const client = KaczmarskiClient.Instance;

  const areAPIActivated = readServerVariables(guildID,"areAPIActivated");

  if (areAPIActivated) {
    const apiPassword: boolean | string = readServerVariables(guildID, "apiPassword");

    if (req.query.apiPassword == apiPassword || req.query.apipassword == apiPassword || !apiPassword) {
      let queue = useQueue(guildID);

      if (queue && queue.node.isPlaying()) {
        const skipped = queue.node.skip();
        if (skipped) {
          sendMessage(guildID, channelID, "Skipped song with API!", client);
          res.status(200).send({ message: "Skipped" });
        } else {
          res.status(200).send({ message: "Problem occurred" });
        }
      } else {
        res.status(200).send({ message: "No music to skip" });
      }
    } else {
      res.status(200).send({ message: "No access" });
    }
  } else {
    res.status(200).send({ message: "Server api is off" });
  }
});

export default router;