#!/usr/bin/env node
var path = require('path');
var process = require('process');
var fs = require('fs');
// print process.argv
var env = 'dev'
process.argv.forEach(function (val, index, array) {
    if (val.indexOf('env') > -1) {
        let envParts = val.split("=");
        if (envParts.length > 1) {
            env = envParts[1]
        }
    }
});
var envFile = path.join('./', 'env', 'environment.' + env + '.json');
var content = fs.readFileSync(envFile);
console.log('Writing Env: ' + env + ' variables to file.')
const contentToWrite = "export const environment = " + content.toString();

var wstream = fs.writeFile('./src/environments/environment.ts', contentToWrite, { flag: 'w' }, (err) => {
    if (err) {
        console.log('ERROR: ' + err.message)
    } else {
        console.log('SUCCESS: Environment set to: ' + env);
    }
});
