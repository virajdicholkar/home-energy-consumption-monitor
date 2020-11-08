import { ObjectID, ObjectId } from "mongodb";
import { DeviceInterface } from "../device/device.model";
import { EnergyLogInterface, EnergyLogModel } from "./energy-log.model";
export default class EnergyLogService {
    async getHomeLogById(homeId: string, logId): Promise<Array<EnergyLogInterface>> {
        const home = new ObjectID(homeId);
        const _id = new ObjectID(logId);
        const result = await EnergyLogModel.find({ _id, home })
            .populate('device')
            .lean();
        return result;
    }

    async getLogsByHome(homeId: string, skip: number = 0, limit: number = 10): Promise<{ totalCount: number, result: EnergyLogInterface }> {
        const home = new ObjectID(homeId);
        const totalCount = await EnergyLogModel.find({ home }).count();
        const result = await EnergyLogModel.find({ home })
            .skip(skip)
            .limit(limit)
            .populate('device', { name: 1 })
            .lean();
        return { totalCount, result };
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