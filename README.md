<div align="center">

![Imgur](http://i.imgur.com/eL73Iit.png)

![Imgur](https://i.imgur.com/x8fRykW.jpg)

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
    "flight_number": 47,
    "launch_year": "2017",
    "launch_date_utc": "2017-09-07T13:50:00Z",
    "launch_date_local": "2017-09-07T09:50:00-04:00",
    "rocket": {
      "rocket_id": "falcon9",
      "rocket_name": "Falcon 9",
      "rocket_type": "FT"
    },
    "telemetry": {
      "flight_club": "https://www.flightclub.io/results/?id=5f90f4b8-3e5f-41ef-aa1a-4551254b2589&code=OTV5"
    },
    "core_serial": "B1040",
    "cap_serial": null,
    "launch_site": {
      "site_id": "ksc_lc_39a",
      "site_name": "KSC LC 39A"
    },
    "payloads": [
      {
        "payload_id": "X-37B OTV-5",
        "customers": [
          "USAF"
        ],
        "payload_type": "Satelite",
        "payload_mass_kg": 4990,
        "payload_mass_lbs": 11001,
        "orbit": "LEO"
      }
    ],
    "launch_success": true,
    "reused": false,
    "land_success": true,
    "landing_type": "RTLS",
    "landing_vehicle": "LZ-1",
    "links": {
      "mission_patch": "https://i.imgur.com/574MjdD.png",
      "reddit_campaign": "https://www.reddit.com/r/spacex/comments/6u6q1t/x37b_otv5_launch_campaign_thread/",
      "reddit_launch": "https://www.reddit.com/r/spacex/comments/6ygmf1/rspacex_x37b_otv5_official_launch_discussion/",
      "reddit_recovery": null,
      "reddit_media": "https://www.reddit.com/r/spacex/comments/6yih4g/rspacex_x37b_otv5_media_thread_videos_images_gifs/",
      "presskit": "http://forum.nasaspaceflight.com/index.php?action=dlattach;topic=43585.0;attach=1446501;sess=0",
      "article_link": "https://en.wikipedia.org/wiki/Boeing_X-37",
      "video_link": "https://www.youtube.com/watch?v=9M6Zvi-fFv4"
    },
    "details": "Notable because Boeing is the primary contractor of the X-37B, which has until now been launched by ULA, a SpaceX competitor and Boeing partnership. Second flight of the Falcon 9 Block 4 upgrade."
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
