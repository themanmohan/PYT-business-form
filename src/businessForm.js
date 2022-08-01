import modal from "./resources/modal";
import getFormData from "./resources/getFormData";
import showToast from "../handlers/toastAlerts";
import { isValidEmailAddress, isAcceptableImageFormat } from '../util/verifications';
import fetchReqConfig from "./config/fetchReq";
import handleFetchErrors from "../handlers/handleFetchErrors";
import standardFetchResponses from "../handlers/standardFetchResponses";
import { confirmUserAction } from "./resources/util/confirmUserAction";
import mediaDeleteBtns from  "./resources/mediaDeleteBtns";
import loader from "./resources/loader";

document.onload = function () {

    const businessForm = document.querySelector(`#business-form`),
        formDataID = businessForm.dataset.listingId;

    // checking if edit page thne not showing email input modal
    if (!formDataID) checkingBusinessEmail();
    handlingBusinessForm();

}();


function checkingBusinessEmail() {

    const bussinessFormEmailModal = modal.show(null, [`email-verification-form-wrapper`], `

        <div class="email-verification-form-section">

            <h3>Your Enter Your Email</h3>

            <form id="email-verification-form">
                <div class="form-group">
                    <input type="email" name="email" class="form-control" id="email"  placeholder="example11@gmail.com">
                    <small id="email" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        
        </div>`

    );


    const businessEmailVerificationForm = document.querySelector(`#email-verification-form`);

    businessEmailVerificationForm.addEventListener(`submit`, (e) => {

        e.preventDefault();

        const businessEmailVerificationFormData = getFormData(businessEmailVerificationForm),
            missingData = [],
            invalidData = [];

        const emailAddress = businessEmailVerificationFormData.email;

        if (!(emailAddress && emailAddress.trim())) missingData.push(`email address`)
        if (emailAddress && !isValidEmailAddress(emailAddress)) invalidData.push(`email address!`);

        if (missingData.length || invalidData.length) {

            if (missingData.length) {
                showToast.error({
                    message: `Missing Data: ${`<br> - ` + missingData.join(`<br> - `)}`
                });
            }

            if (invalidData.length) {
                showToast.error({
                    message: `Invalid Data: ${`<br> - ` + invalidData.join(`<br> - `)}`
                });
            }

            return;

        }

        const loaderID = loader.show(`Changing status`);

        fetch(`/business-form/checkemail?email=${emailAddress}`, {
            ...fetchReqConfig,
            method: `GET`
        })
            .then(handleFetchErrors)
            .then((res) => {

                loader.hide(loaderID)

                if (res.status === `success` && res.data.businessFormDetail.exist === true) {
                    window.location.href = `/business-form/postdetail?email=${res.data.businessFormDetail.email}&formDataID=${res.data.businessFormDetail.formDataId}`
                } else {
                    // Save data to sessionStorage
                    sessionStorage.setItem('email_address', emailAddress);
                    modal.hide(bussinessFormEmailModal)
                }
            })
            .catch(standardFetchResponses.error);
    })

}


function handlingBusinessForm() {

    const mondayTimeCheckbox = document.querySelector(`.monday-time`),
        tuesdayTimeCheckbox = document.querySelector(`.tuesday-time`),
        wednesdayTimeCheckbox = document.querySelector(`.wednesday-time`),
        thursdayTimeCheckbox = document.querySelector(`.thursday-time`),
        fridayTimeCheckbox = document.querySelector(`.friday-time`),
        saturdayTimeCheckbox = document.querySelector(`.saturday-time`),
        sundayTimeCheckbox = document.querySelector(`.sunday-time`);

    const mondayOpenCloseTimeSection = document.querySelector(`#monday-open-close-time`),
        tuesdayOpenCloseTimeSection = document.querySelector(`#tuesday-open-close-time`),
        wednesdayOpenCloseTimeSection = document.querySelector(`#wednesday-open-close-time`),
        thursdayOpenCloseTimeSection = document.querySelector(`#thursday-open-close-time`),
        fridayOpenCloseTimeSection = document.querySelector(`#friday-open-close-time`),
        saturdayOpenCloseTimeSection = document.querySelector(`#saturday-open-close-time`),
        sundayOpenCloseTimeSection = document.querySelector(`#sunday-open-close-time`);



    mondayTimeCheckbox.addEventListener(`change`, (e) => {
        if (mondayTimeCheckbox.checked) mondayOpenCloseTimeSection.classList.add(`open-timing`);
        else mondayOpenCloseTimeSection.classList.remove(`open-timing`);
    });

    tuesdayTimeCheckbox.addEventListener(`change`, (e) => {
        if (tuesdayTimeCheckbox.checked) tuesdayOpenCloseTimeSection.classList.add(`open-timing`);
        else tuesdayOpenCloseTimeSection.classList.remove(`open-timing`);
    });


    wednesdayTimeCheckbox.addEventListener(`change`, (e) => {
        if (wednesdayTimeCheckbox.checked) wednesdayOpenCloseTimeSection.classList.add(`open-timing`);
        else wednesdayOpenCloseTimeSection.classList.remove(`open-timing`);
    });

    thursdayTimeCheckbox.addEventListener(`change`, (e) => {
        if (thursdayTimeCheckbox.checked) thursdayOpenCloseTimeSection.classList.add(`open-timing`);
        else thursdayOpenCloseTimeSection.classList.remove(`open-timing`);
    });

    fridayTimeCheckbox.addEventListener(`change`, (e) => {
        if (fridayTimeCheckbox.checked) fridayOpenCloseTimeSection.classList.add(`open-timing`);
        else fridayOpenCloseTimeSection.classList.remove(`open-timing`);
    });

    saturdayTimeCheckbox.addEventListener(`change`, (e) => {
        if (saturdayTimeCheckbox.checked) saturdayOpenCloseTimeSection.classList.add(`open-timing`);
        else saturdayOpenCloseTimeSection.classList.remove(`open-timing`);
    });

    sundayTimeCheckbox.addEventListener(`change`, (e) => {
        if (sundayTimeCheckbox.checked) sundayOpenCloseTimeSection.classList.add(`open-timing`);
        else sundayOpenCloseTimeSection.classList.remove(`open-timing`);
    });


    const businessForm = document.querySelector(`#business-form`),
        formDataID = businessForm.dataset.listingId;

        if(formDataID){
            // i.e. edit category form
            mediaDeleteBtns.setup();
        }

    businessForm.addEventListener(`submit`, async (e) => {

        e.preventDefault();

        const businessFormData = getFormData(businessForm);

        const missingData = [],
            invalidData = [];

        let isDataPerfect = true;

        const locationName = businessFormData.location_name;

        if (!locationName) missingData.push(`location name`);
        else if (locationName && typeof locationName !== 'string') invalidData.push(`location name`);

        if (!businessFormData.city) missingData.push(`city`);
        else if (businessFormData.city && typeof businessFormData.city !== 'string') invalidData.push(`city`);

        if (!businessFormData.country) missingData.push(`country`);
        else if (businessFormData.country && typeof businessFormData.country !== 'string') invalidData.push(`country`);

        if (!businessFormData.address) missingData.push(`address`);
        else if (businessFormData.address && typeof businessFormData.address !== 'string') invalidData.push(`address`);

        if (!businessFormData.interests) missingData.push(`interests`);
        else if (businessFormData.interests && typeof businessFormData.interests !== 'string') invalidData.push(`interests`);

        if (!businessFormData.contact_number) missingData.push(`Contact number`);
        else if (businessFormData.contact_number && isNaN(businessFormData.contact_number)) invalidData.push(`Contact number`);

        if (!businessFormData.address) missingData.push(`address`);
        else if (businessFormData.address && typeof businessFormData.address !== 'string') invalidData.push(`address`);

        if (!businessFormData.website) missingData.push(`website`);
        else if (businessFormData.website && !String(businessFormData.website).match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi)) invalidData.push(`website`);

        if (!businessFormData.description) missingData.push(`description`);
        else if (businessFormData.description && typeof businessFormData.description !== 'string') invalidData.push(`description`);

        // Validating item_gallery images
        const itemImagesFileInput = businessForm.querySelector(`input#gallery`);

        if (!formDataID && !(itemImagesFileInput && itemImagesFileInput.files.length)) {
            isDataPerfect = false;
            showToast.error({ message: `Please provide location image(s) ` });
        }
        else {
            try {
                for (let i = itemImagesFileInput.files.length - 1; i >= 0; i--) {
                    const itemImageFile = itemImagesFileInput.files[i];

                    if (itemImageFile) {
                        if (!isAcceptableImageFormat(itemImageFile.type)) {
                            isDataPerfect = false;
                            showToast.error({ message: `Invalid file format for item images(s)` });

                            break;
                        }
                    }
                }
            }
            catch (err) {
                console.log(err)
                isDataPerfect = false;
                showToast.error({ message: `Error validating item images` });
            }
        }

    
        // Get saved data from sessionStorage
        const emailAddress = sessionStorage.getItem('email_address');

        console.log(emailAddress)

        if (!(emailAddress && emailAddress.trim())) missingData.push(`email address`)
        if (emailAddress && !isValidEmailAddress(emailAddress)) invalidData.push(`email address`);

        if (!isDataPerfect || missingData.length || invalidData.length) {

            if (missingData.length) {
                showToast.error({
                    message: `Missing Data: ${`<br> - ` + missingData.join(`<br> - `)}`
                });
            }

            if (invalidData.length) {
                showToast.error({
                    message: `Invalid Data: ${`<br> - ` + invalidData.join(`<br> - `)}`
                });
            }

            return;

        }

        const businessFormDataObj = {
            ...businessFormData,
            email_address: emailAddress
        }

          // Removing content-type header -> https://stackoverflow.com/questions/49692745/express-using-multer-error-multipart-boundary-not-found-request-sent-by-pos
          delete fetchReqConfig.headers['Content-Type'];

        if (await confirmUserAction()) {

            const loaderID = loader.show(`LOADING ...`);

            const data = new FormData;

            if(itemImagesFileInput && itemImagesFileInput.files.length){
                for(let i=0; i < itemImagesFileInput.files.length; i++){

                    data.append(`gallery`, itemImagesFileInput.files[i]);
                }
            }


            for(let key in businessFormDataObj){
                if(Array.isArray(businessFormDataObj[ key ])){
                    data.append(key, JSON.stringify(businessFormDataObj[ key ]));
                }
                else{
                    data.append(key, businessFormDataObj[ key ]);
                }
            }


            if (formDataID) {
               
                const mediaToBeDeleted = mediaDeleteBtns.getMediaToBeDeletedObj();

                const numberOfItemImages = businessForm.querySelectorAll(`.item-image`).length;
                    

                if(!itemImagesFileInput.files.length && mediaToBeDeleted.gallery
                 && (mediaToBeDeleted.gallery.length === numberOfItemImages)){

                    return showToast.error({ message: `Please add new item images if all old images are to be deleted` });
                }

                
                for(let key in mediaToBeDeleted){
                    data.append(`media_to_delete[${ key }]`, mediaToBeDeleted[ key ]);
                }


                fetch(`/business-form/${ formDataID }`, {
                    ...fetchReqConfig,
                    method: `PUT`,
                    body: data
                })
                .then(handleFetchErrors)
                .then(standardFetchResponses.success)
                .catch(standardFetchResponses.error);


            } else {
     
                fetch(`/business-form/new`, {
                    ...fetchReqConfig,
                    body: data
                })
                    .then(handleFetchErrors)
                    .then(standardFetchResponses.success)
                    .catch(standardFetchResponses.error);

            }

        }

    })

}