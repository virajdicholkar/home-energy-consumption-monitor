import { ObjectID, ObjectId } from "mongodb";
import { DeviceInterface } from "../device/device.model";
import { EnergyLogInterface, EnergyLogModel } from "./energy-log.model";
export default class EnergyLogService {
    async getLogsByHome(homeId: string) {
        const home = new ObjectID(homeId);
        const data = await EnergyLogModel.find({ home }).populate('device', { name: 1 });
        return data;
    }

    async create(device: DeviceInterface, from: Date, to: Date) {
        const fromSeconds = (+(from)) / 1000;
        const toSeconds = (+(to)) / 1000;

        const utilizationTimeInSec = toSeconds - fromSeconds;
        const utilizationTimeInHours = utilizationTimeInSec / 3600;

        const devicePowerInWatts: number = device.powerInWatts || 0;
        const powerInKWatts = devicePowerInWatts / 1000;

        const unitsConsumed = powerInKWatts * utilizationTimeInHours;
        const deviceId = new ObjectId(device._id);
        const home = new ObjectId(device.home);

        const log = {
            device: deviceId,
            home,
            utilizationTimeInSec,
            numberOfUnits: unitsConsumed,
            from: from,
            to: to
        }

        const result = await EnergyLogModel.create(log);
        return result;
    }
}