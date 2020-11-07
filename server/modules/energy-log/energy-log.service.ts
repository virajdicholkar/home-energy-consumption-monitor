import { EnergyLogModel } from "./energy-log.model";
export default class EnergyLogService {
    async get() {
        const data = await EnergyLogModel.find()
        return data;
    }

}