const mongoose  = require(`mongoose`);

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
    time: {
        startTime:{
            type: String,
            required: true
        },
        endTime:{
            type: String,
            required: true
        }
    },
    media: {
        gallery: {
            type: [{
                type: String,
                required: true,
            }]
        }
    },
    contact_number:{
        type: Number,
        required: true
    },

    website: {
        type: String,
        required: true
    },
    intrest :{
        type:[{
            type: String,
            required:true
        }]
    }


},{
    timestamps: true
})

module.export = mongoose.model(`bussinessForm`, businessFormSchema);