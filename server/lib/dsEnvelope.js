
let DsEnvelope = {};
module.exports = DsEnvelope;

const docusign = require('docusign-esign'),
    dsJwtAuth = require('./dsJwtAuth'),
    config = require('../config.js');

function makeEnvelope(args){
    let env = new docusign.EnvelopeDefinition();
    env.templateId = config.templateId;

    let signer1 = docusign.TemplateRole.constructFromObject({
        email: args.email,
        name: args.firstName + " " + args.lastName,
        roleName: 'Contact',
        "recipientId": "1",
        "clientUserId": "1234",
        "tabs": {
            "textTabs": [
                {
                    "tabLabel": "firstName",
                    "value": args['firstName']
                },
                {
                    "tabLabel": "lastName",
                    "value": args['lastName']
                },
                {
                    "tabLabel": "dob",
                    "value": args['dob'] || ""
                },
                {
                    "tabLabel": "address",
                    "value": args['address']
                },
                {
                    "tabLabel": "city",
                    "value": args['city']
                },
                {
                    "tabLabel": "state",
                    "value": args['state']
                },
                {
                    "tabLabel": "country",
                    "value": args['country'] || ""
                },
                {
                    "tabLabel": "phone",
                    "value": args['phoneNumber']
                },
                {
                    "tabLabel": "email",
                    "value": args['email']
                }
            ]
        }
    });
    

    env.templateRoles = [signer1];
    env.eventNotification = {
        "url": "https://real-server.herokuapp.com/docusign/callback",
        "includeCertificateOfCompletion": "false",
        "includeDocuments": "true",
        "includeDocumentFields": "true",
        "requireAcknowledgment": "true",
        "envelopeEvents": [{
           "envelopeEventStatusCode": "completed",
        }]
   }
    // "eventNotification": event_notification,
    env.status = "created";

    return env;
}

DsEnvelope.sendEnvelope = async function(params) {
    await dsJwtAuth.checkToken();
    let dsApiClient = new docusign.ApiClient();
    dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + dsJwtAuth.accessToken);
    dsApiClient.setBasePath(dsJwtAuth.basePath);
    let envelopesApi = new docusign.EnvelopesApi(dsApiClient);
    let envelope = makeEnvelope(params)

    try {
        // console.log(docusign)
        // console.log(envelopesApi)
        let results = await envelopesApi.createEnvelope(
            dsJwtAuth.accountId, {
                envelopeDefinition: envelope
            }
        );
        return {...results, msg: 'Envelope was created successfully'};
    } catch (err) {
        return {status: 'error', msg: 'Bad Request, please try it later'}
    }
}

// async function start() {
//     await dsJwtAuth.checkToken();
//     let dsApiClient = new docusign.ApiClient();
//     dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + dsJwtAuth.accessToken);
//     dsApiClient.setBasePath(dsJwtAuth.basePath);
//     let envelopesApi = new docusign.EnvelopesApi(dsApiClient);
//     let connectApi = new docusign.ConnectApi(dsApiClient);
//     console.log(envelopesApi.createEnvelope, connectApi)
// }
// // start()