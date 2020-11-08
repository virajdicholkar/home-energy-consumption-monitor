
import * as bodyParser from "body-parser";
import express = require('express')
const cors = require('cors')

import DBConfig from "./config/DBConfig"
import { routes } from "./routes/routes"

class App {

    public app: express.Application = express();
    constructor() {
        this.config();
    }

    private async config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        var corsOptions = {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        }
        this.app.use( cors(corsOptions))
      
        this.app.use(express.static('public'));

        this.app.use(routes.routes());

        let db = await DBConfig.connect()

    }



}

export default new App().app;

