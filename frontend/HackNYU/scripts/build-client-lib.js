#!/usr/bin/env node
var path = require('path');
var process = require('process');
var fs = require('fs');
const { exec } = require('child_process');

const envFile = './src/environments/environment.ts';
const content = fs.readFileSync(envFile);
const envVars = JSON.parse(content.toString().split('= ')[1]);
const apiUrl = envVars.backend.apiUrl;
const command = "java -jar ../../../backend/v0_0_1/Allkemy/swagger-codegen-cli.jar generate -i " + apiUrl + "/app/schema -l typescript-angular2 -c ../../../backend/v0_0_1/Allkemy/swagger_codegen_config.json -o ./src/client-lib";
exec(command, (err, stdout, stderr)=>{
    if (err) {
    console.log('Node could not execute the command');
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
})