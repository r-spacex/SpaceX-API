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
GET https://api.spacexdata.com/v2/launches/latest?pretty
```

```json
{
  "flight_number": 56,
  "launch_year": "2018",
  "launch_date_unix": 1519309020,
  "launch_date_utc": "2018-02-22T14:17:00Z",
  "launch_date_local": "2018-02-22T06:17:00-08:00",
  "rocket": {
    "rocket_id": "falcon9",
    "rocket_name": "Falcon 9",
    "rocket_type": "FT",
    "first_stage": {
      "cores": [
        {
          "core_serial": "B1038",
          "flight": 2,
          "block": 3,
          "reused": true,
          "land_success": null,
          "landing_type": null,
          "landing_vehicle": null
        }
      ]
    },
    "second_stage": {
      "payloads": [
        {
          "payload_id": "Paz",
          "reused": false,
          "customers": [
            "HisdeSAT"
          ],
          "payload_type": "Satellite",
          "payload_mass_kg": 1350,
          "payload_mass_lbs": 2976.2,
          "orbit": "LEO"
        },
        {
          "payload_id": "Microsat-2a, -2b",
          "reused": false,
          "customers": [
            "SpaceX"
          ],
          "payload_type": "Satellite",
          "payload_mass_kg": 800,
          "payload_mass_lbs": 1763.7,
          "orbit": "LEO"
        }
      ]
    }
  },
  "telemetry": {
    "flight_club": "https://www.flightclub.io/result?code=PAZ1"
  },
  "reuse": {
    "core": true,
    "side_core1": false,
    "side_core2": false,
    "fairings": false,
    "capsule": false
  },
  "launch_site": {
    "site_id": "vafb_slc_4e",
    "site_name": "VAFB SLC 4E",
    "site_name_long": "Vandenberg Air Force Base Space Launch Complex 4E"
  },
  "launch_success": true,
  "links": {
    "mission_patch": "https://i.imgur.com/6iUJpn4.png",
    "reddit_campaign": "https://www.reddit.com/r/spacex/comments/7qnflk/paz_microsat2a_2b_launch_campaign_thread/",
    "reddit_launch": "https://www.reddit.com/r/spacex/comments/7y0grt/rspacex_paz_official_launch_discussion_updates/",
    "reddit_recovery": null,
    "reddit_media": "https://www.reddit.com/r/spacex/comments/7zdvop/rspacex_paz_media_thread_videos_images_gifs/",
    "presskit": "http://www.spacex.com/sites/spacex/files/paz_press_kit_2.21.pdf",
    "article_link": "https://spaceflightnow.com/2018/02/22/recycled-spacex-rocket-boosts-paz-radar-satellite-first-starlink-testbeds-into-orbit/",
    "video_link": "https://www.youtube.com/watch?v=-p-PToD2URA"
  },
  "details": "First launch attempt on the 21st scrubbed due to upper level winds. Will also carry two SpaceX test satellites for the upcoming Starlink constellation."
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
* All json responses can be pretty printed with the optional `pretty` querystring
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me
* For any other questions or concerns, just shoot me an email
