import { sign } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { environment } from "../../../environment";
import { DeviceInterface, DeviceModel } from "./device.model";
export default class DeviceService {
    async getDevicesByHomeId(home: string) {
        const data = await DeviceModel.find({ home });
        return data;
    }

    async createDevice(device: DeviceInterface) {
        const newDevice = await DeviceModel.create(device)
        return newDevice;
    }

    async getDeviceToken(device: DeviceInterface) {
        const payLoad = {
            _id: device._id,
            name: device.name
        }
        const deviceToken = await sign(payLoad, environment.jwtDeviceSecret);
        return deviceToken;
    }

    async getDeviceByName(home: string, name: string): Promise<DeviceInterface> {
        const device = await DeviceModel.findOne({ name: name, home: new ObjectId(home) }).lean();
        return device;
    }
}