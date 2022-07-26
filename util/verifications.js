const commonRegex = require(`./commonRegex`);

exports.isValidEmailAddress = (emailAddress=null) => {
    return (emailAddress
     && String(emailAddress)
     && String(emailAddress).match(commonRegex.emailAddressRegex));
}