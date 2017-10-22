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
    "flight_number": 49,
    "launch_year": "2017",
    "launch_date_unix": 1507762380,
    "launch_date_utc": "2017-10-11T22:53:00Z",
    "launch_date_local": "2017-10-11T18:53:00-04:00",
    "rocket": {
      "rocket_id": "falcon9",
      "rocket_name": "Falcon 9",
      "rocket_type": "FT"
    },
    "telemetry": {
      "flight_club": "https://www.flightclub.io/results/?code=SS11"
    },
    "core_serial": "B1031",
    "cap_serial": null,
    "launch_site": {
      "site_id": "ksc_lc_39a",
      "site_name": "KSC LC 39A"
    },
    "payloads": [
      {
        "payload_id": "SES-11",
        "customers": [
          "SES"
        ],
        "payload_type": "Satellite",
        "payload_mass_kg": 2700,
        "payload_mass_lbs": 5952,
        "orbit": "GTO"
      },
      {
        "payload_id": "EchoStar 105",
        "customers": [
          "EchoStar"
        ],
        "payload_type": "Satellite",
        "payload_mass_kg": 2700,
        "payload_mass_lbs": 5952,
        "orbit": "GTO"
      }
    ],
    "launch_success": true,
    "reused": true,
    "land_success": true,
    "landing_type": "ASDS",
    "landing_vehicle": "OCISLY",
    "links": {
      "mission_patch": "https://i.imgur.com/03gonKW.png",
      "reddit_campaign": "https://www.reddit.com/r/spacex/comments/6yvn64/ses11echostar_105_launch_campaign_thread/",
      "reddit_launch": "https://www.reddit.com/r/spacex/comments/75bw7p/ses11echostar105_official_launch_discussions/",
      "reddit_recovery": "https://www.reddit.com/r/spacex/comments/76fqz1/b10312_recovery_thread/",
      "reddit_media": "https://www.reddit.com/r/spacex/comments/75pgu5/rspacex_ses11_media_thread_videos_images_gifs/",
      "presskit": "http://www.spacex.com/sites/spacex/files/echostar105ses11presskit.pdf",
      "article_link": "https://spaceflightnow.com/2017/10/12/video-falcon-9-rocket-lifts-off-with-joint-satellite-for-ses-echostar/",
      "video_link": "https://www.youtube.com/watch?v=iv1zeGSvhIw"
    },
    "details": "Nineteenth comsat to GTO, also the fourth satellite launched for SES and second for Echostar. Third time a first stage booster will be reused."
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
