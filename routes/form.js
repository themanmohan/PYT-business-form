const router = require(`express`).Router(),
    middleware = require(`../middleware/businessForm`),
    { uploadImage } = require(`../config/multer`),
    uploadMulterFilesToCloudinary = require(`../handlers/cloudinary_upload`),
    controllers = require(`../controllers/form`);

const mediaUploadFields = [{ name: `images`,}];

router.get(`/:postID`,
    uploadImage.fields(mediaUploadFields),
    (req, res, next) => uploadMulterFilesToCloudinary(req, `/file-share-files`, next),
    middleware.fetchPost,
    controllers.renderNewBusinessFormPage
);


module.exports = router;