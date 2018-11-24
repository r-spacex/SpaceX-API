<p align="center"><img src="https://i.imgur.com/CCCJB3z.jpg"></p>

<h1 align="center">SpaceX REST API</h1>

<p align="center">
<a href="https://circleci.com/gh/r-spacex/SpaceX-API"><img src="https://circleci.com/gh/r-spacex/SpaceX-API.svg?style=svg"></a>
<a href="https://hub.docker.com/r/jakewmeyer/spacex-api/"><img src="https://img.shields.io/docker/build/jakewmeyer/spacex-api.svg?longCache=true&style=flat"></a>
<a href="https://github.com/r-spacex/SpaceX-API/releases"><img src="https://img.shields.io/github/release/r-spacex/SpaceX-API.svg?longCache=true&style=flat"></a>
<a href="https://en.wikipedia.org/wiki/Representational_state_transfer"><img src="https://img.shields.io/badge/interface-REST-brightgreen.svg?longCache=true&style=flat"></a>
</p>

<h3 align="center">Open Source REST API for rocket, core, capsule, pad, and launch data</h3>

## Documentation
* See the [Docs](https://documenter.getpostman.com/view/2025350/RWaEzAiG) for full API Documentation

## Postman Collection
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3aeac01a548a87943749)

## Usage

**Example Response**

```bash
curl -s https://api.spacexdata.com/v3/launches/latest | jq
```

```json
{
  "flight_number": 70,
  "mission_name": "Es’hail 2",
  "mission_id": [],
  "launch_year": "2018",
  "launch_date_unix": 1542314760,
  "launch_date_utc": "2018-11-15T20:46:00.000Z",
  "launch_date_local": "2018-11-15T15:46:00-05:00",
  "is_tentative": false,
  "tentative_max_precision": "hour",
  "tbd": false,
  "rocket": {
    "rocket_id": "falcon9",
    "rocket_name": "Falcon 9",
    "rocket_type": "FT",
    "first_stage": {
      "cores": [
        {
          "core_serial": "B1047",
          "flight": 2,
          "block": 5,
          "gridfins": true,
          "legs": true,
          "reused": true,
          "land_success": true,
          "landing_intent": true,
          "landing_type": "ASDS",
          "landing_vehicle": "OCISLY"
        }
      ]
    },
    "second_stage": {
      "block": 5,
      "payloads": [
        {
          "payload_id": "Es’hail 2",
          "norad_id": [
            43700
          ],
          "reused": false,
          "customers": [
            "Es’hailSat"
          ],
          "nationality": "Qatar",
          "manufacturer": "Mitsubishi Electric",
          "payload_type": "Satellite",
          "payload_mass_kg": 3000,
          "payload_mass_lbs": 6613.868,
          "orbit": "GTO",
          "orbit_params": {
            "reference_system": "geocentric",
            "regime": "geostationary",
            "longitude": 25.5,
            "semi_major_axis_km": 25322.941,
            "eccentricity": 0.7401796,
            "periapsis_km": 201.281,
            "apoapsis_km": 37688.33,
            "inclination_deg": 25.0155,
            "period_min": 668.391,
            "lifespan_years": 15,
            "epoch": "2018-11-15T22:50:01.000Z",
            "mean_motion": 2.1544258,
            "raan": 199.6281,
            "arg_of_pericenter": 178.1843,
            "mean_anomaly": 52.4356
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
    "flight_club": "https://www.flightclub.io/result/2d?code=ESL2"
  },
  "launch_site": {
    "site_id": "ksc_lc_39a",
    "site_name": "KSC LC 39A",
    "site_name_long": "Kennedy Space Center Historic Launch Complex 39A"
  },
  "launch_success": true,
  "links": {
    "mission_patch": "https://images2.imgbox.com/59/c8/HPYpMlux_o.png",
    "mission_patch_small": "https://images2.imgbox.com/a3/96/WvJsBXuE_o.png",
    "reddit_campaign": "https://www.reddit.com/r/spacex/comments/9p82jt/eshail_2_launch_campaign_thread/",
    "reddit_launch": "https://www.reddit.com/r/spacex/comments/9x9w9v/rspacex_eshail_2_official_launch_discussion/",
    "reddit_recovery": "https://www.reddit.com/r/spacex/comments/9xmpa7/eshail_2_recovery_thread/",
    "reddit_media": "https://www.reddit.com/r/spacex/comments/9xaa76/rspacex_eshail_2_media_thread_videos_images_gifs/",
    "presskit": "https://www.spacex.com/sites/spacex/files/eshail-2_mission_press_kit_11_14_2018.pdf",
    "article_link": "https://spaceflightnow.com/2018/11/15/spacex-launches-qatars-eshail-2-communications-satellite/",
    "wikipedia": "https://en.wikipedia.org/wiki/Es%27hailSat",
    "video_link": "https://www.youtube.com/watch?v=PhTbzc-BqKs&feature=youtu.be",
    "flickr_images": [
      "https://farm5.staticflickr.com/4834/32040174268_b71d703417_o.jpg",
      "https://farm5.staticflickr.com/4810/32040174058_a65fa64e85_o.jpg",
      "https://farm5.staticflickr.com/4814/32040173268_0ab571e7bc_o.jpg",
      "https://farm5.staticflickr.com/4899/32040173568_bb5c991565_o.jpg",
      "https://farm5.staticflickr.com/4875/32040173278_b5578ba6be_o.jpg",
      "https://farm5.staticflickr.com/4862/32040173928_afdfb09939_o.jpg",
      "https://farm5.staticflickr.com/4888/32040173048_b2b29c020f_o.jpg"
    ]
  },
  "details": "SpaceX's eighteenth flight of 2018 was its first for Es'hailSat. Es'hail-2 is a communications satellite delivering television and internet to Qatar and the surrounding region. It was launched into a geostationary transfer orbit from LC-39A at Kennedy Space Center. The booster landed on OCISLY.",
  "upcoming": false,
  "static_fire_date_utc": "2018-11-12T18:13:00.000Z",
  "static_fire_date_unix": 1542046380
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

## V2 - Deprecated
* API V2 will be available indefinitely, but will no longer receive new feature updates.
* V2 data will still be updated
* V2 docs will no longer be updated
* Old V2 docs located [here](https://github.com/r-spacex/SpaceX-API/tree/master/docs)

## Technical Details
* Deployed on a central U.S. [Linode](https://www.linode.com/) server
* Using [Node.js](https://nodejs.org/en/) with the [Koa](http://koajs.com/) framework
* Using [Redis](https://redis.io/), [Nginx](https://www.nginx.com/), and [Cloudflare](https://www.cloudflare.com/) for content caching
* Using [Jest](https://facebook.github.io/jest/) and [Supertest](https://github.com/visionmedia/supertest) for tests
* Using [Circle CI](https://circleci.com/) for continuous integration / deployments
* All data stored in a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 3 node replica set cluster
* Latest database mongodump and zipped JSON files available [here](https://drive.google.com/drive/folders/0B2DdgKR4GR4xdk1sRGowcUZXeE0?usp=sharing)

## FAQ's
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me
* For any other questions or concerns, just shoot me an email

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fr-spacex%2FSpaceX-API.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fr-spacex%2FSpaceX-API?ref=badge_large)
