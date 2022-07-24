exports.renderNewBusinessFormPage = (req,res,next)=>{

    return res.render(`form/new.ejs`, {
        docTitle: `location name`,
    });

}