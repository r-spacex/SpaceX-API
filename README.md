<p align="center"><img src="https://i.imgur.com/QGMeKvE.jpg"></p>

<h1 align="center">SpaceX REST API</h1>

<p align="center">
<a href="https://travis-ci.org/r-spacex/SpaceX-API"><img src="https://img.shields.io/travis/r-spacex/SpaceX-API.svg?longCache=true&style=for-the-badge"></a>
<a href="https://hub.docker.com/r/jakewmeyer/spacex-api/"><img src="https://img.shields.io/docker/build/jakewmeyer/spacex-api.svg?longCache=true&style=for-the-badge"></a>
<a href="https://github.com/r-spacex/SpaceX-API/releases"><img src="https://img.shields.io/github/release/r-spacex/SpaceX-API.svg?longCache=true&style=for-the-badge"></a>
<a href="https://en.wikipedia.org/wiki/Representational_state_transfer"><img src="https://img.shields.io/badge/interface-REST-brightgreen.svg?longCache=true&style=for-the-badge"></a>
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
  "flight_number": 67,
  "mission_name": "Merah Putih",
  "launch_year": "2018",
  "launch_date_unix": 1533619080,
  "launch_date_utc": "2018-08-07T05:18:00.000Z",
  "launch_date_local": "2018-08-07T01:18:00-04:00",
  "rocket": {
    "rocket_id": "falcon9",
    "rocket_name": "Falcon 9",
    "rocket_type": "FT",
    "first_stage": {
      "cores": [
        {
          "core_serial": "B1046",
          "flight": 2,
          "block": 5,
          "reused": true,
          "land_success": true,
          "landing_type": "ASDS",
          "landing_vehicle": "OCISLY"
        }
      ]
    },
    "second_stage": {
      "block": 5,
      "payloads": [
        {
          "payload_id": "Telkom-4",
          "norad_id": [],
          "reused": false,
          "customers": [
            "Telkom"
          ],
          "payload_type": "Satellite",
          "payload_mass_kg": 5800,
          "payload_mass_lbs": 12786.81,
          "orbit": "GTO",
          "orbit_params": {
            "reference_system": "geocentric",
            "regime": "geostationary",
            "longitude": -108,
            "semi_major_axis_km": null,
            "eccentricity": null,
            "periapsis_km": null,
            "apoapsis_km": null,
            "inclination_deg": null,
            "period_min": null,
            "lifespan_years": 15
          }
        }
      ]
    }
  },
  "telemetry": {
    "flight_club": null
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
    "mission_patch": "https://images2.imgbox.com/a8/f5/ZgdsrbqW_o.png",
    "mission_patch_small": "https://images2.imgbox.com/a7/ec/sbwePzVD_o.png",
    "reddit_campaign": "https://www.reddit.com/r/spacex/comments/91gwfg/merah_putih_telkom4_launch_campaign_thread/",
    "reddit_launch": "https://www.reddit.com/r/spacex/comments/9539nr/rspacex_merah_putih_telkom4_official_launch/",
    "reddit_recovery": null,
    "reddit_media": "https://www.reddit.com/r/spacex/comments/94zr0b/rspacex_merah_putih_media_thread_videos_images/",
    "presskit": "https://www.spacex.com/sites/spacex/files/merahputihpresskit.pdf",
    "article_link": "https://spaceflightnow.com/2018/08/07/indonesian-communications-satellite-deployed-in-orbit-by-spacex/",
    "wikipedia": "https://en.wikipedia.org/wiki/Telkom_Indonesia",
    "video_link": "https://www.youtube.com/watch?v=FjfQNBYv2IY"
  },
  "details": "Indonesian comsat intended to replace the aging Telkom 1 at 108° E. First reflight of a Block 5-version booster.",
  "upcoming": false
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