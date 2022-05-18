import axios from 'axios'
const project = require('../../../project.config')

import {
    APPLICATION_JSON,
    BEARER,
    JSON,
    PAGE_STATUS_200,
    PAGE_STATUS_500,
    DELIMITER,
    HTTPS,
    HTTP, PATH_METHOD_AUTH_AUTHENTICATE
} from '../../properties/properties'
import setAuthorizationToken from "../../utils/setAuthorizationToken";

export function apiSignUp (hostname, port, pathMethod, method, body = {data: {}}) {

    var url = HTTP + hostname + DELIMITER + port + pathMethod;

    const options = {
        method: method,
        url: url,
        headers: {
            "Access-Control-Allow-Credentials" : "true",
            "Access-Control-Allow-Origin" : url,
            "Content-Type" : "application/json"
        },
        responseType: JSON
    }
    if (body.data) {
        options.data = body.data
    }
    return axios(options)
        .then(response => {
            console.error('axiosApi response 0 = ', response);
            return { 'httpStatus': response.status, 'result': response.data }
        })
        .catch(error => {
            console.error('axiosApi error 1 = ', error);
            throw error;
        })
}

export function apiCall (hostname, port, method, body) {

    var url = HTTP + hostname + DELIMITER + port + PATH_METHOD_AUTH_AUTHENTICATE + "?emailAddress=" + body.data.user.emailAddress + "&password=" + body.data.user.password;

    const options = {
        method: method,
        url: url,
        headers: {
            "Access-Control-Allow-Credentials" : "true",
            "Access-Control-Allow-Origin" : url,
            "Content-Type" : "application/json"
        },
        responseType: JSON
    }
    if (body.data) {
        options.data = body.data.user
    }
    return axios(options)
        .then(response => {
            console.error('axiosApi response 0 = ', response);
            return { 'httpStatus': response.status, 'result': response.data }
        })
        .catch(error => {
            console.error('axiosApi error 1 = ', error);
            throw error;
        })
}

export function apiCallForBasicAuth (hostname, port, pathMethod, method, body = {data: {}}, credentials = {emailAddress: null, password: null}) {
    if (project.env !== 'development') {
        hostname = window.location.hostname
    }

    var url = HTTP + hostname + DELIMITER + port + pathMethod;

    const options = {
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/json',
        },
        responseType: JSON
    }
    if (body) {
        options.data = body.data
    }
    const token = localStorage.jwtToken;
    setAuthorizationToken(token);
    return axios(options)
        .then(response => {
            return { 'httpStatus': PAGE_STATUS_200, 'result': response.data }
        })
        .catch(error => {
            console.error('axiosApi error 2 = ', error);
            return  { 'httpStatus': PAGE_STATUS_500}
        })
}

