<div align="center">

![Imgur](http://i.imgur.com/eL73Iit.png)

![Imgur](http://i.imgur.com/C3hp4vU.jpg)

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
    "flight_number": 45,
    "launch_year": "2017",
    "launch_date_utc": "2017-08-14T16:31:00Z",
    "launch_date_local": "2017-08-14T12:31:00-04:00",
    "rocket": {
      "rocket_id": "falcon9",
      "rocket_name": "Falcon 9",
      "rocket_type": "FT"
    },
    "telemetry": {
      "flight_club": null
    },
    "core_serial": "B1039",
    "cap_serial": "C113",
    "launch_site": {
      "site_id": "ksc_lc_39a",
      "site_name": "KSC LC 39A"
    },
    "payloads": [
      {
        "payload_id": "SpaceX CRS-12",
        "customers": [
          "NASA (CRS)"
        ],
        "payload_type": "Dragon 1.1",
        "payload_mass_kg": 3310,
        "payload_mass_lbs": 7298,
        "orbit": "ISS"
      }
    ],
    "launch_success": true,
    "reused": false,
    "land_success": true,
    "landing_type": "RTLS",
    "landing_vehicle": "LZ-1",
    "links": {
      "mission_patch": "http://spacexpatchlist.space/images/thumbs/spacex_f9_039_crs_12.png",
      "reddit_campaign": "https://www.reddit.com/r/spacex/comments/6mrga2/crs12_launch_campaign_thread/",
      "reddit_launch": "https://www.reddit.com/r/spacex/comments/6tfcio/welcome_to_the_rspacex_crs12_official_launch/",
      "reddit_recovery": null,
      "reddit_media": "https://www.reddit.com/r/spacex/comments/6th2nf/rspacex_crs12_media_thread_videos_images_gifs/",
      "presskit": "http://www.spacex.com/sites/spacex/files/crs12presskit.pdf",
      "article_link": null,
      "video_link": "https://www.youtube.com/watch?v=vLxWsYx8dbo"
    },
    "details": "Dragon is expected to carry 2,349 kg (5,179 lb) of pressurized mass and 961 kg (2,119 lb) unpressurized. The external payload manifested for this flight is the CREAM cosmic-ray detector. First flight of the Falcon 9 Block 4 upgrade. Last flight of a newly-built Dragon capsule; further missions will use refurbished spacecraft."
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
