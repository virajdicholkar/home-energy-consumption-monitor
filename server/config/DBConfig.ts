import mongoose = require('mongoose');
import { environment } from '../environment';

class DbClient {

    public async connect() {
        const mongoUrl: string = environment.mongoUrl;
        mongoose.Promise = global.Promise;
        return await mongoose
            .connect(mongoUrl, { useNewUrlParser: true })
            .then(
                e => {
                    console.log('Dtabase Connected')
                }
            ).catch(
                err => {
                    console.log('connection error', err)
                }
            );
    }
}

export = new DbClient();