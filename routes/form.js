const router = require(`express`).Router(),
    middleware = require(`../middleware/businessForm`),
    { uploadImage } = require(`../config/multer`),
    uploadMulterFilesToCloudinary = require(`../handlers/cloudinary_upload`),
    controllers = require(`../controllers/form`);


const fileUploads = [
    { name: 'gallery' }
];

router.get(`/checkemail`,
    middleware.checkAlreadyExistEmail,
    controllers.sendCheckingEmailExistsSuccessResponse
)

router.get(`/postdetail/`,
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

router.post(`/new`,
    uploadImage.fields(fileUploads),
    (req, res, next) => uploadMulterFilesToCloudinary(req, `/file-share-files`, next),
    middleware.validateFormData,
    middleware.createBusinessFormInDB,
    controllers.sendBusinessFormCreationSuccessResponse,
)


router.put(`/:formDataID` ,
    uploadImage.fields(fileUploads),
    (req, res, next) => uploadMulterFilesToCloudinary(req, `/file-share-files`, next),
    middleware.validateFormData,
    middleware.editFormDataInDB,
    controllers.sendBusinessFormCreationSuccessResponse,
)

module.exports = router;