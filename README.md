<p align="center"><img src="https://farm8.staticflickr.com/7889/46259778995_68130be69d_o.jpg"></p>

<h1 align="center">SpaceX REST API</h1>

<p align="center">
<a href="https://circleci.com/gh/r-spacex/SpaceX-API"><img src="https://img.shields.io/circleci/project/github/r-spacex/SpaceX-API/master.svg?style=flat-square"></a>
<a href="https://hub.docker.com/r/jakewmeyer/spacex-api/"><img src="https://img.shields.io/docker/build/jakewmeyer/spacex-api.svg?longCache=true&style=flat-square"></a>
<a href="https://github.com/r-spacex/SpaceX-API/releases"><img src="https://img.shields.io/github/release/r-spacex/SpaceX-API.svg?longCache=true&style=flat-square"></a>
<a href="https://en.wikipedia.org/wiki/Representational_state_transfer"><img src="https://img.shields.io/badge/interface-REST-brightgreen.svg?longCache=true&style=flat-square"></a>
</p>

<h3 align="center">Open Source REST API for rocket, core, capsule, pad, and launch data</h3>

<h1 align="center">
<a href="https://docs.spacexdata.com">Docs</a> - <a href="https://github.com/r-spacex/SpaceX-API/blob/master/clients.md">Clients</a> - <a href="https://github.com/r-spacex/SpaceX-API/blob/master/apps.md">Apps</a> - <a href="https://status.spacexdata.com">Status</a>
<br/>
<br/>
<a href="https://app.getpostman.com/run-collection/3aeac01a548a87943749"><img src="https://run.pstmn.io/button.svg"></a>
</h1>

## Usage

**Example Response**

```bash
curl -s https://api.spacexdata.com/v3/launches/latest | jq
```

```json
{
  "flight_number": 75,
  "mission_name": "Nusantara Satu (PSN-6) / S5 / Beresheet",
  "mission_id": [],
  "launch_year": "2019",
  "launch_date_unix": 1550799900,
  "launch_date_utc": "2019-02-22T01:45:00.000Z",
  "launch_date_local": "2019-02-21T20:45:00-05:00",
  "is_tentative": false,
  "tentative_max_precision": "hour",
  "tbd": false,
  "launch_window": 1920,
  "rocket": {
    "rocket_id": "falcon9",
    "rocket_name": "Falcon 9",
    "rocket_type": "FT",
    "first_stage": {
      "cores": [
        {
          "core_serial": "B1048",
          "flight": 3,
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
          "payload_id": "Nusantara Satu (PSN-6)",
          "norad_id": [
            44048
          ],
          "reused": false,
          "customers": [
            "Pasifik Satelit Nusantara"
          ],
          "nationality": "Indonesia",
          "manufacturer": "SSL",
          "payload_type": "Satellite",
          "payload_mass_kg": 5000,
          "payload_mass_lbs": 11023.11,
          "orbit": "GTO",
          "orbit_params": {
            "reference_system": "geocenteric",
            "regime": "geostationary",
            "longitude": 146,
            "semi_major_axis_km": 44995.626,
            "eccentricity": 0.6723643,
            "periapsis_km": 8364.038,
            "apoapsis_km": 68870.944,
            "inclination_deg": 12.1348,
            "period_min": 1583.124,
            "lifespan_years": 15,
            "epoch": "2019-02-24T06:14:19.000Z",
            "mean_motion": 0.90959342,
            "raan": 10.6904,
            "arg_of_pericenter": 180.602,
            "mean_anomaly": 339.0784
          }
        },
        {
          "payload_id": "S5",
          "norad_id": [],
          "reused": false,
          "customers": [
            "Air Force Research Laboratory"
          ],
          "nationality": "United States",
          "manufacturer": "Applied Defense Systems",
          "payload_type": "Satellite",
          "payload_mass_kg": 60,
          "payload_mass_lbs": 132.28,
          "orbit": "GTO",
          "orbit_params": {
            "reference_system": "geocentric",
            "regime": "geostationary",
            "longitude": null,
            "semi_major_axis_km": null,
            "eccentricity": null,
            "periapsis_km": null,
            "apoapsis_km": null,
            "inclination_deg": null,
            "period_min": null,
            "lifespan_years": null,
            "epoch": null,
            "mean_motion": null,
            "raan": null,
            "arg_of_pericenter": null,
            "mean_anomaly": null
          }
        },
        {
          "payload_id": "Beresheet",
          "norad_id": [
            44049
          ],
          "reused": false,
          "customers": [
            "SpaceIL"
          ],
          "nationality": "Israel",
          "manufacturer": "SSL",
          "payload_type": "Lander",
          "payload_mass_kg": 585,
          "payload_mass_lbs": 1289.7,
          "orbit": "GTO",
          "orbit_params": {
            "reference_system": "geocenteric",
            "regime": "highly-elliptical",
            "longitude": null,
            "semi_major_axis_km": 40963.344,
            "eccentricity": 0.8391448,
            "periapsis_km": 211.031,
            "apoapsis_km": 68959.387,
            "inclination_deg": 27.578,
            "period_min": 1375.158,
            "lifespan_years": 0.00547945,
            "epoch": "2019-02-24T03:50:24.000Z",
            "mean_motion": 1.04715181,
            "raan": 10.711,
            "arg_of_pericenter": 180.362,
            "mean_anomaly": 325.304
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
    "OCISLY"
  ],
  "telemetry": {
    "flight_club": null
  },
  "launch_site": {
    "site_id": "ccafs_slc_40",
    "site_name": "CCAFS SLC 40",
    "site_name_long": "Cape Canaveral Air Force Station Space Launch Complex 40"
  },
  "launch_success": true,
  "links": {
    "mission_patch": "https://images2.imgbox.com/1c/8e/rJ4HAYkk_o.png",
    "mission_patch_small": "https://images2.imgbox.com/50/65/wAkWv7k7_o.png",
    "reddit_campaign": "https://www.reddit.com/r/spacex/comments/afxyrd/nusantara_satu_launch_campaign_thread/",
    "reddit_launch": "https://www.reddit.com/r/spacex/comments/assxjz/rspacex_psnvi_official_launch_discussion_updates/",
    "reddit_recovery": "https://www.reddit.com/r/spacex/comments/atbmp3/psnvi_recovery_discussion_updates_thread/",
    "reddit_media": "https://www.reddit.com/r/spacex/comments/at5mu8/rspacex_psn6_media_thread_videos_images_gifs/",
    "presskit": "https://www.spacex.com/sites/spacex/files/nusantara_satu_press_kit.pdf",
    "article_link": "https://spaceflightnow.com/2019/02/22/israeli-moon-lander-hitches-ride-on-spacex-launch-with-indonesian-comsat/",
    "wikipedia": "https://en.wikipedia.org/wiki/PT_Pasifik_Satelit_Nusantara",
    "video_link": "https://www.youtube.com/watch?v=XS0E35aYJcU",
    "youtube_id": "XS0E35aYJcU",
    "flickr_images": [
      "https://farm8.staticflickr.com/7800/47173936271_b8ddb5bc5b_o.jpg",
      "https://farm8.staticflickr.com/7821/47121969172_37428a280e_o.jpg",
      "https://farm8.staticflickr.com/7923/47173936181_c0bf7a22a6_o.jpg",
      "https://farm8.staticflickr.com/7829/46259779115_8982c2c8c2_o.jpg",
      "https://farm8.staticflickr.com/7889/46259778995_68130be69d_o.jpg"
    ]
  },
  "details": "SpaceX will launch this rideshare to GTO for Space Systems Loral (SSL). The primary payload for this mission is Nusantara Satu, a communications satellite built by SSL for the private Indonesian company PT Pasifik Satelit Nusantara (PSN). Spaceflight Industries' GTO-1 mission consists of two secondary payloads. One of those is Beresheet, the lunar lander built by the Israeli non-profit organization, SpaceIL. Beresheet will make its own way to the moon from GTO. The other secondary is Air Force Research Lab's (Space Situational Awareness) S5 mission, which hitches a ride to GEO aboard Nusantara Satu. This mission launches from SLC-40 at Cape Canaveral AFS. The booster is expected to land on OCISLY.",
  "upcoming": false,
  "static_fire_date_utc": "2019-02-18T17:03:00.000Z",
  "static_fire_date_unix": 1550509380,
  "timeline": {
    "webcast_liftoff": 719,
    "go_for_prop_loading": -2280,
    "rp1_loading": -2100,
    "stage1_lox_loading": -2100,
    "stage2_lox_loading": -960,
    "engine_chill": -420,
    "prelaunch_checks": -60,
    "propellant_pressurization": -60,
    "go_for_launch": -45,
    "ignition": -3,
    "liftoff": 0,
    "maxq": 67,
    "meco": 157,
    "stage_sep": 160,
    "second_stage_ignition": 168,
    "fairing_deploy": 226,
    "first_stage_entry_burn": 404,
    "seco-1": 487,
    "first_stage_landing": 512,
    "second_stage_restart": 1623,
    "seco-2": 1688,
    "payload_deploy_1": 2019,
    "payload_deploy_2": 2678
  }
}
```

## Contributions
See the [contribution](https://github.com/r-spacex/SpaceX-API/blob/master/CONTRIBUTING.md) guide for detailed steps

## Local Development
Local development info can be found [here](https://github.com/r-spacex/SpaceX-API/blob/master/docs/development.md)

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
