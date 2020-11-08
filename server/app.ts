
import * as bodyParser from "body-parser";
import express = require('express')

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

        this.app.all('/*', (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,X-Access-Token,X-KEY');
            res.header("Access-Control-Allow-Headers", 'Content-type,Accept,X-Access-Token,X-Key,Authorization');
            if (req.method == 'OPTIONS') {
                res.status(200).end();
            } else {
                next();
            }
        });

        this.app.use(express.static('public'));

        this.app.use(routes.routes());

        let db = await DBConfig.connect()

    }



}

export default new App().app;

