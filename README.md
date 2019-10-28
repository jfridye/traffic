This app scrapes Google Maps traffic data for a set of origins/destinations and stores them to local disk.

## Prerequisites
* node, npm

## Setup
1. Clone
2. Install Dependencies
3. Add /data to root (this is where traffic data will be persisted)
4. Rename locations-ex.js to locations.js, and replace dummy data
5. Run npm start
6. Open http://localhost:3000/<month-day>/<work-location> (e.g., /10-1/downtown)

## Config
* scraping interval - see index.js for cron config. default is 15m
* locations.js - set of origins and destinations, coupled with Google Maps URLs