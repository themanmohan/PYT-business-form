
const mongoose = require(`mongoose`),
    fetchAPI = require(`../util/fetchAPI`),
    BussinessForm = mongoose.model(`bussinessForm`),
    axios = require(`axios`);


exports.fetchPost = (req, res, next) => {

    const postID = req.params.postID,
        placeTag = req.query.location;

    axios(`http://localhost:3000/v1/postdetail/${postID}?location=${placeTag}`, {
        ...fetchAPI
    })
        .then((postDetail) => {

            const post = postDetail.data.data[0];
            req.post = post
            return next();
        })
        .catch((err) => {

            req.flash(`error`, `Couldn't load admin details`);
            return res.redirect(`/dashboard`);
        });
}

exports.checkAlreadyExistEmail = (req, res, next) => {

    const email = String(req.query.email);

    BussinessForm.findOne({ email })
        .then((businessFormData) => {

            let businessFormDetail = {};
            console.log(Object.keys(businessFormDetail).length)

            if (businessFormData) {
                console.log(`working`)
                businessFormDetail = {

                    exist: true,
                    email: businessFormData.email ? businessFormData.email : null,
                    formDataId: businessFormData._id ? businessFormData._id : null,
                }
            } else {
                businessFormDetail.exist = false

            }

            req.businessFormDetail = businessFormDetail

            return next();

        })
        .catch((err) => console.log(err));

}

exports.createBusinessFormInDB = async(req, res, next) => {
    console.log(req.body)
    req.body.email = `kmanmohan032@gmail.com`

    const bussinessFormData = new BussinessForm(req.body);
    console.log(bussinessFormData)

    const redirectUrl = `/business-form/postdetail?email=${bussinessFormData.email}&formDataID=${bussinessFormData._id}`;

    await bussinessFormData.save();
    req.redirectUrl = redirectUrl

    console.log(redirectUrl)

    return next();

    // BussinessForm.create(req.body)
    //     .then((newAdmin) => {
    //         console.log(newAdmin)

    //         return next();
    //     })
    //     .catch((err) => console.log(err));
}

exports.fetchingFormDataAndRenderOnIndexPage = (req, res, next) => {

    const email = String(req.query.email),
        formDataID = req.query.formDataID;


    BussinessForm.findOne({ _id: formDataID, email })
        .then((businessFormDetail) => {
            req.businessFormDetail = businessFormDetail
            return next();

        })
        .catch((err) => console.log(err));


}


exports.fetchingFormDataByID = (req, res, next) => {

    const formDataObjectID = req.params.formDataID;

    BussinessForm.findById({ _id: formDataObjectID })
        .then((businessFormDetail) => {
            req.businessFormDetail = businessFormDetail
            return next();

        })
        .catch((err) => console.log(err));
}