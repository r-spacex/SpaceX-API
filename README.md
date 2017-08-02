<div align="center">

![Imgur](http://i.imgur.com/eL73Iit.png)

![Imgur](http://i.imgur.com/5RX6fgN.jpg)

# SpaceX Data REST API

[![Travis](https://img.shields.io/travis/r-spacex/SpaceX-API.svg?style=flat-square)](https://travis-ci.org/r-spacex/SpaceX-API)
[![codecov](https://codecov.io/gh/r-spacex/SpaceX-API/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/r-spacex/SpaceX-API)
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
    "flight_number": 44,
    "launch_year": "2017",
    "launch_date_utc": "2017-07-05T23:35:00Z",
    "launch_date_local": "2017-07-05T19:35:00-04:00",
    "rocket": {
      "rocket_id": "falcon9",
      "rocket_name": "Falcon 9",
      "rocket_type": "FT",
      "core_serial": "B1037",
      "cap_serial": null
    },
    "telemetry": {
      "flight_club": null
    },
    "launch_site": {
      "site_id": "ksc_lc_39a",
      "site_name": "KSC LC 39A"
    },
    "payloads": [
      {
        "payload_id": "Intelsat 35e",
        "customers": [
          "Intelsat"
        ],
        "payload_type": "Satelite",
        "payload_mass_kg": 6000.0,
        "payload_mass_lbs": 13227.0,
        "orbit": "GTO"
      }
    ],
    "launch_success": true,
    "reused": false,
    "land_success": false,
    "landing_type": null,
    "landing_vehicle": null,
    "links": {
      "mission_patch": "http://i.imgur.com/8URp6ea.png",
      "reddit_campaign": "https://www.reddit.com/r/spacex/comments/6fw4yy/",
      "reddit_launch": "https://www.reddit.com/r/spacex/comments/6kt2re/",
      "reddit_recovery": null,
      "reddit_media": "https://www.reddit.com/r/spacex/comments/6kt3fe/",
      "presskit": "http://www.spacex.com/sites/spacex/files/intelsat35epresskit.pdf",
      "article_link": "https://en.wikipedia.org/wiki/Intelsat_35e",
      "video_link": "https://www.youtube.com/watch?v=MIHVPCj25Z0"
    },
    "details": "Due to the constraints of sending a heavy satellite (~6,000 kg) to GTO, the rocket will fly in its expendable configuration and the first-stage booster will not be recovered."
  }
  ```

## Contributions
See the [Contribution](https://github.com/r-spacex/SpaceX-API/blob/master/CONTRIBUTING.md) guide for detailed steps

## Technical Details
* API is using [Sinatra](http://www.sinatrarb.com/) web framework
* Uses [Travis CI](https://travis-ci.org/) for testing + deployment
* All data stored in a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 3 node replica set cluster
* Latest database dump included under [releases](https://github.com/r-spacex/SpaceX-API/releases)
* API deployed on a [Heroku](https://www.heroku.com/) pipeline with pull request, staging and production servers
* A [Docker](https://hub.docker.com/r/jakewmeyer/spacex-api/) image is avaiable for local development/deployment
```bash
docker pull jakewmeyer/spacex-api
```

## FAQ's
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me
* For any other questions or concerns, just shoot me an email
