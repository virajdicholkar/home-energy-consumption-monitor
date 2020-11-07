
import * as bodyParser from "body-parser";
import express = require('express')

import DBConfig from "./config/DBConfig"
import { routes } from "./routes/routes"

class App {

    public app: express.Application = express();
    // public mongoUrl: string = 'mongodb://localhost/CRMdb';  
    constructor() {
        this.config();
    }

    private async config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.all('/*', (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,X-Access-Token,X-KEY');
            res.header("Access-Control-Allow-Headers", 'Content-type,Accept,X-Acces-Tocken,X-Key');
            if (req.method == 'OPTIONS') {
                res.status(200).end();
            } else {
                next();
            }
        });
        this.app.use(express.static('public'));

        this.app.use(routes.routes());
        // this.app.listen(3000)

        let db = await DBConfig.connect()

    }



}

declare namespace Express {
    export interface Request {
        currentHome?: any;
    }
}
export default new App().app;

