import mongoose = require('mongoose'); 

class DbClient {
    private mongoUrl: string = 'mongodb://localhost:27017/UserDB';

    public async connect(){
        mongoose.Promise = global.Promise;
        return await mongoose
            .connect(this.mongoUrl, {useNewUrlParser: true})
            .then(
                e=>{
                    console.log('Dtabase Connected')
                }
            ).catch(
                err=>{
                    console.log('connection error', err)
                }
            );        
    }
}

export = new DbClient();