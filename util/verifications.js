const commonRegex = require(`./commonRegex`);

exports.isValidEmailAddress = (emailAddress=null) => {
    return (emailAddress
     && String(emailAddress)
     && String(emailAddress).match(commonRegex.emailAddressRegex));
}

exports.JSONResponseStatus = (statusText=null) => {
    if(typeof statusText !== `string`) return new Error(`Invalid data-type of status-text`);

    const lowerCasedStatusText = statusText.trim().toLowerCase();

    const isSuccess = Boolean(lowerCasedStatusText === `success`),
        isFailure = Boolean(lowerCasedStatusText === `fail`),
        isError = Boolean(lowerCasedStatusText === `error`);

    return { isSuccess, isFailure, isError }
}


exports.isAcceptableImageFormat = (format=null) => {
    if(format && (typeof format === `string`) && format.trim()){
        const acceptableFormatsRegex = /(jpe?g|png)$/ig;

        return Boolean(format.match(acceptableFormatsRegex));
    }
}