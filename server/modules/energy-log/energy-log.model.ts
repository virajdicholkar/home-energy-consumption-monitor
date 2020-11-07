import { Timestamp } from 'mongodb';
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export interface EnergyLogInterface {
    home: String,
    device: String,
    utilizationTimeInSec: number,
    numberOfUnits: number,
    from: string,
    to: string
}
export const EnergyLogSchema = new Schema({

    home: {
        type: Schema.Types.ObjectId,
        ref: 'Home'
    },
    device: {
        type: Schema.Types.ObjectId,
        ref: 'Home'
    },
    utilizationTimeInSec: {
        type: Number,
    },
    numberOfUnits: {
        type: Number,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    }

}, { timestamps: true });

export const EnergyLogModel = mongoose.model('EnergyLog', EnergyLogSchema);
