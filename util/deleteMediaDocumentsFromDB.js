const { isValidMongoObjectID } = require(`./verifications`);


module.exports = (mongooseIdsArr=[], mongoose=null, MediaMongooseModel=null) => {
    if(mongooseIdsArr
     && mongooseIdsArr.length
     && Array.isArray(mongooseIdsArr)
     && mongoose
     && MediaMongooseModel){

        mongooseIdsArr.forEach((id) => {
            /**
             * Not doing anything whether delete operation is successful or a failure because it doesn't affect
             * working of any module of the Portal. This is just a function providing a 'good-to-have' feature which is to clear up
             * Media entities in case we're replacing/removing an image/video from somewhere
             * (so we don't have old Media entities lying in our DB that aren't ever going to be used again)
             */

            MediaMongooseModel.findByIdAndDelete(id)
            .then(data => null)
            .catch(err => null);
        });
    }
}