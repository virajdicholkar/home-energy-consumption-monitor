
import * as bodyParser from "body-parser";
import express = require('express')

import DBConfig from "./config/DBConfig"
import { routes } from "./routes/routes"

const path = require('path');

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
            res.header("Access-Control-Allow-Headers", 'Content-type,Accept,X-Access-Token,X-Key,Authorization,DeviceToken');
            if (req.method == 'OPTIONS') {
                res.status(200).end();
            } else {
                next();
            }
        });

        
        this.app.use(routes.routes());
        
        this.app.use('/simulator', express.static('./simulator/dist/simulator/'));
        this.app.get('/simulator', this.serveSimulator);

        this.app.use(express.static('./client/dist/client/'));
        this.app.get(/^\/(?!api).*/, this.serveIndex);

        let db = await DBConfig.connect()

    }

    serveIndex(req: any, res: any) {
        const indexPath = path.resolve('./client/dist/client/index.html');
        if (indexPath) {
            res.sendFile(indexPath);
        } else {
            res.json({
                message: 'please do npm run client:watch'
            });
        }
    }

    serveSimulator(req: any, res: any) {
        const indexPath = path.resolve('./simulator/dist/simulator/index.html');
        if (indexPath) {
            res.sendFile(indexPath);
        } else {
            res.json({
                message: 'please do npm run simulator:watch'
            });
        }
    }


}

export default new App().app;

