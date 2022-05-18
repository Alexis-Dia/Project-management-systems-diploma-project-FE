import https from 'https'
import { PAGE_STATUS_200, PAGE_STATUS_500, APPLICATION_JSON, BEARER, ENCODING_UTF8 } from '../../properties/properties'
const project = require('../../../project.config')

export function apiCallForLoggedUser (hostname, port, pathMethod, method, body = {data: {}}) {

  if (project.env !== 'development') {
    hostname = window.location.hostname
  }

  var postData = JSON.stringify(
    body.data
  );

  var options = {
    hostname: hostname,
    port: port,
    path: pathMethod,
    method: method,
    headers: {
      'Content-Type': APPLICATION_JSON,
      'dataType': 'jsonp',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,x-requested-with,Authorization,Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,POST,DELETE,PUT,HEAD',
      'Access-Control-Max-Age': '3600'
    },
    rejectUnauthorized: false,
    agent: false,
    requestCert: false

  };

  return new Promise(function(resolve, reject) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    var req = https.request(options, function(res) {
      res.setEncoding(ENCODING_UTF8);

      res.on('data', function(result) {

        try {
          const obj = JSON.parse(result);
          resolve({ 'httpStatus': PAGE_STATUS_200, 'result': obj });
        }
        catch(error) {
          resolve(resolve({ 'httpStatus': PAGE_STATUS_500 }));
        }

      });

      res.on('end', () => {
      });
    });

    req.on('error', function(err) {
      reject(err);
    });

    if (postData) {
      req.write(postData);
    }

    req.end();
  });
}

//https://github.com/infinitered/apisauce/issues/110
//https://stackoverflow.com/questions/42169906/nodejs-make-https-request-sending-json-data
