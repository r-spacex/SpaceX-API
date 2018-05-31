<div align="center">

![Imgur](https://i.imgur.com/l7JtVma.jpg)

# SpaceX REST API

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
  "flight_number": 62,
  "mission_name": "Iridium NEXT Mission 6",
  "launch_year": "2018",
  "launch_date_unix": 1527018478,
  "launch_date_utc": "2018-05-22T19:47:58Z",
  "launch_date_local": "2018-05-22T12:47:58-08:00",
  "rocket": {
    "rocket_id": "falcon9",
    "rocket_name": "Falcon 9",
    "rocket_type": "FT",
    "first_stage": {
      "cores": [
        {
          "core_serial": "B1043",
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
          "payload_id": "Iridium NEXT 6",
          "reused": false,
          "customers": [
            "Iridium Communications"
          ],
          "payload_type": "Satellite",
          "payload_mass_kg": 4300,
          "payload_mass_lbs": 9479.9,
          "orbit": "PO",
          "orbit_params": {
            "reference_system": "geocentric",
            "regime": "low-earth",
            "longitude": null,
            "semi_major_axis_km": null,
            "eccentricity": null,
            "periapsis_km": null,
            "apoapsis_km": null,
            "inclination_deg": 88.6,
            "period_min": null,
            "lifespan_years": 15
          }
        },
        {
          "payload_id": "GRACE-FO 1-2",
          "reused": false,
          "customers": [
            "NASA",
            "DLR"
          ],
          "payload_type": "Satellite",
          "payload_mass_kg": 1160,
          "payload_mass_lbs": 2557.4,
          "orbit": "PO",
          "orbit_params": {
            "reference_system": "geocentric",
            "regime": "sun-synchronous",
            "longitude": null,
            "semi_major_axis_km": 6873.5,
            "eccentricity": 0.00182,
            "periapsis_km": 483,
            "apoapsis_km": 508,
            "inclination_deg": 89,
            "period_min": 94.5,
            "lifespan_years": 5
          }
        }
      ]
    }
  },
  "telemetry": {
    "flight_club": "https://www.flightclub.io/result?code=IRD6"
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
    "mission_patch": "https://images2.imgbox.com/3d/f9/IHjBUE1f_o.png",
    "mission_patch_small": "https://images2.imgbox.com/f5/da/hz3r2Lni_o.png",
    "reddit_campaign": "https://www.reddit.com/r/spacex/comments/8ffsgl/iridium6_gracefo_launch_campaign_thread/",
    "reddit_launch": "https://www.reddit.com/r/spacex/comments/8kyk5a/rspacex_iridium_next_6_official_launch_discussion/",
    "reddit_recovery": null,
    "reddit_media": "https://www.reddit.com/r/spacex/comments/8l9tfz/rspacex_iridium6gracefo_media_thread_videos/",
    "presskit": "http://www.spacex.com/sites/spacex/files/iridium6presskit2018521.pdf",
    "article_link": "https://spaceflightnow.com/2018/05/22/rideshare-launch-by-spacex-serves-commercial-and-scientific-customers/",
    "wikipedia": "https://en.wikipedia.org/wiki/Gravity_Recovery_and_Climate_Experiment",
    "video_link": "https://www.youtube.com/watch?v=I_0GgKfwCSk"
  },
  "details": "GFZ arranged a rideshare of GRACE-FO on a Falcon 9 with Iridium following the cancellation of their Dnepr launch contract in 2015. Iridium CEO Matt Desch disclosed in September 2017 that GRACE-FO would be launched on the sixth Iridium NEXT mission. The booster reuse turnaround was a record 4.5 months between flights."
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
* Uses [Redis](https://redis.io/) for route caching
* Uses [Jest](https://facebook.github.io/jest/) and [Supertest](https://github.com/visionmedia/supertest) for unit/integration testing
* Uses [Travis CI](https://travis-ci.org/) for continuous integration/delivery
* API deployed on a [Heroku](https://www.heroku.com/) pipeline with pull request, staging and production servers

## FAQ's
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me
* For any other questions or concerns, just shoot me an email

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fr-spacex%2FSpaceX-API.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fr-spacex%2FSpaceX-API?ref=badge_large)