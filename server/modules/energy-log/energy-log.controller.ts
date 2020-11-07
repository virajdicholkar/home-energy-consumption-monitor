import { Request, Response, Router } from "express";
import { authorizeLogRequest } from "../../middlewares/device";
import { DeviceInterface } from "../device/device.model";
import EnergyLogService from './energy-log.service';

export class EnergyLogController {
    energyLogService = new EnergyLogService();
    router: Router;
    constructor(router: Router) {
        this.router = router;
        const commonRoute = '/energy-log';
        const logRouter = this.getLogRouter();
        this.router.use(commonRoute, authorizeLogRequest, logRouter);
    }

    private getLogRouter(): Router {
        const router = Router();
        router
            .post('', this.addLog)
        return router;
    }

    private addLog = async (req: Request, res: Response) => {

        try {
            const currentDevice: DeviceInterface = req.currentDevice;
            const { from, to } = req.body;

            if (!from) {
                throw {
                    code: 400,
                    message: 'Please tell us from when device is started'
                }
            }
            const fromDate = new Date(from);
            if (`${fromDate}`.includes('Invalid')) {
                throw {
                    code: 400,
                    message: 'Please enter proper date time'
                }
            }


            const toDate = to ? new Date(to) : new Date();
            if (`${toDate}`.includes('Invalid')) {
                throw {
                    code: 400,
                    message: 'Please enter proper to date time'
                }
            }

            const result = await this.energyLogService.create(currentDevice, fromDate, toDate);
            res.status(200).json(result)
        } catch (error) {
            const code = error.code || 500;
            const message = error.message || 'Oops! Something went wrong!';
            const data = error.data;
            res.status(code).json({ message, data });
        }




    }

}