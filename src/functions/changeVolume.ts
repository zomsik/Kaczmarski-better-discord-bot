import { GuildQueue } from "discord-player";

export default function changeVolume(queue: GuildQueue, volume: number, operation: string, previousVolume: number): boolean {

    switch (operation) {
        case "add": {
            if (volume+previousVolume >= 100)
                queue.node.setVolume(100);
            else 
                queue.node.setVolume(previousVolume+volume);
            
            return true;
        }                     
        case "sub": {
            if (previousVolume-volume <= 0)
                queue.node.setVolume(0);
            else 
                queue.node.setVolume(previousVolume-volume);
            
            return true;
        } 
        case "set": {
            queue.node.setVolume(volume);
            return true;
        }
        default: {
            return false;
        }
    }
}
  