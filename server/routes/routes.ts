
import express = require('express')

import { HomeController } from "../modules/user/home.controller";

class Routes {
    private router = express.Router();

    public routes(): express.Router {
        const userController = new HomeController(this.router);
        return this.router;
    }
}

export const routes = new Routes();