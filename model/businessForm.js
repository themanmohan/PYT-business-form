const mongoose = require(`mongoose`);

const businessFormSchema = new mongoose.Schema({

    location_name: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    timing: {

        type: [{
            day: {
                type: String,
                required: true
            },
            open_at: {
                type: String,
                required: true
            },
            close_at : {
                type: String,
                required
            }
        }]
    },
    media: {
        gallery: {
            type: [{
                type: String,
                required: true,
            }]
        }
    },
    contact_number: {
        type: Number,
        required: true
    },

    website: {
        type: String,
        required: true
    },
    intrest: {
        type: [{
            type: String,
            required: true
        }]
    }

}, {
    timestamps: true
})

module.export = mongoose.model(`bussinessForm`, businessFormSchema);