import { DeviceInterface } from "../../server/modules/device/device.model";
import { HomeInterface } from "../../server/modules/home/home.model";

declare namespace Express {
    interface Request {
        currentHome?: HomeInterface,
        currentDevice?: DeviceInterface
    }
}