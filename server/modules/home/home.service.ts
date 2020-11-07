import { HomeModel } from "./home.model";
export default class HomeService {
    async get(){
        const data = await HomeModel.find()
        return data;
    }

}