<div align="center">

![Imgur](http://i.imgur.com/eL73Iit.png)

![Imgur](https://i.imgur.com/ZTCR8rg.jpg)

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
GET https://api.spacexdata.com/v2/launches/latest?pretty
```

```json
{
  "flight_number": 57,
  "launch_year": "2018",
  "launch_date_unix": 1520314380,
  "launch_date_utc": "2018-03-06T05:33:00Z",
  "launch_date_local": "2018-03-06T00:33:00-05:00",
  "rocket": {
    "rocket_id": "falcon9",
    "rocket_name": "Falcon 9",
    "rocket_type": "FT",
    "first_stage": {
      "cores": [
        {
          "core_serial": "B1044",
          "flight": 1,
          "block": 4,
          "reused": false,
          "land_success": null,
          "landing_type": null,
          "landing_vehicle": null
        }
      ]
    },
    "second_stage": {
      "payloads": [
        {
          "payload_id": "Hispasat 30W-6",
          "reused": false,
          "customers": [
            "Hispasat"
          ],
          "payload_type": "Satellite",
          "payload_mass_kg": 6092,
          "payload_mass_lbs": 13430.6,
          "orbit": "GTO"
        }
      ]
    }
  },
  "telemetry": {
    "flight_club": null
  },
  "reuse": {
    "core": false,
    "side_core1": false,
    "side_core2": false,
    "fairings": false,
    "capsule": false
  },
  "launch_site": {
    "site_id": "ccafs_slc_40",
    "site_name": "CCAFS SLC 40",
    "site_name_long": "Cape Canaveral Air Force Station Space Launch Complex 40"
  },
  "launch_success": true,
  "links": {
    "mission_patch": "https://i.imgur.com/CLrl3eg.png",
    "reddit_campaign": "https://www.reddit.com/r/spacex/comments/7r5pyn/hispasat_30w6_launch_campaign_thread/",
    "reddit_launch": "https://www.reddit.com/r/spacex/comments/7r5pyn/hispasat_30w6_launch_campaign_thread/",
    "reddit_recovery": null,
    "reddit_media": "https://www.reddit.com/r/spacex/comments/825asx/rspacex_hispasat_30w6_media_thread_videos_images/",
    "presskit": "http://www.spacex.com/sites/spacex/files/hispasat30w6_presskit.pdf",
    "article_link": null,
    "video_link": "https://www.youtube.com/watch?v=Kpfrp-GMKKM"
  },
  "details": "Launched with landing legs and titanium grid fins. Did not attempt a landing due to 'unfavorable weather conditions in the recovery area'."
}
```

## Contributions
See the [Contribution](https://github.com/r-spacex/SpaceX-API/blob/master/CONTRIBUTING.md) guide for detailed steps

## Local Development
Local development info can be found [here](https://github.com/r-spacex/SpaceX-API/wiki/Local-Development)

## Technical Details
* API is using [Node.js](https://nodejs.org/en/) with the [Koa](http://koajs.com/) framework
* All data stored in a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 3 node replica set cluster
* Latest database mongodump available [here](https://drive.google.com/drive/folders/0B2DdgKR4GR4xdk1sRGowcUZXeE0?usp=sharing)
* Uses [Redis](https://redis.io/) for route caching
* Uses [Jest](https://facebook.github.io/jest/) and [Supertest](https://github.com/visionmedia/supertest) for unit/integration testing
* Uses [Travis CI](https://travis-ci.org/) for continuous integration/delivery
* API deployed on a [Heroku](https://www.heroku.com/) pipeline with pull request, staging and production servers

## FAQ's
* All json responses can be pretty printed with the optional `pretty` querystring
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me
* For any other questions or concerns, just shoot me an email
