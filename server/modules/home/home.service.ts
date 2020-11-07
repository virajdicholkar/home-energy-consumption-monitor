import { HomeInterface, HomeModel } from "./home.model";
export default class HomeService {

    async getHomeByLoginName(loginName: string) {
        const data = await HomeModel.find({ loginName }).lean();
        return data;
    }

    async get() {
        const data = await HomeModel.find().lean()
        return data;
    }

    async create(home: HomeInterface) {
        const result = await HomeModel.create(home);
        return result._id;
    }
}