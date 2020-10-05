import "reflect-metadata";
import { createConnection } from "typeorm";
import Server from "./config/server";

createConnection()
    .then(async () => {
        const server = Server.instance;
        server.start();
    })
    .catch((error) => console.log(error));
