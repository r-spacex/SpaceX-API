<div align="center">

![Imgur](http://i.imgur.com/eL73Iit.png)

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
    "flight_number": 58,
    "launch_year": "2018",
    "launch_date_unix": 1522419231,
    "launch_date_utc": "2018-03-30T14:13:51Z",
    "launch_date_local": "2018-03-30T07:13:51-08:00",
    "rocket": {
        "rocket_id": "falcon9",
        "rocket_name": "Falcon 9",
        "rocket_type": "FT",
        "first_stage": {
            "cores": [
                {
                    "core_serial": "B1041",
                    "flight": 2,
                    "block": 4,
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
                    "payload_id": "Iridium NEXT 5",
                    "reused": false,
                    "customers": [
                        "Iridium Communications"
                    ],
                    "payload_type": "Satellite",
                    "payload_mass_kg": 9600,
                    "payload_mass_lbs": 21164.38,
                    "orbit": "PO"
                }
            ]
        }
    },
    "telemetry": {
        "flight_club": "https://www.flightclub.io/results/?code=IRD5"
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
        "mission_patch": "https://i.imgur.com/QUSoLHy.png",
        "reddit_campaign": "https://www.reddit.com/r/spacex/comments/82njj5/iridium_next_constellation_mission_5_launch/",
        "reddit_launch": "https://www.reddit.com/r/spacex/comments/88184i/rspacex_iridium_next_5_official_launch_discussion/",
        "reddit_recovery": null,
        "reddit_media": "https://www.reddit.com/r/spacex/comments/88114l/rspacex_iridium5_media_thread_videos_images_gifs/",
        "presskit": "http://www.spacex.com/sites/spacex/files/iridium-5_press_kit.pdf",
        "article_link": "https://spaceflightnow.com/2018/03/30/iridium-messaging-network-gets-another-boost-from-spacex/",
        "video_link": "https://www.youtube.com/watch?v=mp0TW8vkCLg"
    },
    "details": "Fifth Iridium NEXT mission to deploy ten Iridium NEXT satellites. Reused booster from third Iridium flight, and although controlled descent was performed, the booster was expended into the ocean. SpaceX planned a second recovery attempt of one half of the fairing using the specially modified boat Mr. Steven. However, the fairing's parafoil twisted during the recovery, which led to water impact at high speed"
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
