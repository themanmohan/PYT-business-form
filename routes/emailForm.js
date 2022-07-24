const router = require(`express`).Router(),
    controllers = require(`../controllers/form`);

router.get(`/`,
    controllers.renderNewBusinessFormPage
);


module.exports = router;