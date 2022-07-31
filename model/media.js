const missingPackageLogger = require(`../handlers/missingPackageLogger`),
    { defaultStringConfig } = require(`../util/common`);

module.exports = function(mongoose=null){
    if(!mongoose) return missingPackageLogger(`media-mongoose-model`);

    
    const MediaSchema = new mongoose.Schema({
        entity: {
            ...defaultStringConfig,
            default: `media`,
            required: true,
            immutable: true
        },
        type: {
            type: Number,
            required: true,
            min: 1,
            max: 1
            /*
            1 = image
            */
        },
        resource_url: {
            ...defaultStringConfig,
            required: true
        }
    }, { timestamps: true });

 
    return mongoose.model(`media`, MediaSchema);
}