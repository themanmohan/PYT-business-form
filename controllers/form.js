const { sendSuccessJSONResponse } = require(`../handlers/jsonResponseHandlers`);

exports.renderNewBusinessFormPage = (req,res,next)=>{

    return res.render(`form/new.ejs`, {
        docTitle:  req.post.location.placeTag ? req.post.location.placeTag : `location name` ,
        postDetail: req.post
    });

}


exports.renderIndexPage = (req,res,next)=>{
    return res.render(`form/index`, {
        docTitle: `sdbfjdf`,
        businessFormDetail : req.businessFormDetail
    });

}


exports.renderEditFormDataPage = (req,res,next)=>{
    return res.render(`form/edit`, {
        docTitle: `Edit Page`,
        businessFormDetail : req.businessFormDetail
    });

}




exports.sendBusinessFormCreationSuccessResponse = (req,res,next) =>{
    
    let successMsg = `form  Created Successfully`;

    // For edit requests
    if (req.params.id) successMsg = `User details edited`;
    console.log(req.redirectUrl)

    return sendSuccessJSONResponse(res, {
        message: successMsg,
        redirect_uri: req.redirectUrl
    });

}

exports.sendCheckingEmailExistsSuccessResponse = (req,res,next) =>{
    console.log(req.businessFormDetail )
    return res.status(Number(200)).json({
        status: `success`,
        businessFormDetail:  req.businessFormDetail ,
        redirect_uri:`/subscriptions/update`,
    });
}