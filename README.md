<div align="center">

![Imgur](https://i.imgur.com/cXxsJQX.jpg)

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
   "flight_number":59,
   "launch_year":"2018",
   "launch_date_unix":1522701041,
   "launch_date_utc":"2018-04-02T20:30:41Z",
   "launch_date_local":"2018-04-02T16:30:41-04:00",
   "rocket":{
      "rocket_id":"falcon9",
      "rocket_name":"Falcon 9",
      "rocket_type":"FT",
      "first_stage":{
         "cores":[
            {
               "core_serial":"B1039",
               "flight":2,
               "block":4,
               "reused":true,
               "land_success":null,
               "landing_type":null,
               "landing_vehicle":null
            }
         ]
      },
      "second_stage":{
         "payloads":[
            {
               "payload_id":"SpaceX CRS-14",
               "cap_serial":"C110",
               "reused":true,
               "customers":[
                  "NASA (CRS)"
               ],
               "payload_type":"Dragon 1.1",
               "payload_mass_kg":2760,
               "payload_mass_lbs":6084.7,
               "orbit":"ISS",
               "mass_returned_kg":null,
               "mass_returned_lbs":null,
               "flight_time_sec":null,
               "cargo_manifest":"https://www.nasa.gov/sites/default/files/atoms/files/spacex_crs-14_mision_overview_high_res.pdf"
            }
         ]
      }
   },
   "telemetry":{
      "flight_club":"https://www.flightclub.io/results/?code=CR14"
   },
   "reuse":{
      "core":true,
      "side_core1":false,
      "side_core2":false,
      "fairings":false,
      "capsule":true
   },
   "launch_site":{
      "site_id":"ccafs_slc_40",
      "site_name":"CCAFS SLC 40",
      "site_name_long":"Cape Canaveral Air Force Station Space Launch Complex 40"
   },
   "launch_success":true,
   "links":{
      "mission_patch":"https://i.imgur.com/eHxbiG3.png",
      "reddit_campaign":"https://www.reddit.com/r/spacex/comments/82op7a/crs14_launch_campaign_thread/",
      "reddit_launch":"https://www.reddit.com/r/spacex/comments/88s8a7/rspacex_crs14_official_launch_discussion_updates/",
      "reddit_recovery":null,
      "reddit_media":"https://www.reddit.com/r/spacex/comments/88l52i/rspacex_crs14_media_thread_videos_images_gifs/",
      "presskit":"http://www.spacex.com/sites/spacex/files/crs-14presskit2018.pdf",
      "article_link":null,
      "video_link":"https://www.youtube.com/watch?v=BPQHG-LevZM"
   },
   "details":"The launch used a refurbished booster (from CRS-12) for the 11th time, and a refurbished capsule (C110 from CRS-8) for the third time. External payloads include a materials research platform MISSE-FF phase 3 of the Robotic Refueling Mission TSIS, heliophysics sensor several crystallization experiments, and the RemoveDebris spacecraft aimed at space junk removal. The booster was expended in order to test a new landing profile."
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
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me
* For any other questions or concerns, just shoot me an email
