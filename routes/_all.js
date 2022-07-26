const router = require(`express`).Router(),
    xss = require(`xss`),
    sanitiseRequestHTML = require(`../util/sanitiseRequestHTML`);

router.use((req, res, next) => {

    sanitiseRequestHTML(xss, req);
    return next();

});


const businessFormRoutes = require(`./form`);

router.use(`/business-form/postdetail`, businessFormRoutes),

module.exports = router;