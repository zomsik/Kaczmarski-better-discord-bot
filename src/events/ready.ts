import KaczmarskiClient from "../KaczmarskiClient";
import { Event } from '../../types';

const ready: Event = {
	name: 'ready',
	once: true,
	execute(client: KaczmarskiClient) {
		console.log(`Ready! Logged in as ${client.user?.tag}`);
	},
};

export default ready;