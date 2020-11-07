import { HomeInterface } from "../../server/modules/home/home.model";

declare namespace Express {
    interface Request {
        currentHome: HomeInterface
    }
}