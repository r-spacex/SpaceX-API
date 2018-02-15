<div align="center">

![Imgur](http://i.imgur.com/eL73Iit.png)

![Imgur](https://i.imgur.com/l0y1El1.jpg)

# SpaceX Data REST API

[![Travis](https://img.shields.io/travis/r-spacex/SpaceX-API.svg?style=flat-square)](https://travis-ci.org/r-spacex/SpaceX-API)
[![Docker Build Statu](https://img.shields.io/docker/build/jakewmeyer/spacex-api.svg?style=flat-square)](https://hub.docker.com/r/jakewmeyer/spacex-api/)
[![GitHub release](https://img.shields.io/github/release/r-spacex/SpaceX-API.svg?style=flat-square)]()
[![Interface](https://img.shields.io/badge/interface-REST-brightgreen.svg?style=flat-square)]()

### Open Source REST API for rocket, core, capsule, pad, and launch data
<br></br>

</div>

## Documentation
See the [Wiki](https://github.com/r-spacex/SpaceX-API/wiki) for full API Documentation

## Usage / Endpoints

**Example Response**

```http
GET https://api.spacexdata.com/v2/launches/latest
```

```json
{
  "flight_number": 55,
  "launch_year": "2018",
  "launch_date_unix": 1517949900,
  "launch_date_utc": "2018-02-06T20:45:00Z",
  "launch_date_local": "2018-02-06T15:45:00-05:00",
  "rocket": {
    "rocket_id": "falconheavy",
    "rocket_name": "Falcon Heavy",
    "rocket_type": "FT",
    "first_stage": {
      "cores": [
        {
          "core_serial": "B1033",
          "flight": 1,
          "block": 3,
          "reused": false,
          "land_success": false,
          "landing_type": "ASDS",
          "landing_vehicle": "OCISLY"
        },
        {
          "core_serial": "B1025",
          "flight": 2,
          "block": 2,
          "reused": true,
          "land_success": true,
          "landing_type": "RTLS",
          "landing_vehicle": "LZ-1"
        },
        {
          "core_serial": "B1023",
          "flight": 2,
          "block": 2,
          "reused": true,
          "land_success": true,
          "landing_type": "RTLS",
          "landing_vehicle": "LZ-1"
        }
      ]
    },
    "second_stage": {
      "payloads": [
        {
          "payload_id": "Tesla Roadster",
          "reused": false,
          "customers": [
            "SpaceX"
          ],
          "payload_type": "Satellite",
          "payload_mass_kg": null,
          "payload_mass_lbs": null,
          "orbit": "Heliocentric orbit"
        }
      ]
    }
  },
  "telemetry": {
    "flight_club": "https://www.flightclub.io/result?code=FHD1"
  },
  "reuse": {
    "core": false,
    "side_core1": true,
    "side_core2": true,
    "fairings": false,
    "capsule": false
  },
  "launch_site": {
    "site_id": "ksc_lc_39a",
    "site_name": "KSC LC 39A",
    "site_name_long": "Kennedy Space Center Historic Launch Complex 39A"
  },
  "launch_success": true,
  "links": {
    "mission_patch": "https://i.imgur.com/24OyAPQ.png",
    "reddit_campaign": "https://www.reddit.com/r/spacex/comments/7hjp03/falcon_heavy_demo_launch_campaign_thread/",
    "reddit_launch": "https://www.reddit.com/r/spacex/comments/7vg63x/rspacex_falcon_heavy_test_flight_official_launch/",
    "reddit_recovery": null,
    "reddit_media": "https://www.reddit.com/r/spacex/comments/7vimtm/rspacex_falcon_heavy_test_flight_media_thread/",
    "presskit": "http://www.spacex.com/sites/spacex/files/falconheavypresskit_v1.pdf",
    "article_link": "https://spaceflightnow.com/2018/02/07/spacex-debuts-worlds-most-powerful-rocket-sends-tesla-toward-the-asteroid-belt/",
    "video_link": "https://www.youtube.com/watch?v=wbSwFU6tY1c"
  },
  "details": "The launch was a success, and the side boosters landed simultaneously at adjacent ground pads. Drone ship landing of the central core failed. Final burn to heliocentric mars-earth orbit was successful after the second stage and payload passed through the Van Allen belts."
}
```

## Contributions
See the [Contribution](https://github.com/r-spacex/SpaceX-API/blob/master/CONTRIBUTING.md) guide for detailed steps

## Local Development
Local development info can be found [here](https://github.com/r-spacex/SpaceX-API/wiki/Local-Development)

## Technical Details
* API is using [Node.js](https://nodejs.org/en/) with the [Express.js](https://expressjs.com/) framework
* Uses [Jest](https://facebook.github.io/jest/) and [Supertest](https://github.com/visionmedia/supertest) for unit/integration testing
* Uses [Travis CI](https://travis-ci.org/) for continuous integration/delivery
* All data stored in a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 3 node replica set cluster
* Latest database mongodump available [here](https://drive.google.com/drive/folders/0B2DdgKR4GR4xdk1sRGowcUZXeE0?usp=sharing)
* API deployed on a [Heroku](https://www.heroku.com/) pipeline with pull request, staging and production servers

## FAQ's
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me
* For any other questions or concerns, just shoot me an email
