import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
        unique: true
    },
    loginName: {
        type: String,
        unique: true
    },
    phone: {
        type: Number,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const HomeModel = mongoose.model('Home', HomeSchema);
