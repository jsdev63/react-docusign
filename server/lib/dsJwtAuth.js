'use strict';
let DsJwtAuth = {};
module.exports = DsJwtAuth;  

const moment = require('moment')
    , path = require('path')
    , docusign = require('docusign-esign')
    , config = require('../config.js');

const tokenReplaceMin = 10; 
let tokenExpirationTimestamp = null;  
// Exported variables
DsJwtAuth.accessToken = null; 
DsJwtAuth.accountId = null; 
DsJwtAuth.accountName = null;
DsJwtAuth.basePath = null; 
DsJwtAuth.userName = null;
DsJwtAuth.userEmail = null;


DsJwtAuth.checkToken = async function _checkToken() {
  let noToken = !DsJwtAuth.accessToken || !tokenExpirationTimestamp, 
    now = moment(),
    needToken = noToken || tokenExpirationTimestamp.add(tokenReplaceMin, 'm').isBefore(now);

  if (noToken) {console.log('checkToken: Starting up--need an accessToken')}
  if (needToken && !noToken) {console.log('checkToken: Replacing old accessToken')}

  if (needToken) {
    let results = await DsJwtAuth.getToken();

    DsJwtAuth.accessToken = results.accessToken;
    tokenExpirationTimestamp = results.tokenExpirationTimestamp;
    console.log ("Obtained an access token. Continuing...");

    if (!DsJwtAuth.accountId) {
      await DsJwtAuth.getUserInfo()
    }
  }
}

DsJwtAuth.getToken = async function _getToken() {
  const jwtLifeSec = 10 * 60, 
        scopes = "signature",
        dsApi = new docusign.ApiClient();

   dsApi.setOAuthBasePath(config.authServer);
    const results = await dsApi.requestJWTUserToken(
        config.clientId,
        config.impersonatedUserGuid, scopes, config.privateKey,
        jwtLifeSec
    );

  const expiresAt = moment().add(results.body.expires_in, 's');
  return {accessToken: results.body.access_token, tokenExpirationTimestamp: expiresAt};
}

DsJwtAuth.getUserInfo = async function _getUserInfo(){
  const dsApi = new docusign.ApiClient()
      , targetAccountId = config.targetAccountId
      , baseUriSuffix = '/restapi';

  dsApi.setOAuthBasePath(config.authServer);
  const results = await dsApi.getUserInfo(DsJwtAuth.accessToken);

  let accountInfo;
  if (targetAccountId === "false" || targetAccountId === "FALSE" ||
      targetAccountId === false) {
    // find the default account
    accountInfo = results.accounts.find(account =>
        account.isDefault === "true");
  } else {
    // find the matching account
    accountInfo = results.accounts.find(account => account.accountId == targetAccountId);
  }

  if (typeof accountInfo === 'undefined') {
    let err = new Error (`Target account ${targetAccountId} not found!`);
    throw err;
  }

  ({accountId: DsJwtAuth.accountId,
    accountName: DsJwtAuth.accountName,
    baseUri: DsJwtAuth.basePath} = accountInfo);
  DsJwtAuth.basePath += baseUriSuffix;
}

DsJwtAuth.clearToken = function(){ // "logout" function
  tokenExpirationTimestamp = false;
  DsJwtAuth.accessToken = false;
};
