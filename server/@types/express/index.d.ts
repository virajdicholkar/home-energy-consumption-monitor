import { DeviceInterface } from "../../modules/device/device.model";
import { HomeInterface } from "../../modules/home/home.model";

declare namespace Express {
    interface Request {
        currentHome?: HomeInterface,
        currentDevice?: DeviceInterface
    }
}