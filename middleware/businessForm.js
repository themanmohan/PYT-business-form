
const mongoose = require(`mongoose`),
    fetchAPI = require(`../util/fetchAPI`),
    axios = require(`axios`);


exports.fetchPost = (req,res,next) => {

    const postID = req.params.postID,
        placeTag = req.query.location;

    axios(`http://localhost:3000/v1/postdetail/${postID}?location=${placeTag}`, {
        ...fetchAPI
    })
    .then((postDetail) => {
        console.log(postDetail.data.data[0].location.placeTag)
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