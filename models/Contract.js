const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid'); 

const contractSchema = new Schema({
    contractId: {
        type: String,
        unique: true,
        default: uuidv4,  
    },
    profileId: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    startDateTime: {
        type: Date,
        required: true,
    },
    endDateTime: {
        type: Date,
        required: true,
    },
    join: {
        type: Boolean,
        default: false,
    },
    joinDateTime: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true
});

const Contract = mongoose.model('Contract', contractSchema);
module.exports = Contract;
