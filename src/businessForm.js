import modal from "./resources/modal";
import getFormData from "./resources/getFormData";
import showToast from "../handlers/toastAlerts";
import { isValidEmailAddress } from '../util/verifications';
import Dropzone from "dropzone";

document.onload = function () {
    handlingBusinessForm();
    checkingBusinessEmail();
}();


function checkingBusinessEmail(){

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
    
    businessEmailVerificationForm.addEventListener(`submit`,(e) => {

        e.preventDefault();

        const  businessEmailVerificationFormData = getFormData(businessEmailVerificationForm);

        const missingData = [],
            invalidData = [];

        const emailAddress = businessEmailVerificationFormData.email;

        if (!(emailAddress && emailAddress.trim())) missingData.push(`email address`)
        if ( emailAddress && !isValidEmailAddress(emailAddress)) invalidData.push(`email address`);

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
        
        } else {
            modal.hide(bussinessFormEmailModal)
        }

    })

}


function handlingBusinessForm(){

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
            if(mondayTimeCheckbox.checked) mondayOpenCloseTimeSection.classList.add(`open-timing`);
            else  mondayOpenCloseTimeSection.classList.remove(`open-timing`);
        });

        tuesdayTimeCheckbox.addEventListener(`change`, (e) => {
            if(tuesdayTimeCheckbox.checked) tuesdayOpenCloseTimeSection.classList.add(`open-timing`);
            else  tuesdayOpenCloseTimeSection.classList.remove(`open-timing`);
        });


        wednesdayTimeCheckbox.addEventListener(`change`, (e) => {
            if(wednesdayTimeCheckbox.checked) wednesdayOpenCloseTimeSection.classList.add(`open-timing`);
            else  wednesdayOpenCloseTimeSection.classList.remove(`open-timing`);
        });

        thursdayTimeCheckbox.addEventListener(`change`, (e) => {
            if(thursdayTimeCheckbox.checked) thursdayOpenCloseTimeSection.classList.add(`open-timing`);
            else  thursdayOpenCloseTimeSection.classList.remove(`open-timing`);
        });

        fridayTimeCheckbox.addEventListener(`change`, (e) => {
            if(fridayTimeCheckbox.checked) fridayOpenCloseTimeSection.classList.add(`open-timing`);
            else  fridayOpenCloseTimeSection.classList.remove(`open-timing`);
        });

        saturdayTimeCheckbox.addEventListener(`change`, (e) => {
            if(saturdayTimeCheckbox.checked) saturdayOpenCloseTimeSection.classList.add(`open-timing`);
            else  saturdayOpenCloseTimeSection.classList.remove(`open-timing`);
        });

        sundayTimeCheckbox.addEventListener(`change`, (e) => {
            if(sundayTimeCheckbox.checked) sundayOpenCloseTimeSection.classList.add(`open-timing`);
            else  sundayOpenCloseTimeSection.classList.remove(`open-timing`);
        });
    

    const businessForm = document.querySelector(`#business-form`);

    businessForm.addEventListener(`submit`,(e) => {

        e.preventDefault();
        const businessFormData = getFormData(businessForm);

        const  missingData = [],
            invalidData = [];

        const locationName = businessFormData.location_name;

        if(!locationName) missingData.push(`location name`);
        else if( locationName && typeof locationName !== 'string') invalidData.push(`location name`);

        if(!businessFormData.city) missingData.push(`city`);
        else if( businessFormData.city && typeof businessFormData.city !== 'string') invalidData.push(`city`);

        if(!businessFormData.country) missingData.push(`country`);
        else if(businessFormData.country && typeof businessFormData.country !== 'string') invalidData.push(`country`);

        if(!businessFormData.address) missingData.push(`address`);
        else if( businessFormData.address && typeof businessFormData.address !== 'string') invalidData.push(`address`);

        if(!businessFormData.interests) missingData.push(`interests`);
        else if(businessFormData.interests && typeof businessFormData.interests !== 'string') invalidData.push(`interests`);

        if(!businessFormData.contact_number) missingData.push(`Contact number`);
        else if( businessFormData.contact_number && isNaN(businessFormData.contact_number)) invalidData.push(`Contact number`);

        if(!businessFormData.address) missingData.push(`address`);
        else if(businessFormData.address && typeof businessFormData.address !== 'string') invalidData.push(`address`);

        if(!businessFormData.website) missingData.push(`website`);
        else if(businessFormData.website &&  !String(businessFormData.website).match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi)) invalidData.push(`website`);

        if(!businessFormData.description) missingData.push(`description`);
        else if(businessFormData.description && typeof businessFormData.description !== 'string') invalidData.push(`description`);

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

    })
    
}