<div align="center">

![Imgur](http://i.imgur.com/eL73Iit.png)

![Imgur](http://i.imgur.com/neCK8dp.jpg)

# SpaceX Data REST API

[![Travis](https://img.shields.io/travis/r-spacex/SpaceX-API.svg?style=flat-square)](https://travis-ci.org/r-spacex/SpaceX-API)
[![Codecov](https://img.shields.io/codecov/c/github/r-spacex/SpaceX-API.svg?style=flat-square)](https://codecov.io/gh/r-spacex/SpaceX-API)
[![Docker Build Statu](https://img.shields.io/docker/build/jakewmeyer/spacex-api.svg?style=flat-square)](https://hub.docker.com/r/jakewmeyer/spacex-api/)
[![GitHub release](https://img.shields.io/github/release/r-spacex/SpaceX-API.svg?style=flat-square)]()
[![Interface](https://img.shields.io/badge/interface-REST-brightgreen.svg?style=flat-square)]()

### Open Source REST API for data regarding company info, vehicles, launch sites, and launch data.
<br></br>

</div>

## Documentation
See the [Wiki](https://github.com/r-spacex/SpaceX-API/wiki) for full API Documentation

## Usage / Endpoints

**Example Response**

```http
GET https://api.spacexdata.com/v1/launches/latest
```

```json
{
    "flight_number": 46,
    "launch_year": "2017",
    "launch_date_utc": "2017-08-24T18:50:00Z",
    "launch_date_local": "2017-08-24T11:50:00-07:00",
    "rocket": {
      "rocket_id": "falcon9",
      "rocket_name": "Falcon 9",
      "rocket_type": "FT"
    },
    "telemetry": {
      "flight_club": "https://www.flightclub.io/results/?id=a0f660e3-45e6-4aa5-8460-fa641fe9c227&code=FRM5"
    },
    "core_serial": "B1038",
    "cap_serial": null,
    "launch_site": {
      "site_id": "vafb_slc_4e",
      "site_name": "VAFB SLC 4E"
    },
    "payloads": [
      {
        "payload_id": "FormoSat-5",
        "customers": [
          "NSPO (Taiwan)"
        ],
        "payload_type": "Satelite",
        "payload_mass_kg": 475,
        "payload_mass_lbs": 1047,
        "orbit": "SSO"
      }
    ],
    "launch_success": true,
    "reused": false,
    "land_success": true,
    "landing_type": "ASDS",
    "landing_vehicle": "JRTI",
    "links": {
      "mission_patch": "http://i.imgur.com/xjtPB9z.png",
      "reddit_campaign": "https://www.reddit.com/r/spacex/comments/6o98st",
      "reddit_launch": "https://www.reddit.com/r/spacex/comments/6vihsl/welcome_to_the_rspacex_formosat5_official_launch/",
      "reddit_recovery": null,
      "reddit_media": "https://www.reddit.com/r/spacex/comments/6vhwi1/rspacex_formosat5_media_thread_videos_images_gifs/",
      "presskit": "http://www.spacex.com/sites/spacex/files/formosat5presskit.pdf",
      "article_link": "https://en.wikipedia.org/wiki/FORMOSAT-5",
      "video_link": "https://www.youtube.com/watch?v=J4u3ZN2g_MI"
    },
    "details": "Formosat-5 is an Earth observation satellite of the Taiwanese space agency. The SHERPA space tug by Spaceflight Industries was removed from the cargo manifest of this mission. The satellite has a mass of only 475 kg."
  }
  ```

## Contributions
See the [Contribution](https://github.com/r-spacex/SpaceX-API/blob/master/CONTRIBUTING.md) guide for detailed steps

## Technical Details
* API is using [Node.js](https://nodejs.org/en/) with the [Express.js](https://expressjs.com/) framework
* Uses [Jest](https://facebook.github.io/jest/) and [Supertest](https://github.com/visionmedia/supertest) for unit/integration testing
* Uses [Travis CI](https://travis-ci.org/) for continuous integration/delivery
* All data stored in a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 3 node replica set cluster
* Latest database dump included under [releases](https://github.com/r-spacex/SpaceX-API/releases)
* API deployed on a [Heroku](https://www.heroku.com/) pipeline with pull request, staging and production servers

## FAQ's
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me
* For any other questions or concerns, just shoot me an email
