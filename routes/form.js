const router = require(`express`).Router(),
    middleware = require(`../middleware/businessForm`),
    controllers = require(`../controllers/form`);

router.get(`/:postID`,
    middleware.fetchPost,
    controllers.renderNewBusinessFormPage
);


module.exports = router;