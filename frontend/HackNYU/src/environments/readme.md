environment.ts file is generated with a script

To change envrironment variables for the app create an environment file in the /env folder.
See /env/environment.sample.json for example.
Then run `node ./scripts/replace.env --env={environment}` in the root folder 
{environment}: must match the suffix for an environment file in /env folder 
eg. --env=dev would copy all the variables in the file `env/environment.dev.json` to environment.ts