<p align="center"><img src="https://i.imgur.com/2xgfUEa.jpg"></p>

<h1 align="center">SpaceX REST API</h1>

<p align="center">
<a href="https://travis-ci.org/r-spacex/SpaceX-API"><img src="https://img.shields.io/travis/r-spacex/SpaceX-API.svg?style=flat-square"></a>
<a href="https://hub.docker.com/r/jakewmeyer/spacex-api/"><img src="https://img.shields.io/docker/build/jakewmeyer/spacex-api.svg?style=flat-square"></a>
<a href="https://github.com/r-spacex/SpaceX-API/releases"><img src="https://img.shields.io/github/release/r-spacex/SpaceX-API.svg?style=flat-square"></a>
<a href="https://en.wikipedia.org/wiki/Representational_state_transfer"><img src="https://img.shields.io/badge/interface-REST-brightgreen.svg?style=flat-square"></a>
</p>

<h3 align="center">Open Source REST API for rocket, core, capsule, pad, and launch data</h3>

## Docs
See the [Docs](https://github.com/r-spacex/SpaceX-API/blob/master/docs/home.md) for full API Documentation

## Usage

**Example Response**

```http
GET https://api.spacexdata.com/v2/launches/latest
```

```json
{
  "flight_number": 66,
  "mission_name": "Iridium NEXT Mission 7",
  "launch_year": "2018",
  "launch_date_unix": 1532518766,
  "launch_date_utc": "2018-07-25T11:39:26.000Z",
  "launch_date_local": "2018-07-25T04:39:26-07:00",
  "rocket": {
    "rocket_id": "falcon9",
    "rocket_name": "Falcon 9",
    "rocket_type": "FT",
    "first_stage": {
      "cores": [
        {
          "core_serial": "B1048",
          "flight": 1,
          "block": 5,
          "reused": false,
          "land_success": true,
          "landing_type": "ASDS",
          "landing_vehicle": "JRTI"
        }
      ]
    },
    "second_stage": {
      "block": null,
      "payloads": [
        {
          "payload_id": "Iridium NEXT 7",
          "reused": false,
          "customers": [
            "Iridium Communications"
          ],
          "payload_type": "Satellite",
          "payload_mass_kg": 9600,
          "payload_mass_lbs": 21164.38,
          "orbit": "PO",
          "orbit_params": {
            "reference_system": "geocentric",
            "regime": "low-earth",
            "longitude": null,
            "semi_major_axis_km": null,
            "eccentricity": null,
            "periapsis_km": null,
            "apoapsis_km": null,
            "inclination_deg": 86.4,
            "period_min": 101,
            "lifespan_years": 15
          }
        }
      ]
    }
  },
  "telemetry": {
    "flight_club": "https://www.flightclub.io/result?code=IRD7"
  },
  "reuse": {
    "core": false,
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
    "mission_patch": "https://images2.imgbox.com/a9/cb/0xfkY5rT_o.png",
    "mission_patch_small": "https://images2.imgbox.com/05/15/sT4UekiT_o.png",
    "reddit_campaign": "https://www.reddit.com/r/spacex/comments/8v4wcm/iridium_next_constellation_mission_7_launch/",
    "reddit_launch": "https://www.reddit.com/r/spacex/comments/91i1ru/rspacex_iridium_next_7_official_launch_discussion/",
    "reddit_recovery": null,
    "reddit_media": "https://www.reddit.com/r/spacex/comments/91gx44/rspacex_iridium_next_constellation_mission_7/",
    "presskit": "http://www.spacex.com/sites/spacex/files/iridium7_press_kit_7_24.pdf",
    "article_link": "https://spaceflightnow.com/2018/07/25/spacexs-second-launch-in-three-days-lofts-10-more-iridium-satellites/",
    "wikipedia": "https://en.wikipedia.org/wiki/Iridium_satellite_constellation#Next-generation_constellation",
    "video_link": "https://www.youtube.com/watch?v=vsDknmK30C0"
  },
  "details": "Seventh Iridium NEXT launch, with 10 communication satellites. Booster landed safely despite the droneship experiencing significant waves. Mr. Steven boat with an upgraded 4x size net was used, unsuccessfully, to attempt fairing recovery."
}
```

## Community made API Clients / Wrappers
| Lang  | Link |
| ------------- | ------------- |
| .NET  | [Tearth/Oddity](https://github.com/Tearth/Oddity) |
| Node.js  | [Thomas-Smyth/SpaceX-API-Wrapper](https://github.com/Thomas-Smyth/SpaceX-API-Wrapper) |
| PowerShell | [lazywinadmin/SpaceX](https://github.com/lazywinadmin/SpaceX) |

## Contributions
See the [Contribution](https://github.com/r-spacex/SpaceX-API/blob/master/CONTRIBUTING.md) guide for detailed steps

## Local Development
Local development info can be found [here](https://github.com/r-spacex/SpaceX-API/wiki/Local-Development)

## Technical Details
* API is using [Node.js](https://nodejs.org/en/) with the [Koa](http://koajs.com/) framework
* All data stored in a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 3 node replica set cluster
* Latest database mongodump available [here](https://drive.google.com/drive/folders/0B2DdgKR4GR4xdk1sRGowcUZXeE0?usp=sharing)
* Uses [Redis](https://redis.io/) on [RedisCloud](https://redislabs.com/redis-enterprise/cloud/) for route caching
* Uses [Jest](https://facebook.github.io/jest/) and [Supertest](https://github.com/visionmedia/supertest) for tests
* Uses [Travis CI](https://travis-ci.org/) for continuous integration/delivery
* API deployed on a [Heroku](https://www.heroku.com/) pipeline with pull request, staging and production servers

## FAQ's
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me
* For any other questions or concerns, just shoot me an email

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fr-spacex%2FSpaceX-API.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fr-spacex%2FSpaceX-API?ref=badge_large)