import { Response, Router } from "express";
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
            .get('/:id/token', this.getDeviceToken)
            .post('', this.registerDevice)
        return router;
    }

    private getDevices = async (req: any, res: Response) => {
        try {
            const currentHome = req.currentHome;
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 10;
            const skip = (page - 1) * limit;
            const result = await this.deviceService.getDevicesByHomeId(currentHome._id, limit, skip);
            res.status(200).json(result);
        } catch (error) {
            const code = error.code || 500;
            const message = error.message || 'Oops! Something went wrong!';
            const data = error.data;
            res.status(code).json({ message, data });
        }
    }

    private registerDevice = async (req: any, res: Response) => {
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
            res.status(201).json({ message: 'Your devices registered successfully', token });
        } catch (error) {
            const code = error.code || 500;
            const message = error.message || 'Oops! Something went wrong!';
            const data = error.data;
            res.status(code).json({ message, data });
        }
    }

    private getDeviceToken = async (req: any, res: Response) => {
        try {
            const deviceId: string = req.params.id;
            const device: DeviceInterface = await this.deviceService.getDeviceById(deviceId);
            if (!device) {
                throw {
                    code: 400,
                    message: 'Device not found!'
                }
            }
            const token = await this.deviceService.getDeviceToken(device);
            res.status(200).json({ token });
        } catch (error) {
            const code = error.code || 500;
            const message = error.message || 'Oops! Something went wrong!';
            const data = error.data;
            res.status(code).json({ message, data });
        }
    }
}