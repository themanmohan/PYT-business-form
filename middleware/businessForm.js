
const mongoose = require(`mongoose`),
    fetchAPI = require(`../util/fetchAPI`),
    BussinessForm = mongoose.model(`bussinessForm`),
    Media = mongoose.model(`media`),
    { isValidEmailAddress } = require(`../util/verifications`),
    { sendFailureJSONResponse } = require(`../handlers/jsonResponseHandlers`),
    deleteMediaDocumentsFromDB = require(`../util/deleteMediaDocumentsFromDB`),
    CountryCode = require(`../util/countryCodeData.json`);
    axios = require(`axios`);


exports.fetchPost = (req, res, next) => {

    const postID = req.params.postID,
        placeTag = req.query.location;

    axios(`https://admin.pyt.travel/v1/location-detail/${postID}?location=${placeTag}`, {
        ...fetchAPI
    })
        .then((postDetail) => {
 
            const post = postDetail.data.data.locationData;
            const locationReviews = postDetail.data.data.postReviewsData;

            const countryWithISOCode = CountryCode.filter((country) => String(country.englishShortName).toLocaleLowerCase() === String(post.country).toLocaleLowerCase());

            if(!post){
                return res.redirect(`*`);
            }
            req.post = post;
            req.locationReviews = locationReviews;
            req.CountryISOCode = countryWithISOCode.alpha2Code;
            return next();
        })
        .catch((err) => {
            console.log(err)
            return res.redirect(`*`);
        });
}

exports.checkAlreadyExistEmail = (req, res, next) => {

    const email_address = String(req.query.email);

    BussinessForm.findOne({ email_address })
        .then((businessFormData) => {

            let businessFormDetail = {};
   
            if (businessFormData) {
                businessFormDetail = {

                    exist: true,
                    email: businessFormData.email_address ? businessFormData.email_address : null,
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


exports.validateFormData = async (req, res, next) => {

   
    const {
        location_name,
        city,
        country,
        address,
        contact_number,
        email_address,
        website,
        interests,
        description,

        monday,
        monday_start_time,
        monday_end_time,

        tuesday,
        tuesday_start_time,
        tuesday_end_time,

        wednesday,
        wednesday_start_time,
        wednesday_end_time,

        thursday,
        thursday_start_time,
        thursday_end_time,

        friday,
        friday_start_time,
        friday_end_time,

        saturday,
        saturday_start_time,
        saturday_end_time,

        sunday,
        sunday_start_time,
        sunday_end_time,

        pytImages


    } = req.body;


    const missingData = [],
        invalidData = [];

    // if (req.method === `POST`
    //     && !(req.files
    //         && req.files.gallery
    //         && req.files.gallery.length
    //         && req.files.gallery.every((mediaFile) => Boolean(mediaFile.location)))) {

    //     // POST method means it's a new listing (and new listings must have item_gallery images)
    //     missingData.push(`item images`);
    // }

    if (!(location_name && (typeof location_name === `string`) && location_name.trim())) missingData.push(`location name`);
    if (!(city && (typeof city === `string`) && city.trim())) missingData.push(`city`);
    if (!(country && (typeof country === `string`) && country.trim())) missingData.push(`country`);
    if (!(address && (typeof address === `string`) && address.trim())) missingData.push(`address`);
    if (!(interests && (typeof interests === `string`) && address.trim())) missingData.push(`interests`);
    if (!(description && (typeof description === `string`) && description.trim())) missingData.push(`description`);

    if (!contact_number) missingData.push(`contact number`);
    else if (contact_number && isNaN(contact_number)) invalidData(`contact number`)

    // if (!email_address) missingData.push(`email address`);
    // else if (email_address && !isValidEmailAddress(email_address)) invalidData(`email address`);

    if (!website) missingData.push(`website`);
    else if (website && !String(website).match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi)) invalidData.push(`website`);

    if (missingData.length || invalidData.length) {
        const data = {};
        if (missingData.length) data.missing = missingData;
        if (invalidData.length) data.invalid = invalidData;

        return sendFailureJSONResponse(res, {
            ...data,
            message: `Some data is missing/invalid`
        });

    } else {

        let businessTimingArray = [];

        if (monday) {
            const mondayTimingObj = {
                day: monday,
                close_timing: monday_start_time,
                open_timing: monday_end_time,
            }

            businessTimingArray.push(mondayTimingObj)

        }
        if (tuesday) {

            const tuesdayTimingObj = {
                day: tuesday,
                close_timing: tuesday_start_time,
                open_timing: tuesday_end_time,
            }

            businessTimingArray.push(tuesdayTimingObj)

        }
        if (wednesday) {

            const wednesdayTimingObj = {
                day: wednesday,
                close_timing: wednesday_start_time,
                open_timing: wednesday_end_time,
            }

            businessTimingArray.push(wednesdayTimingObj)

        }

        if (thursday) {

            const thursdayTimingObj = {
                day: thursday,
                close_timing: thursday_start_time,
                open_timing: thursday_end_time,
            }

            businessTimingArray.push(thursdayTimingObj)

        }

        if (friday) {

            const fridayTimingObj = {
                day: friday,
                close_timing: friday_start_time,
                open_timing: friday_end_time,
            }

            businessTimingArray.push(fridayTimingObj)

        }

        if (saturday) {

            const saturdayTimingObj = {
                day: saturday,
                close_timing: saturday_start_time,
                open_timing: saturday_end_time,
            }

            businessTimingArray.push(saturdayTimingObj)

        }

        if (sunday) {

            const sundayTimingObj = {
                day: sunday,
                close_timing: sunday_start_time,
                open_timing: sunday_end_time,
            }

            businessTimingArray.push(sundayTimingObj)
        }


        const itemImageEntities = [];


        if (req.cloudinaryFiles && req.cloudinaryFiles.gallery && req.cloudinaryFiles.gallery.length) {

            for (let i = req.cloudinaryFiles.gallery.length - 1; i >= 0; i--) {
                const itemImageFileEntity = await Media.create({
                    type: 1,
                    resource_url: req.cloudinaryFiles.gallery[i]
                });


                itemImageEntities.unshift(itemImageFileEntity._id);
            }
        }


        let businessFormDataObj = {};

        if (location_name) businessFormDataObj.location_name = location_name;
        if (city) businessFormDataObj.city = city;
        if (country) businessFormDataObj.country = country;
        if (address) businessFormDataObj.address = address;
        if (contact_number) businessFormDataObj.contact_number = contact_number;
        if (email_address) businessFormDataObj.email_address = email_address;
        if (website) businessFormDataObj.website = website;
        if (interests) businessFormDataObj.interests = Array.isArray(interests) ? interests : interests.split(`,`);
        if (description) businessFormDataObj.description = description;
        if(pytImages) businessFormDataObj.pytImages = JSON.parse(pytImages);
        if (itemImageEntities && itemImageEntities.length) businessFormDataObj.media = {
            gallery : itemImageEntities
        }

        if (businessTimingArray && businessTimingArray.length) businessFormDataObj.timing = businessTimingArray;

        req.businessFormDataObj = businessFormDataObj;
        return next()

    }

}

exports.createBusinessFormInDB = async (req, res, next) => {

    const bussinessFormData = new BussinessForm(req.businessFormDataObj);

    const redirectUrl = `/business-form/postdetail?email=${bussinessFormData.email_address}&formDataID=${bussinessFormData._id}`;

    console.log(bussinessFormData)
    await bussinessFormData.save();
    req.redirectUrl = redirectUrl

    return next();
}

exports.editFormDataInDB = (req, res, next) => {
    const formDataID = req.params.formDataID,
        businessFormDetail = req.businessFormDataObj;

        BussinessForm.findById(formDataID)
        .then((listing) => {
           
            if(!listing){
                return sendFailureJSONResponse(res, {
                    message: `Listing does not exist`
                });
            }
    
            // Remove media that admin has specified is meant for deletion
            const { media_to_delete: mediaToDelete } = req.body;
    
            for(let key in mediaToDelete){
                const idsToDelete = mediaToDelete[key].split(`,`);
    
                for(let i=idsToDelete.length - 1; i >= 0; i--){
                    
                    const indexOfIDToDelete = listing.media[key].findIndex((savedID) => savedID.toString() === idsToDelete[i]);
    
                    if(indexOfIDToDelete !== -1){
                        listing.media[key].splice(indexOfIDToDelete, 1);
                    }
                }
    
                // Delete old media documents from DB (cleanup)
                deleteMediaDocumentsFromDB(idsToDelete, mongoose, Media);
            }
    

            const itemImagesToUse = [
                ...listing.media.gallery,
            ];

            if( businessFormDetail.media){
                itemImagesToUse.push(...businessFormDetail.media.gallery)
            }

            return BussinessForm.findByIdAndUpdate(formDataID, {
                ...businessFormDetail,
                media: {
                    gallery: itemImagesToUse
                }
            });
        })
        .then((updatedListing) => {
            const redirectUrl = `/business-form/postdetail?email=${updatedListing.email_address}&formDataID=${updatedListing._id}`;
            req.redirectUrl = redirectUrl;
            return next()
        })
        .catch((err) => {
            console.log(err)
            sendErrorJSONResponse(res, `Couldn't connect to database`)
        });


}

exports.fetchingFormDataAndRenderOnIndexPage = (req, res, next) => {

    const email = String(req.query.email),
        formDataID = req.query.formDataID;


    BussinessForm.findOne({ _id: formDataID, email_address: email  })
        .populate({
            path: `media.gallery`,
            select: `resource_url`
        })
        .then((businessFormDetail) => {

            req.businessFormDetail = businessFormDetail
            return next();

        })
        .catch((err) => console.log(err));


}


exports.fetchingFormDataByID = (req, res, next) => {

    const formDataObjectID = req.params.formDataID;

    BussinessForm.findById({ _id: formDataObjectID })
        .populate({
            path: `media.gallery`,
            select: `resource_url`
        })
        .then((businessFormDetail) => {
            req.businessFormDetail = businessFormDetail
            return next();

        })
        .catch((err) => console.log(err));
}