import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export interface HomeInterface {
    _id?: string;
    ownerFirstName?: string;
    ownerLastName?: string;
    email?: string;
    loginName?: string;
    phone?: string;
    password?: string;
}

export const HomeSchema = new Schema({
    ownerFirstName: {
        type: String,
        required: true
    },
    ownerLastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    loginName: {
        type: String,
        unique: true
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const HomeModel = mongoose.model('Home', HomeSchema);
