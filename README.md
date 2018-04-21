<div align="center">

![Imgur](https://i.imgur.com/CyPho0U.jpg)

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
   "flight_number":60,
   "launch_year":"2018",
   "launch_date_unix":1524091860,
   "launch_date_utc":"2018-04-18T22:51:00Z",
   "launch_date_local":"2018-04-18T18:51:00-04:00",
   "rocket":{
      "rocket_id":"falcon9",
      "rocket_name":"Falcon 9",
      "rocket_type":"FT",
      "first_stage":{
         "cores":[
            {
               "core_serial":"B1045",
               "flight":1,
               "block":4,
               "reused":false,
               "land_success":true,
               "landing_type":"ASDS",
               "landing_vehicle":"OCISLY"
            }
         ]
      },
      "second_stage":{
         "payloads":[
            {
               "payload_id":"TESS",
               "reused":false,
               "customers":[
                  "NASA"
               ],
               "payload_type":"Satellite",
               "payload_mass_kg":350,
               "payload_mass_lbs":772,
               "orbit":"HEO"
            }
         ]
      }
   },
   "telemetry":{
      "flight_club":"https://www.flightclub.io/results/?code=TESS"
   },
   "reuse":{
      "core":true,
      "side_core1":false,
      "side_core2":false,
      "fairings":false,
      "capsule":false
   },
   "launch_site":{
      "site_id":"ccafs_slc_40",
      "site_name":"CCAFS SLC 40",
      "site_name_long":"Cape Canaveral Air Force Station Space Launch Complex 40"
   },
   "launch_success":true,
   "links":{
      "mission_patch":"https://images2.imgbox.com/1f/13/kR2sdzO4_o.png",
      "mission_patch_small":"https://images2.imgbox.com/f3/cd/Ub2z4QHa_o.png",
      "reddit_campaign":"https://www.reddit.com/r/spacex/comments/88l46q/tess_launch_campaign_thread/",
      "reddit_launch":"https://www.reddit.com/r/spacex/comments/8cm61o/rspacex_tess_official_launch_discussion_updates/",
      "reddit_recovery":null,
      "reddit_media":"https://www.reddit.com/r/spacex/comments/8cmzop/rspacex_tess_media_thread_videos_images_gifs/",
      "presskit":"http://www.spacex.com/sites/spacex/files/tesspresskitfinal417.pdf",
      "article_link":"https://spaceflightnow.com/2018/04/19/all-sky-surveyor-launched-from-cape-canaveral-on-the-hunt-for-exoplanets/",
      "video_link":"https://www.youtube.com/watch?v=aY-0uBIYYKk"
   },
   "details":"Part of the Explorers program, this space telescope is intended for wide-field search of exoplanets transiting nearby stars. It is the first NASA high priority science mission launched by SpaceX. It was the first time SpaceX launched a scientific satellite not primarily intended for Earth observations. The second stage placed it into a high-Earth elliptical orbit, after which the satellite's own booster will perform complex maneuvers including a lunar flyby, and over the course of two months, reach a stable, 2:1 resonant orbit with the Moon. In January 2018, SpaceX received NASA's Launch Services Program Category 2 certification of its Falcon 9 'Full Thrust', certification which is required for launching medium risk missions like TESS. It was the last launch of a new Block 4 booster, and marked the 24th successful recovery of the booster. An experimental water landing was performed in order to attempt fairing recovery."
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
