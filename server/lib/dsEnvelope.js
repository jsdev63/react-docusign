
'use strict';
let DsEnvelope = {};
module.exports = DsEnvelope;

const moment = require('moment'), 
    path = require('path'),
    docusign = require('docusign-esign'),
    dsJwtAuth = require('./dsJwtAuth'),
    config = require('../config.js');

function makeEnvelope(args){
    let env = new docusign.EnvelopeDefinition();
    env.templateId = config.templateId;

    let signer1 = docusign.TemplateRole.constructFromObject({
        email: args.email,
        name: args.firstName + " " + args.lastName,
        roleName: 'Contact',
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
    env.status = "sent";

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
        let results = await envelopesApi.createEnvelope(
            dsJwtAuth.accountId, {
                envelopeDefinition: envelope
            }
        );
        return results;
    } catch (err) {
        return {status: 'Bad Request'}
    }
}