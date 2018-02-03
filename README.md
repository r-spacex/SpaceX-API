<div align="center">

![Imgur](http://i.imgur.com/eL73Iit.png)

![Imgur](https://i.imgur.com/DGVwpos.jpg)

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
   "flight_number":54,
   "launch_year":"2018",
   "launch_date_unix":1517433900,
   "launch_date_utc":"2018-01-31T21:25:00Z",
   "launch_date_local":"2018-01-31T16:25:00-05:00",
   "rocket":{
      "rocket_id":"falcon9",
      "rocket_name":"Falcon 9",
      "rocket_type":"FT",
      "first_stage":{
         "cores":[
            {
               "core_serial":"B1032",
               "reused":true,
               "land_success":true,
               "landing_type":"Ocean",
               "landing_vehicle":null
            }
         ]
      },
      "second_stage":{
         "payloads":[
            {
               "payload_id":"GovSat-1",
               "reused":false,
               "customers":[
                  "GovSat"
               ],
               "payload_type":"Satellite",
               "payload_mass_kg":4000,
               "payload_mass_lbs":null,
               "orbit":"GTO"
            }
         ]
      }
   },
   "telemetry":{
      "flight_club":null
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
      "mission_patch":"https://i.imgur.com/UJTbQ1f.png",
      "reddit_campaign":"https://www.reddit.com/r/spacex/comments/7olw86/govsat1_ses16_launch_campaign_thread/",
      "reddit_launch":"https://www.reddit.com/r/spacex/comments/7tvtbh/rspacex_govsat1_official_launch_discussion/",
      "reddit_recovery":null,
      "reddit_media":"https://www.reddit.com/r/spacex/comments/7tzzwy/rspacex_govsat1_media_thread_videos_images_gifs/",
      "presskit":"http://www.spacex.com/sites/spacex/files/govsat1presskit.pdf",
      "article_link":"https://spaceflightnow.com/2018/01/31/spacex-rocket-flies-on-60th-anniversary-of-first-u-s-satellite-launch/",
      "video_link":"https://www.youtube.com/watch?v=ScYUA51-POQ"
   },
   "details":"Reused booster from the classified NROL-76 mission in May 2017. Following a successful experimental ocean landing that used three engines, the booster unexpectedly remained intact; Elon Musk stated in a tweet that SpaceX will attempt to tow the booster to shore."
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
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me
* For any other questions or concerns, just shoot me an email
