# vizrt-command-sender
Sending Commands To Vizrt's Viz Engine with Open Source Tools

Future plans:

Dropdowns populated by sending COMMAND_INFO to Viz Engine for each property and command on the fly
Drag and drop stack items to re-order


# Try it out

You will need NodeJS installed from https://nodejs.org/

Download the dist.zip file from http://www.andyleggett.co.uk/viz/dist.zip

Unzip into a folder and then run node app from the command line in that folder. You'll see "App listening on 11000".

Then point a browser at http://localhost:11000


# Instructions for development

You will need NodeJS and Bower installed

Clone the repo
cd [project folder]

## To run in dev:

In one terminal window:

cd [client folder]
npm install
bower install
grunt server

In another:

cd [server folder]
npm install
grunt

Open browser and navigate to http://localhost:9000 for dev version

## To build (after running in dev mode):

In one terminal window:

cd [client folder]
grunt build

In another:

cd [build folder]
npm install
grunt
node .server/app

Open browser and navigate to http://localhost:7000 for built version
