const Sib = require('sib-api-v3-sdk')

const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = `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`;


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