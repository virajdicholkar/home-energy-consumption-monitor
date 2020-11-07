import { Request, Response, Router } from "express";
import HomeService from './home.service';

export class HomeController {
    homeService = new HomeService();
    router: Router;
    commonRoute = '/home';
    constructor(router: Router) {
        this.router = router;
        this.initRoutes();
    }

    private initRoutes() {
        this.router
            .get(this.commonRoute, this.getHome)
    }

    private getHome = async (req: Request, res: Response) => {
        const result = await this.homeService.get();
        res.status(200).json(result)
    }

}