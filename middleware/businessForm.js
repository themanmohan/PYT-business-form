
const mongoose = require(`mongoose`),
    fetchAPI = require(`../util/fetchAPI`),
    BussinessForm = mongoose.model(`bussinessForm`),
    axios = require(`axios`);


exports.fetchPost = (req,res,next) => {

    const postID = req.params.postID,
        placeTag = req.query.location;

    axios(`http://localhost:3000/v1/postdetail/${postID}?location=${placeTag}`, {
        ...fetchAPI
    })
    .then((postDetail) => {
  
        const post =  postDetail.data.data[0];
        req.post = post
        return next();
    })
    .catch((err) => {
        console.log(err)
        req.flash(`error`, `Couldn't load admin details`);
        return res.redirect(`/dashboard`);
    });
}

exports.checkAlreadyExistEmail = (req, res, next) =>{

    const email = String(req.query.email);
    console.log(email)

    BussinessForm.findOne({email})
    .then((businessFormDetail) => {
        console.log(businessFormDetail)
        let exist;
      if(businessFormDetail) exist = true;
      else exist = false;

      req.exist = exist;

        return next();
    })
    .catch((err) =>console.log(err));

}

exports.createBusinessFormInDB = (req,res,next) =>{

    BussinessForm.create(req.body)
    .then((newAdmin) => {
      console.log(newAdmin)

        return next();
    })
    .catch((err) =>console.log(err));
}