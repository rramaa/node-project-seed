"use strict";
var spawn = require('child_process').spawn,
    apiService = {};

apiService.get = function(requestedUrl) {
    return new Promise(function(resolve, reject) {
        console.log("Fetching " + requestedUrl);
        var tempData = "";
        var curl = spawn('curl', [requestedUrl]);
        curl.stdout.on('data', function(data) {
            tempData += data;
        });
        curl.stdout.on('end', function(data) {
            resolve(tempData);
        })
        curl.on('exit', function(code) {
            if (code != 0) {
                reject(code);
            }
        });
    })
}

module.exports = apiService;
