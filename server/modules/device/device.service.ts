import { DeviceModel } from "./device.model";
export default class DeviceService {
    async get() {
        const data = await DeviceModel.find()
        return data;
    }

}