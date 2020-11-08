import { NextFunction, Response } from "express";
import { verify } from 'jsonwebtoken';
import { environment } from "../environment";
import HomeService from "../modules/home/home.service";

const homeService = new HomeService();

export interface HomeCreds { _id: string; loginName: string; }

export const authorizeany = async (req: any, res: Response, next: NextFunction) => {

    try {
        const token = await getTokenFromHeader(req);
        const homeCred: HomeCreds = await verifyHomeToken(token);
        const home = await homeService.getHomeByLoginName(homeCred.loginName);

        if (!home) {
            throw {
                message: 'Unauthorized',
                code: 401
            }
        }
        req.currentHome = home;
        next();
    } catch (error) {
        const code = error.code || 401;
        const message = error.message || 'Oops! Something went wrong!';
        const data = error.data;
        res.status(code).json({ message, data });
    }

}

export const getTokenFromHeader = async (req: any): Promise<any> => {
    const token = req.headers['authorization'] as string;
    if (!token) {
        throw {
            code: 401,
            message: 'Unauthorized! Token not found!'
        }
    }
    return token;
}

export const verifyHomeToken = async (token: string): Promise<HomeCreds> => {
    const tokenDecode: any = await verify(token, environment.jwtHomeSecret);
    const home: HomeCreds = { _id: tokenDecode._id, loginName: tokenDecode.loginName };
    return home;
}