import { NextFunction, Response } from "express";
import { verify } from 'jsonwebtoken';
import { environment } from "../environment";
import DeviceService from "../modules/device/device.service";

const deviceService = new DeviceService();

export interface DeviceCreds { _id: string; home: string, name: string }

export const authorizeLogany = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token = await getDeviceTokenFromHeader(req);
        const deviceCred: DeviceCreds = await verifyDeviceToken(token);
        const device = await deviceService.getDeviceById(deviceCred._id);
        if (!device) {
            throw {
                message: 'Unauthorized',
                code: 401
            }
        }
        req.currentDevice = device;
        next();
    } catch (error) {
        const code = error.code || 401;
        const message = error.message || 'Oops! Something went wrong!';
        const data = error.data;
        res.status(code).json({ message, data });
    }
}

export const getDeviceTokenFromHeader = async (req: any): Promise<any> => {
    const token = req.headers['devicetoken'] as string;
    if (!token) {
        throw {
            code: 401,
            message: 'Unauthorized! Token not found!'
        }
    }
    return token;
}

export const verifyDeviceToken = async (token: string): Promise<DeviceCreds> => {
    const tokenDecode: any = await verify(token, environment.jwtDeviceSecret);
    const device: DeviceCreds = { _id: tokenDecode._id, home: tokenDecode.home, name: tokenDecode.name };
    return device;
}