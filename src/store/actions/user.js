import UserService from '../../services/UserService';
import { setUserToken, getErrors } from "./actionCreators";
import { config } from "../../config";

const {
    clientID, callbackURL
}  = config;

export const login = (history) => dispatch => {
  const reqAuth = `https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature&client_id=${clientID}&state=a39fh23hnf23&redirect_uri=${callbackURL}`
    window.location = reqAuth;
}

export const getToken = (code) => dispatch => {
    UserService.getToken(code).then(res => {
        console.log(res.data)
        if(res.data.status ==='success') {
            // dispatch(setUserToken(res.data))
        } else {
            // dispatch(getErrors({
            //     tokenError: res.data
            // }))
        }
    }).catch(error => {
        if (error.response) {
            dispatch(getErrors({
                tokenError: error.response.data
            }));
        }
    })
}