# vizrt-command-sender
Sending Commands To Vizrt's Viz Engine with Open Source Tools


# Instructions

You will need nodeJS and bower installed

Clone the repo
cd [project folder]

## To run in dev:

In one terminal window:

cd <<client folder>>
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
