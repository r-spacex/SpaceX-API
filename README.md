<p align="center"><img src="https://i.imgur.com/ympu8t5.jpg"></p>

<h1 align="center">SpaceX REST API</h1>

<p align="center">
<a href="https://travis-ci.org/r-spacex/SpaceX-API"><img src="https://img.shields.io/travis/r-spacex/SpaceX-API.svg?style=flat-square"></a>
<a href="https://hub.docker.com/r/jakewmeyer/spacex-api/"><img src="https://img.shields.io/docker/build/jakewmeyer/spacex-api.svg?style=flat-square"></a>
<a href="https://github.com/r-spacex/SpaceX-API/releases"><img src="https://img.shields.io/github/release/r-spacex/SpaceX-API.svg?style=flat-square"></a>
<a href="https://en.wikipedia.org/wiki/Representational_state_transfer"><img src="https://img.shields.io/badge/interface-REST-brightgreen.svg?style=flat-square"></a>
</p>

<h3 align="center">Open Source REST API for rocket, core, capsule, pad, and launch data</h3>

## Docs
See the [Wiki](https://github.com/r-spacex/SpaceX-API/wiki) for full API Documentation

## Usage

**Example Response**

```http
GET https://api.spacexdata.com/v2/launches/latest
```

```json
{
  "flight_number": 64,
  "mission_name": "CRS-15",
  "launch_year": "2018",
  "launch_date_unix": 1530265320,
  "launch_date_utc": "2018-06-29T09:42:00.000Z",
  "launch_date_local": "2018-06-29T05:42:00-04:00",
  "rocket": {
    "rocket_id": "falcon9",
    "rocket_name": "Falcon 9",
    "rocket_type": "FT",
    "first_stage": {
      "cores": [
        {
          "core_serial": "B1045",
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
      "block": 4,
      "payloads": [
        {
          "payload_id": "SpaceX CRS-15",
          "cap_serial": "C111",
          "reused": true,
          "customers": [
            "NASA (CRS)"
          ],
          "payload_type": "Dragon 1.1",
          "payload_mass_kg": 2410,
          "payload_mass_lbs": 5313,
          "orbit": "ISS",
          "orbit_params": {
            "reference_system": "geocentric",
            "regime": "low-earth",
            "longitude": null,
            "semi_major_axis_km": null,
            "eccentricity": null,
            "periapsis_km": null,
            "apoapsis_km": null,
            "inclination_deg": 51.6,
            "period_min": null,
            "lifespan_years": null
          },
          "mass_returned_kg": null,
          "mass_returned_lbs": null,
          "flight_time_sec": null,
          "cargo_manifest": null
        }
      ]
    }
  },
  "telemetry": {
    "flight_club": "https://www.flightclub.io/results/?code=CR15"
  },
  "reuse": {
    "core": true,
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
    "mission_patch": "https://images2.imgbox.com/43/35/0QW7yRsB_o.png",
    "mission_patch_small": "https://images2.imgbox.com/11/ec/xng5hAXN_o.png",
    "reddit_campaign": "https://www.reddit.com/r/spacex/comments/8pua1m/crs15_launch_campaign_thread/",
    "reddit_launch": "https://www.reddit.com/r/spacex/comments/8ugo3l/rspacex_crs15_official_launch_discussion_updates",
    "reddit_recovery": null,
    "reddit_media": "https://www.reddit.com/r/spacex/comments/8ujcwo/rspacex_crs15_media_thread_videos_images_gifs/",
    "presskit": "http://www.spacex.com/sites/spacex/files/crs15presskit.pdf",
    "article_link": "https://spaceflightnow.com/2018/06/29/spacex-launches-ai-enabled-robot-companion-vegetation-monitor-to-space-station/",
    "wikipedia": "https://en.wikipedia.org/wiki/SpaceX_CRS-15",
    "video_link": "https://www.youtube.com/watch?v=ycMagB1s8XM"
  },
  "details": "Payload included MISSE-FF 2, ECOSTRESS, and a Latching End Effector. The refurbished booster featured a record 2.5 months period turnaround from its original launch of the TESS satellite — the fastest previous was 4.5 months. This was the last commercial flight of a Block 4 booster, which was expended into the Atlantic without landing legs and grid fins."
}
```

## Community made API Clients / Wrappers
| Lang  | Link |
| ------------- | ------------- |
| .NET  | [Tearth/Oddity](https://github.com/Tearth/Oddity) |
| Node.js  | [Thomas-Smyth/SpaceX-API-Wrapper](https://github.com/Thomas-Smyth/SpaceX-API-Wrapper) |

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