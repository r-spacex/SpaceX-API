<div align="center">

![Imgur](http://i.imgur.com/eL73Iit.png)

![Imgur](https://i.imgur.com/EvNzjRY.jpg)

# SpaceX Data REST API

[![Travis](https://img.shields.io/travis/r-spacex/SpaceX-API.svg?style=flat-square)](https://travis-ci.org/r-spacex/SpaceX-API)
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
GET https://api.spacexdata.com/v2/launches/latest
```

```json
{
  "flight_number": 51,
  "launch_year": "2017",
  "launch_date_unix": 1513352160,
  "launch_date_utc": "2017-12-15T15:36:00Z",
  "launch_date_local": "2017-12-15T10:36:00-05:00",
  "rocket": {
    "rocket_id": "falcon9",
    "rocket_name": "Falcon 9",
    "rocket_type": "FT",
    "first_stage": {
      "cores": [
        {
          "core_serial": "B1035",
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
          "payload_id": "SpaceX CRS-13",
          "cap_serial": "C108",
          "reused": true,
          "customers": [
            "NASA (CRS)"
          ],
          "payload_type": "Dragon 1.1",
          "payload_mass_kg": 2205,
          "payload_mass_lbs": 4861.2,
          "orbit": "ISS",
          "mass_returned_kg": null,
          "mass_returned_lbs": null,
          "flight_time_sec": null,
          "cargo_manifest": "https://www.nasa.gov/sites/default/files/atoms/files/spacex_crs-13_mision_overview_low_res8.pdf"
        }
      ]
    }
  },
  "telemetry": {
    "flight_club": "https://www.flightclub.io/results/?code=CR13"
  },
  "reuse": {
    "core": true,
    "side_core1": false,
    "side_core2": false,
    "fairings": false,
    "capsule": true
  },
  "launch_site": {
    "site_id": "ccafs_slc_40",
    "site_name": "CCAFS SLC 40",
    "site_name_long": "Cape Canaveral Air Force Station Space Launch Complex 40"
  },
  "launch_success": true,
  "links": {
    "mission_patch": "https://i.imgur.com/YxaiZqy.png",
    "reddit_campaign": "https://www.reddit.com/r/spacex/comments/7bxg5a/crs13_launch_campaign_thread/",
    "reddit_launch": "https://www.reddit.com/r/spacex/comments/7j725w/rspacex_crs13_official_launch_discussion_updates/",
    "reddit_recovery": null,
    "reddit_media": "https://www.reddit.com/r/spacex/comments/7j6oxz/rspacex_crs13_media_thread_videos_images_gifs/",
    "presskit": "http://www.spacex.com/sites/spacex/files/crs13presskit12_11.pdf",
    "article_link": "https://spaceflightnow.com/2017/12/15/spacexs-50th-falcon-rocket-launch-kicks-off-station-resupply-mission/",
    "video_link": "https://www.youtube.com/watch?v=OPHbqY9LHCs"
  },
  "details": "Will reuse the Dragon capsule previously flown on CRS-6 and will reuse the booster from CRS-11."
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
* Latest database dump included under [releases](https://github.com/r-spacex/SpaceX-API/releases)
* API deployed on a [Heroku](https://www.heroku.com/) pipeline with pull request, staging and production servers

## FAQ's
* API has a per user rate limit of 2500 requests per 15 minutes or 10000 requests per hour
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me
* For any other questions or concerns, just shoot me an email
