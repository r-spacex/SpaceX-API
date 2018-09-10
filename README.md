<p align="center"><img src="https://i.imgur.com/96l53RG.jpg"></p>

<h1 align="center">SpaceX REST API</h1>

<p align="center">
<a href="https://travis-ci.org/r-spacex/SpaceX-API"><img src="https://img.shields.io/travis/r-spacex/SpaceX-API.svg?longCache=true&style=for-the-badge"></a>
<a href="https://hub.docker.com/r/jakewmeyer/spacex-api/"><img src="https://img.shields.io/docker/build/jakewmeyer/spacex-api.svg?longCache=true&style=for-the-badge"></a>
<a href="https://github.com/r-spacex/SpaceX-API/releases"><img src="https://img.shields.io/github/release/r-spacex/SpaceX-API.svg?longCache=true&style=for-the-badge"></a>
<a href="https://en.wikipedia.org/wiki/Representational_state_transfer"><img src="https://img.shields.io/badge/interface-REST-brightgreen.svg?longCache=true&style=for-the-badge"></a>
</p>

<h3 align="center">Open Source REST API for rocket, core, capsule, pad, and launch data</h3>

## Docs
* See the [Docs](https://github.com/r-spacex/SpaceX-API/tree/master/docs) for full  V2 API Documentation

## V3 preview
* API V3 will be released towards the end of September 2018
* V2 will remain available indefinitely, and the data will continue to be updated
* V3 docs preview located [here](https://documenter.getpostman.com/view/2025350/RWaEzAiG#46951cda-bdf2-481b-9697-118b1cbccaba)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3aeac01a548a87943749)

## Usage

**Example Response**

```bash
curl -s https://api.spacexdata.com/v2/launches/latest | jq
```

```json
{
  "flight_number": 67,
  "mission_name": "Merah Putih",
  "launch_year": "2018",
  "launch_date_unix": 1533619080,
  "launch_date_utc": "2018-08-07T05:18:00.000Z",
  "launch_date_local": "2018-08-07T01:18:00-04:00",
  "is_tentative": false,
  "tentative_max_precision": "hour",
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
          "norad_id": [
            43587
          ],
          "reused": false,
          "customers": [
            "Telkom"
          ],
          "nationality": "Indonesia",
          "manufacturer": "SSL",
          "payload_type": "Satellite",
          "payload_mass_kg": 5800,
          "payload_mass_lbs": 12786.81,
          "orbit": "GTO",
          "orbit_params": {
            "reference_system": "geocentric",
            "regime": "geostationary",
            "longitude": -108,
            "semi_major_axis_km": 21226.178,
            "eccentricity": 0.6904141,
            "periapsis_km": 193.19,
            "apoapsis_km": 29502.896,
            "inclination_deg": 27.0648,
            "period_min": 512.941,
            "lifespan_years": 15,
            "epoch": "2018-08-07T06:57:16.000Z",
            "mean_motion": 2.80734018,
            "raan": 227.0228
          }
        }
      ]
    },
    "fairings": {
      "reused": false,
      "recovery_attempt": false,
      "recovered": false,
      "ship": null
    }
  },
  "ships": [
    "HAWK",
    "OCISLY"
  ],
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
  "details": "SpaceX's fifteenth flight of 2018 launched the Merah Putih (also known as Telkom-4) geostationary communications satellite for Telkom Indonesia. It marked the first reuse of any Block 5 first stage; the booster B1046 had previously launched Bangabandhu-1. The stage was recovered and is expected to become the first Falcon 9 booster to fly three missions.",
  "upcoming": false,
  "static_fire_date_utc": "2018-08-02T15:53:00.000Z"
}
```

## Community made UI Clients / API Clients / API wrappers
See [clients](https://github.com/r-spacex/SpaceX-API/blob/master/clients.md)

## API Status
See the [status](https://status.spacexdata.com) page for more details

## Contributions
See the [contribution](https://github.com/r-spacex/SpaceX-API/blob/master/CONTRIBUTING.md) guide for detailed steps

## Local Development
Local development info can be found [here](https://github.com/r-spacex/SpaceX-API/blob/master/docs/development.md)

## Technical Details
* Deployed on a central U.S. [Linode](https://www.linode.com/) server
* Using [Node.js](https://nodejs.org/en/) with the [Koa](http://koajs.com/) framework
* Using [Redis](https://redis.io/), [Nginx](https://www.nginx.com/), and [Cloudflare](https://www.cloudflare.com/) for content caching
* Using [Jest](https://facebook.github.io/jest/) and [Supertest](https://github.com/visionmedia/supertest) for tests
* Using [Travis CI](https://travis-ci.org/) for continuous integration / deployments
* All data stored in a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 3 node replica set cluster
* Latest database mongodump and zipped JSON files available [here](https://drive.google.com/drive/folders/0B2DdgKR4GR4xdk1sRGowcUZXeE0?usp=sharing)

## FAQ's
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me
* For any other questions or concerns, just shoot me an email

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fr-spacex%2FSpaceX-API.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fr-spacex%2FSpaceX-API?ref=badge_large)
