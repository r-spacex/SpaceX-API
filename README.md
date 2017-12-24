<div align="center">

![Imgur](http://i.imgur.com/eL73Iit.png)

![Imgur](https://i.imgur.com/iw4m3NH.jpg)

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
   "flight_number":52,
   "launch_year":"2017",
   "launch_date_unix":1513992443,
   "launch_date_utc":"2017-12-23T01:27:23Z",
   "launch_date_local":"2017-12-22T17:27:23-08:00",
   "rocket":{
      "rocket_id":"falcon9",
      "rocket_name":"Falcon 9",
      "rocket_type":"FT",
      "first_stage":{
         "cores":[
            {
               "core_serial":"B1036",
               "reused":true,
               "land_success":false,
               "landing_type":null,
               "landing_vehicle":null
            }
         ]
      },
      "second_stage":{
         "payloads":[
            {
               "payload_id":"Iridium NEXT 4",
               "reused":false,
               "customers":[
                  "Iridium Communications"
               ],
               "payload_type":"Satellite",
               "payload_mass_kg":9600,
               "payload_mass_lbs":21164.38,
               "orbit":"LEO"
            }
         ]
      }
   },
   "telemetry":{
      "flight_club":"https://www.flightclub.io/result?code=IRD4"
   },
   "reuse":{
      "core":true,
      "side_core1":false,
      "side_core2":false,
      "fairings":false,
      "capsule":false
   },
   "launch_site":{
      "site_id":"vafb_slc_4e",
      "site_name":"VAFB SLC 4E",
      "site_name_long":"Vandenberg Air Force Base Space Launch Complex 4E"
   },
   "launch_success":true,
   "links":{
      "mission_patch":"https://i.imgur.com/bNwARXL.png",
      "reddit_campaign":"https://www.reddit.com/r/spacex/comments/7cgts7/iridium_next_constellation_mission_4_launch/",
      "reddit_launch":"https://www.reddit.com/r/spacex/comments/7li8y2/rspacex_iridium_next_4_official_launch_discussion/",
      "reddit_recovery":null,
      "reddit_media":"https://www.reddit.com/r/spacex/comments/7litv2/rspacex_iridium4_media_thread_videos_images_gifs/",
      "presskit":"http://www.spacex.com/sites/spacex/files/iridium4presskit.pdf",
      "article_link":"https://spaceflightnow.com/2017/12/23/spacex-launch-dazzles-delivering-10-more-satellites-for-iridium/",
      "video_link":"https://www.youtube.com/watch?v=wtdjCwo6d3Q"
   },
   "details":"Reusing the booster first used on Iridium-2, but will be flying expendable."
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
