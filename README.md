<div align="center">

![Imgur](http://i.imgur.com/eL73Iit.png)

![Imgur](https://i.imgur.com/HOh86Ex.jpg)

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
    "flight_number": 50,
    "launch_year": "2017",
    "launch_date_utc": "2017-10-30T19:34:00Z",
    "launch_date_local": "2017-10-30T15:34:00-04:00",
    "rocket": {
      "rocket_id": "falcon9",
      "rocket_name": "Falcon 9",
      "rocket_type": "FT"
    },
    "telemetry": {
      "flight_club": null
    },
    "core_serial": "B1042",
    "cap_serial": null,
    "reuse": {
      "core": false,
      "side_core1": false,
      "side_core2": false,
      "fairings": false,
      "capsule": false
    },
    "launch_site": {
      "site_id": "ksc_lc_39a",
      "site_name": "KSC LC 39A"
    },
    "payloads": [
      {
        "payload_id": "KoreaSat 5A",
        "customers": [
          "KT Corporation"
        ],
        "payload_type": "Satellite",
        "payload_mass_kg": 3500,
        "payload_mass_lbs": 7716.2,
        "orbit": "GTO"
      }
    ],
    "launch_success": true,
    "reused": false,
    "land_success": true,
    "landing_type": "ASDS",
    "landing_vehicle": "OCISLY",
    "links": {
      "mission_patch": "http://spacexpatchlist.space/patches/spacex_f9_044_koreasat_5a_graphic.png",
      "reddit_campaign": "https://www.reddit.com/r/spacex/comments/73ttkd/koreasat_5a_launch_campaign_thread/",
      "reddit_launch": "https://www.reddit.com/r/spacex/comments/79iuvb/rspacex_koreasat_5a_official_launch_discussion/",
      "reddit_recovery": null,
      "reddit_media": "https://www.reddit.com/r/spacex/comments/79lmdu/rspacex_koreasat5a_media_thread_videos_images/",
      "presskit": "http://www.spacex.com/sites/spacex/files/koreasat5apresskit.pdf",
      "article_link": null,
      "video_link": "https://www.youtube.com/watch?v=RUjH14vhLxA"
    },
    "details": "KoreaSat 5A is a Ku-band satellite capable of providing communication services from East Africa and Central Asia to southern India, Southeast Asia, the Philippines, Guam, Korea, and Japan. The satellite will be placed in GEO at 113Â° East Longitude, and will provide services ranging from broadband internet to broadcasting services and maritime communications."
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
