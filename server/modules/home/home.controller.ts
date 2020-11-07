import { Request, Response, Router } from "express";
import { HomeInterface } from "./home.model";
import HomeService from './home.service';

export class HomeController {
    homeService = new HomeService();
    router: Router;
    constructor(router: Router) {
        this.router = router;
        this.initRoutes();
    }

    private initRoutes() {
        const commonRoute = '/home';
        this.router
            .get(commonRoute, this.getHome)
            .post(commonRoute, this.createHome)
    }

    private getHome = async (req: Request, res: Response) => {
        const result = await this.homeService.get();
        res.status(200).json(result)
    }

    private createHome = async(req: Request, res: Response) => {
        try {

            const home: HomeInterface = req.body;
            const validationError: any = {};

            if (!home.ownerFirstName) {
                validationError['ownerFirstName'] = 'Owner first name required!'
            }
            if (!home.ownerLastName) {
                validationError['ownerLastName'] = 'Owner last name required!'
            }
            if (!home.password) {
                validationError['password'] = 'Password is required!'
            }
            if (!home.email) {
                validationError['email'] = 'Email is required!'
            }
            if (!home.loginName) {
                validationError['loginName'] = 'Home login name is required!'
            }
            if (!home.phone) {
                validationError['phone'] = 'Phone number is required!'
            }

            const existingHome = await this.homeService.getHomeByLoginName(home.loginName || '');
            if(existingHome){
                validationError['loginName'] = 'Login name is already taken!'
            }

            if (Object.keys(validationError).length) {
                throw {
                    code: 400,
                    message: 'Validation error!',
                    data: validationError
                }
            }
            const result = await this.homeService.create(home);
            res.status(201).json({ message: 'Your home registered successfully!', id: result })
        } catch (error) {
            const code = error.code || 500;
            const message = error.message || 'Oops! Something went wrong!';
            const data = error.data;
            res.status(code).json({ message, data });
        }
    }
}