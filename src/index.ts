import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as cors from "cors";
import routes from "./routes/index.routes";

const PORT = process.env.PORT || 3000;

createConnection()
    .then(async () => {
        // create express app
        const app = express();

        // setup express app here
        app.use(cors());
        app.use(express.json());

        // register express routes from defined application routes
        app.use("/", routes);

        // start express server
        app.listen(PORT, () =>
            console.log(
                "Express server has started on port 3000. Open http://localhost:3000/users to see results"
            )
        );

        // insert new users for test
        // await connection.manager.save(connection.manager.create(User, {
        //     firstName: "Timber",
        //     lastName: "Saw",
        //     age: 27
        // }));
        // await connection.manager.save(connection.manager.create(User, {
        //     firstName: "Phantom",
        //     lastName: "Assassin",
        //     age: 24
        // }));
    })
    .catch((error) => console.log(error));
