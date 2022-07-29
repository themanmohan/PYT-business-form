const router = require(`express`).Router(),
    middleware = require(`../middleware/businessForm`),
    { uploadImage } = require(`../config/multer`),
    uploadMulterFilesToCloudinary = require(`../handlers/cloudinary_upload`),
    controllers = require(`../controllers/form`);

const mediaUploadFields = [{ name: `file`, }];

router.get(`/checkemail`,
    middleware.checkAlreadyExistEmail,
    controllers.sendCheckingEmailExistsSuccessResponse
)

router.get(`/postdetail`,
    middleware.fetchingFormDataAndRenderOnIndexPage,
    controllers.renderIndexPage
)

router.get(`/edit/:formDataID`,
    middleware.fetchingFormDataByID,
    controllers.renderEditFormDataPage
)

router.get(`/postdetail/:postID`,
    middleware.fetchPost,
    controllers.renderNewBusinessFormPage
);

router.post(`/postdetail`,
    uploadImage.fields(mediaUploadFields),
    (req, res, next) => uploadMulterFilesToCloudinary(req, `/file-share-files`, next),
    middleware.createBusinessFormInDB,
    controllers.sendBusinessFormCreationSuccessResponse,
)


module.exports = router;