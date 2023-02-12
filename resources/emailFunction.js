const Sib = require('sib-api-v3-sdk'),
    client = Sib.ApiClient.instance,
    apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.API_KEY;


async function businessFormSubmissonEmail(email = null, name = null, message = null) {

    const tranEmailApi = new Sib.TransactionalEmailsApi(),
        sender = {
            email: 'support@pyt.travel',
            name: 'Bussion Form Submission',
        },
        receivers = [{ email: email }];

    tranEmailApi
        .sendTransacEmail({
            sender,
            to: receivers,
            subject: message,
            htmlContent: "<h2>" + message + "</h2>"
        })
        .then(console.log)
        .catch(console.log);

}
module.exports = businessFormSubmissonEmail;