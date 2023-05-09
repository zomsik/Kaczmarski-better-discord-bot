import { Server as HttpServer} from "http"
import { Server, Socket } from "socket.io";
import checkIfFileExists from "./functions/checkIfFileExists";
import readServerVariables from "./functions/readServerVariables";
import handleWebSocketMessage from "./handleWebSocketMessage";


export default function initWebSocket(server: HttpServer) {
    const io = new Server(server, {});

    io.use((socket, next) => {
        const headers = socket.handshake.headers;
        if(!headers.server) {
            next(new Error('Disconnected - no server id!'))
        }

        checkIfFileExists('../serversVariables.json')

        const areWebSocketsActivated: boolean | string = readServerVariables(headers.server as string,"areWebSocketActivated");
        if (!areWebSocketsActivated) {
            next(new Error('Disconnected - websockets are disabled!'))
        }

        const webSocketPassword: boolean | string = readServerVariables(headers.authorization as string, "webSocketPassword");
        if (webSocketPassword != headers.authorization && typeof webSocketPassword == "string") {
            next(new Error('Disconnected - wrong authorization password!'))
        }

        next();
      })
    .on('connection', (socket: Socket) => {
        const serverId: string = socket.handshake.headers.server as string;

        socket.join(serverId);

        socket.on('message', function(message: string) {
            handleWebSocketMessage(io, socket, serverId, message)
        });

        socket.on('disconnect', () => {
          });

    });

    return io;
}