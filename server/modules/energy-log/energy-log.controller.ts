import { Request, Response, Router } from "express";
import EnergyLogService from './energy-log.service';

export class EnergyLogController {
    energyLogService = new EnergyLogService();
    router: Router;
    constructor(router: Router) {
        this.router = router;
        this.initRoutes();
    }

    private initRoutes() {
        const commonRoute = '/energy-log';
        this.router
            .get(commonRoute, this.getEnergyLog)
    }

    private getEnergyLog = async (req: Request, res: Response) => {
        const result = await this.energyLogService.get();
        res.status(200).json(result)
    }

}