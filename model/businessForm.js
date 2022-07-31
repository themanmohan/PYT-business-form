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

    country: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    description: {
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
            open_timing: {
                type: String,
                required: true
            },
            close_timing: {
                type: String,
            }
        }]
    },
    media: {
        gallery: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: `media`
            }],
            required: true
        }
    },

    contact_number: {
        type: Number,
        required: true
    },

    email_address: {
        type: String,
        required: true
    },

    website: {
        type: String,
        required: true
    },
    interests: {
        type: [{
            type: String,
            required: true
        }]
    }

}, {
    timestamps: true
})

module.export = mongoose.model(`bussinessForm`, businessFormSchema);