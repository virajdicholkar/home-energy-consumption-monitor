import { sign } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { environment } from "../../environment";
import { DeviceInterface, DeviceModel } from "./device.model";
export default class DeviceService {
    async getDevicesByHomeId(home: string, limit = 5, skip = 0) {
        const totalCount = await DeviceModel.find({ home }).count();
        const result = await DeviceModel.find({ home }).skip(skip).limit(limit).lean();
        return { totalCount, result };
    }

    async createDevice(device: DeviceInterface) {
        const newDevice = await DeviceModel.create(device)
        return newDevice;
    }

    async getDeviceToken(device: DeviceInterface) {
        const payLoad = {
            _id: device._id,
            name: device.name,
            home: device.home
        }
        const deviceToken = await sign(payLoad, environment.jwtDeviceSecret);
        return deviceToken;
    }

    async getDeviceByName(home: string, name: string): Promise<DeviceInterface> {
        const device = await DeviceModel.findOne({ name: name, home: new ObjectId(home) }).lean();
        return device;
    }

    async getDeviceById(id: string): Promise<DeviceInterface> {
        const device = await DeviceModel.findById(id).lean();
        return device;
    }
}