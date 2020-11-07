import { Request, Response, Router } from "express";
import DeviceService from './device.service';

export class DeviceController {
    deviceService = new DeviceService();
    router: Router;
    constructor(router: Router) {
        this.router = router;
        this.initRoutes();
    }

    private initRoutes() {
        const commonRoute = '/device';
        this.router
            .get(commonRoute, this.getDevices)
    }

    private getDevices = async (req: Request, res: Response) => {
        const result = await this.deviceService.get();
        res.status(200).json(result)
    }

}