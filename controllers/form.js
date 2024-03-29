const { sendSuccessJSONResponse } = require(`../handlers/jsonResponseHandlers`);

exports.renderNewBusinessFormPage = (req, res, next) => {

    return res.render(`form/new.ejs`, {
        docTitle:  req.post.placeTag ? req.post.placeTag : `Location Name` ,
        postDetail: req.post,
        locationReviews: req.locationReviews,
        CountryISOCode: req.CountryISOCode
    });

}

exports.renderIndexPage = (req,res,next) => {

    return res.render(`form/index`, {
        docTitle: req.businessFormDetail.location_name,
        businessFormDetail : req.businessFormDetail
    });

}

exports.renderEditFormDataPage = (req, res, next) => {

    return res.render(`form/edit`, {
        docTitle: req.businessFormDetail.location_name,
        businessFormDetail : req.businessFormDetail,
        CountryISOCode: req.CountryISOCode
    });

}

exports.sendBusinessFormCreationSuccessResponse = (req, res, next) => {
    
    let successMsg = `Your Business Detail Created Successfully!`;

    // For edit requests
    if (req.params.formDataID) successMsg = `Your Business Detail Edited Successfully!`;

    return sendSuccessJSONResponse(res, {
        message: successMsg,
        redirect_uri: req.redirectUrl
    });

}

exports.sendCheckingEmailExistsSuccessResponse = (req, res, next) => {
   
    return sendSuccessJSONResponse(res, {
        businessFormDetail:  req.businessFormDetail
    });

}