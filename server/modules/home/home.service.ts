import { HomeInterface, HomeModel } from "./home.model";
import { sign } from 'jsonwebtoken';
import { environment } from "../../../environment";
export default class HomeService {

    async getHomeByLoginName(loginName: string): Promise<HomeInterface> {
        const data = await HomeModel.findOne({ loginName }).select({
            _id: 1,
            ownerFirstName: 1,
            ownerLastName: 1,
            email: 1,
            loginName: 1,
            phone: 1
        }).lean();
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

    async checkPassword(home: HomeInterface, password: string) {
        return home.password === password;
    }

    async loginToHome(loginName: string, password: string): Promise<HomeInterface> {
        const home = await HomeModel.findOne({ loginName }).lean();
        if (!home) {
            throw {
                code: 400,
                message: 'Your home not registered! Please register first.'
            }
        }
        const passwordCheck = await this.checkPassword(home, password);
        if (!passwordCheck) {
            throw {
                code: 400,
                message: 'Oops! Wrong password!'
            }
        }
        delete home.password;
        return home;
    }

    async createLoginToken(home: HomeInterface) {
        const payload = { _id: home._id, loginName: home.loginName };
        const token = await sign(payload, environment.jwtHomeSecret, { expiresIn: 60 * environment.jwtHomeExpiresInHour });
        return token;
    }
}