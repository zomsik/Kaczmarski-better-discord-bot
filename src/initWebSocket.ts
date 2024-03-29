import { Server as HttpServer} from "http"
import { Server, Socket } from "socket.io";
import checkIfFileExists from "./functions/checkIfFileExists";
import readServerVariables from "./functions/readServerVariables";
import handleWebSocketMessage from "./handleWebSocketMessage";


export default function initWebSocket(server: HttpServer) {
    const io = new Server(server, {
      transports: ["websocket", "polling"],
      allowEIO3: true,
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: "*",
        credentials: true,
      },
    });

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

        const webSocketPassword: boolean | string = readServerVariables(headers.server as string, "webSocketPassword");
        if (typeof webSocketPassword == "string" && webSocketPassword != headers.authorization) {
            next(new Error('Disconnected - wrong authorization password!'))
        }

        next();
      })
    .on('connection', (socket: Socket) => {
        const serverId: string = socket.handshake.headers.server as string;

        socket.join(serverId);

        socket.on('message', function(request) {
            handleWebSocketMessage(socket, serverId, request)
        });

        socket.on('disconnect', () => {
          });

    });

    return io;
}