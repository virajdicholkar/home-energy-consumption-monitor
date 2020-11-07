import { Timestamp } from 'mongodb';
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export interface DeviceInterface {
    _id?: string;
    name?: string;
    description?: string;
    home?: any;
    createDate?: string;
    powerInWatts?: number;
}
export const DeviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    home: {
        type: Schema.Types.ObjectId,
        ref: 'Home'
    },
    createDate: {
        type: String,
        default: (new Date()).toISOString()
    },
    powerInWatts: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export const DeviceModel = mongoose.model('Device', DeviceSchema);
