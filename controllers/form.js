exports.renderNewBusinessFormPage = (req,res,next)=>{

    return res.render(`form/new.ejs`, {
        docTitle:  req.post.location.placeTag ? req.post.location.placeTag : `location name` ,
        postDetail: req.post
    });

}