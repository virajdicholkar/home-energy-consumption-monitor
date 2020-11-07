import { Request, Response, Router } from "express";
import { ObjectID } from "mongodb";
import { authorizeRequest } from "../../middlewares/auth";
import { DeviceInterface } from "./device.model";
import DeviceService from './device.service';

export class DeviceController {
    deviceService = new DeviceService();
    router: Router;
    constructor(router: Router) {
        this.router = router;
        const deviceRoute = '/device';
        const deviceRouter: Router = this.getDeviceRoutes();
        this.router.use(deviceRoute, authorizeRequest, deviceRouter);
    }

    private getDeviceRoutes(): Router {
        const router = Router();
        router
            .get('', this.getDevices)
            .post('', this.registerDevice)
        return router;
    }

    private getDevices = async (req: Request, res: Response) => {
        try {
            const currentHome = req.currentHome;
            const devices = await this.deviceService.getDevicesByHomeId(currentHome._id);
            res.status(200).json({ message: 'Your devices retrieved successfully', devices });
        } catch (error) {
            const code = error.code || 500;
            const message = error.message || 'Oops! Something went wrong!';
            const data = error.data;
            res.status(code).json({ message, data });
        }
    }

    private registerDevice = async (req: Request, res: Response) => {
        try {
            const currentHome = req.currentHome;
            const device: DeviceInterface = req.body;
            const validationError: any = {};

            if (!device.name) {
                validationError['name'] = 'Device name is required!'
            }

            if (!device.powerInWatts) {
                validationError['powerInWatts'] = 'Please enter power required to device in watts!'
            }

            const deviceExist: DeviceInterface = await this.deviceService.getDeviceByName(currentHome._id, device.name || '');
            if (deviceExist) {
                validationError['name'] = `${deviceExist.name} already exists!`;
                validationError['_id'] = deviceExist._id;
            }

            if (Object.keys(validationError).length) {
                throw {
                    code: 400,
                    message: 'Validation error!',
                    data: validationError
                }
            }

            device.home = currentHome._id;
            const newDevice = await this.deviceService.createDevice(device);
            const token = await this.deviceService.getDeviceToken(newDevice);
            res.status(200).json({ message: 'Your devices registered successfully', token });
        } catch (error) {
            const code = error.code || 500;
            const message = error.message || 'Oops! Something went wrong!';
            const data = error.data;
            res.status(code).json({ message, data });
        }
    }

}