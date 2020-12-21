# 1090-to-generic-data-store
 Poll dump1090 endpoint and store in generic-data-store


Store [dump1090]() data into a [generic-data-store](https://github.com/Slord6/generic-data-store) database


## Prerequisites

- npm
- node

## Usage

Update the `dump1090Endpoint` and `genericDataStoreUrl` variables to point at your own services. Optionally, change the `pollRateMs` variable to change how often data is queried.

Then, in the root directory run:
- `npm i`
- `node logPlaneData.js`