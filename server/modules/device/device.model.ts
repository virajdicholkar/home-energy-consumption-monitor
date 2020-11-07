import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
    },
    powerInWatts: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export const DeviceModel = mongoose.model('Device', DeviceSchema);
