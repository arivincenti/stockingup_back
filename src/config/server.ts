import * as express from "express";
import * as cors from "cors";
import routes from "../routes/index.routes";
import * as fileUpload from "express-fileupload";
import * as socketIO from "socket.io";
import * as http from "http";
import { SERVER_PORT } from "../config/environment";

export default class Server {
    private app: express.Application;
    private static _instance: Server;
    private port: number | string;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.settings();
        this.middlewares();
        this.routes();

        this.httpServer = new http.Server(this.app);
        // this.io = socketIO(this.httpServer);

        // this.escucharSocket();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    settings() {
        this.app.set("port", this.port);
    }

    middlewares() {
        this.app.use(
            cors({
                origin: [
                    "https://arivincenti.github.io",
                    "http://localhost:4200",
                ],
                credentials: true,
            })
        );
        // this.app.use(cors({ origin: true, credentials: true }));
        this.app.use(express.json());
        this.app.use(fileUpload());
    }

    routes() {
        this.app.use("/", routes);
    }

    // private escucharSocket() {
    //     this.io.on("connection", (socket) => {
    //         //Connect client
    //         clientsSocket.connectClient(socket);
    //         //Config Client
    //         clientsSocket.config_client(socket);
    //         //Disconnect client
    //         clientsSocket.desconectar(socket);

    //         // //Tickets
    //         ticketSocket.joinToTicket(socket);
    //         ticketSocket.leaveATicket(socket);
    //     });
    // }

    async start() {
        await this.httpServer.listen(this.app.get("port"));
        console.log(`Server corriendo en el puerto ${this.app.get("port")}`);
    }
}
