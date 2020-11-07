import { Request, Response, Router } from "express";
import { authorizeRequest, verifyHomeToken } from "../../middlewares/auth";
import { HomeInterface } from "./home.model";
import HomeService from './home.service';

export class HomeController {
    homeService = new HomeService();
    router: Router;
    constructor(router: Router) {
        this.router = router;
        const commonRoute = '/home';
        const homeRouter = this.getRoutes();
        this.router.use(commonRoute, authorizeRequest, homeRouter);
        const authRoutes = '/auth'
        const authRouter = this.getAuthRoutes();
        this.router.use(authRoutes, authRouter);
    }

    private getAuthRoutes(): Router {
        const authRouter = Router();
        authRouter
            .get('', this.getHome)
            .post('/register', this.createHome)
            .post('/login', this.loginToHome)
        return authRouter
    }

    private getRoutes(): Router {
        const homeRouter = Router();
        homeRouter
            .get('', this.getHome)
        return homeRouter;
    }

    private getHome = async (req: Request, res: Response) => {
        res.status(200).json(req.currentHome);
    }

    private createHome = async (req: Request, res: Response) => {
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
            if (existingHome) {
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

    private loginToHome = async (req: Request, res: Response) => {
        try {
            const body: { loginName: string, password: string } = req.body;
            if (!body.loginName) {
                throw {
                    code: 400,
                    message: 'Login name not found!'
                }
            }

            if (!body.password) {
                throw {
                    code: 400,
                    message: 'Password not found!'
                }
            }

            const home = await this.homeService.loginToHome(body.loginName, body.password);

            const token = await this.homeService.createLoginToken(home);

            res.status(200).json({ message: 'Login successfull!', token });

        } catch (error) {
            const code = error.code || 500;
            const message = error.message || 'Oops! Something went wrong!';
            const data = error.data;
            res.status(code).json({ message, data });
        }
    }
}