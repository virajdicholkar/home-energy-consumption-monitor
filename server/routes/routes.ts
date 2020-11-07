
import express = require('express')

import { HomeController } from "../modules/home/home.controller";
import { DeviceController } from "../modules/device/device.controller";
import { EnergyLogController } from '../modules/energy-log/energy-log.controller';

class Routes {
    private router = express.Router();

    public routes(): express.Router {
        const userController = new HomeController(this.router);
        const deviceController = new DeviceController(this.router);
        const energyLogController = new EnergyLogController(this.router);
        return this.router;
    }
}

export const routes = new Routes();