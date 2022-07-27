exports.renderNewBusinessFormPage = (req,res,next)=>{

    return res.render(`form/new.ejs`, {
        docTitle:  req.post.location.placeTag ? req.post.location.placeTag : `location name` ,
        postDetail: req.post
    });

}


exports.renderIndexPage = (req,res,next)=>{

    return res.render(`form/index`, {
        docTitle: `sdbfjdf`,
    });

}



exports.sendBusinessFormCreationSuccessResponse = (req,res,next) =>{
    return res.status(Number(200)).json({
        status: `success`
    });
}

exports.sendCheckingEmailExistsSuccessResponse = (req,res,next) =>{
    return res.status(Number(200)).json({
        status: `success`,
        exist:  req.exist ,
        redirect_uri:`/subscriptions/update`,
    });
}