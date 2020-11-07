import { Timestamp } from 'mongodb';
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
        type: Timestamp,
        required: true
    },
    to: {
        type: Timestamp,
        required: true
    }
    
}, { timestamps: true });

export const EnergyLogModel = mongoose.model('EnergyLog', EnergyLogSchema);
