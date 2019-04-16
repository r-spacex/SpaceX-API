<p align="center"><img src="https://live.staticflickr.com/7885/40628434483_19cadc3d31_k.jpg"></p>

<h1 align="center">SpaceX REST API</h1>

<p align="center">
<a href="https://circleci.com/gh/r-spacex/SpaceX-API"><img src="https://img.shields.io/circleci/project/github/r-spacex/SpaceX-API/master.svg?style=flat-square"></a>
<a href="https://hub.docker.com/r/jakewmeyer/spacex-api/"><img src="https://img.shields.io/docker/build/jakewmeyer/spacex-api.svg?longCache=true&style=flat-square"></a>
<a href="https://github.com/r-spacex/SpaceX-API/releases"><img src="https://img.shields.io/github/release/r-spacex/SpaceX-API.svg?longCache=true&style=flat-square"></a>
<a href="https://en.wikipedia.org/wiki/Representational_state_transfer"><img src="https://img.shields.io/badge/interface-REST-brightgreen.svg?longCache=true&style=flat-square"></a>
</p>

<h3 align="center">Open Source REST API for rocket, core, capsule, pad, and launch data</h3>

<h1 align="center">
<a href="https://docs.spacexdata.com">Docs</a> - <a href="https://github.com/r-spacex/SpaceX-API/blob/master/clients.md">Clients</a> - <a href="https://github.com/r-spacex/SpaceX-API/blob/master/apps.md">Apps</a> - <a href="https://status.spacexdata.com">Status</a> - <a href="https://backups.jakemeyer.ml">Database</a>
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
  "flight_number": 77,
  "mission_name": "ArabSat 6A",
  "mission_id": [],
  "launch_year": "2019",
  "launch_date_unix": 1555022100,
  "launch_date_utc": "2019-04-11T22:35:00.000Z",
  "launch_date_local": "2019-04-11T18:35:00-04:00",
  "is_tentative": false,
  "tentative_max_precision": "hour",
  "tbd": false,
  "launch_window": 7020,
  "rocket": {
    "rocket_id": "falconheavy",
    "rocket_name": "Falcon Heavy",
    "rocket_type": "FT",
    "first_stage": {
      "cores": [
        {
          "core_serial": "B1055",
          "flight": 1,
          "block": 5,
          "gridfins": true,
          "legs": true,
          "reused": false,
          "land_success": true,
          "landing_intent": true,
          "landing_type": "ASDS",
          "landing_vehicle": "OCISLY"
        },
        {
          "core_serial": "B1052",
          "flight": 1,
          "block": 5,
          "gridfins": true,
          "legs": true,
          "reused": false,
          "land_success": true,
          "landing_intent": true,
          "landing_type": "RTLS",
          "landing_vehicle": "LZ-1"
        },
        {
          "core_serial": "B1053",
          "flight": 1,
          "block": 5,
          "gridfins": true,
          "legs": true,
          "reused": false,
          "land_success": true,
          "landing_intent": true,
          "landing_type": "RTLS",
          "landing_vehicle": "LZ-2"
        }
      ]
    },
    "second_stage": {
      "block": 5,
      "payloads": [
        {
          "payload_id": "ArabSat 6A",
          "norad_id": [
            44186
          ],
          "reused": false,
          "customers": [
            "Arabsat"
          ],
          "nationality": "Saudi Arabia",
          "manufacturer": "Lockheed Martin",
          "payload_type": "Satellite",
          "payload_mass_kg": 6000,
          "payload_mass_lbs": 13227.74,
          "orbit": "GTO",
          "orbit_params": {
            "reference_system": "geocentric",
            "regime": "geostationary",
            "longitude": 30.5,
            "semi_major_axis_km": 52699.683,
            "eccentricity": 0.8313451,
            "periapsis_km": 2509.924,
            "apoapsis_km": 90133.171,
            "inclination_deg": 16.9243,
            "period_min": 2006.65,
            "lifespan_years": 15,
            "epoch": "2019-04-14T21:32:10.000Z",
            "mean_motion": 0.71761376,
            "raan": 14.5658,
            "arg_of_pericenter": 178.0709,
            "mean_anomaly": 56.5468
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
    "HOLLYWOOD",
    "OCISLY",
    "GOQUEST",
    "GONAVIGATOR",
    "GOSEARCHER"
  ],
  "telemetry": {
    "flight_club": "https://www2.flightclub.io/result/2d?code=AS6A"
  },
  "launch_site": {
    "site_id": "ksc_lc_39a",
    "site_name": "KSC LC 39A",
    "site_name_long": "Kennedy Space Center Historic Launch Complex 39A"
  },
  "launch_success": true,
  "links": {
    "mission_patch": "https://images2.imgbox.com/82/e3/RzQ9nX2V_o.png",
    "mission_patch_small": "https://images2.imgbox.com/ab/ad/YJDi2l1n_o.png",
    "reddit_campaign": "https://www.reddit.com/r/spacex/comments/b0kscl/arabsat6a_launch_campaign_thread/",
    "reddit_launch": "https://www.reddit.com/r/spacex/comments/basm9y/rspacex_arabsat6a_official_launch_discussion/",
    "reddit_recovery": "https://www.reddit.com/r/spacex/comments/bcecao/fh_arabsat_6a_center_core_recovery_thread/",
    "reddit_media": "https://www.reddit.com/r/spacex/comments/bbhz9a/rspacex_arabsat6a_media_thread_videos_images_gifs/",
    "presskit": "https://www.spacex.com/sites/spacex/files/arabsat-6a_press_kit.pdf",
    "article_link": "https://spaceflightnow.com/2019/04/11/spacexs-falcon-heavy-successful-in-commercial-debut/",
    "wikipedia": "https://en.wikipedia.org/wiki/Arabsat-6A",
    "video_link": "https://youtu.be/TXMGu2d8c8g",
    "youtube_id": "TXMGu2d8c8g",
    "flickr_images": [
      "https://live.staticflickr.com/7911/32652060737_4be1171d4a_o.jpg",
      "https://live.staticflickr.com/7807/40628442293_9643eaf670_o.jpg",
      "https://live.staticflickr.com/7804/40628440983_4da5d76cc7_o.jpg",
      "https://live.staticflickr.com/7856/40628439793_27927d11de_o.jpg",
      "https://live.staticflickr.com/7919/40628438523_c597eabff1_o.jpg",
      "https://live.staticflickr.com/7834/40628437283_84088aca75_o.jpg",
      "https://live.staticflickr.com/7856/40628435833_a1bcde59db_o.jpg",
      "https://live.staticflickr.com/7809/40628435153_17c05d3b5e_o.jpg",
      "https://live.staticflickr.com/7885/40628434483_3545598b82_o.jpg"
    ]
  },
  "details": "SpaceX will launch Arabsat 6A to a geostationary transfer orbit from SLC-39A, KSC. The satellite is a geostationary telecommunications satellite built by Lockheed Martin for the Saudi Arabian company Arabsat. This will be the first operational flight of Falcon Heavy, and also the first Block 5 Falcon Heavy. All three cores will be new Block 5 cores. The side cores are expected to land at LZ-1 and LZ-2, and the center core is expected to land on OCISLY.",
  "upcoming": false,
  "static_fire_date_utc": "2019-04-05T09:57:00.000Z",
  "static_fire_date_unix": 1554458220,
  "timeline": {
    "webcast_liftoff": 1197,
    "go_for_prop_loading": -3180,
    "stage1_rp1_loading": -3000,
    "stage1_lox_loading": -2700,
    "stage2_rp1_loading": -2100,
    "stage2_lox_loading": -1110,
    "engine_chill": -420,
    "prelaunch_checks": -90,
    "propellant_pressurization": -60,
    "go_for_launch": -45,
    "ignition": -2,
    "liftoff": 0,
    "maxq": 69,
    "beco": 150,
    "side_core_sep": 154,
    "side_core_boostback": 171,
    "meco": 211,
    "center_stage_sep": 215,
    "second_stage_ignition": 222,
    "fairing_deploy": 247,
    "side_core_entry_burn": 371,
    "center_core_entry_burn": 420,
    "side_core_landing": 471,
    "seco-1": 521,
    "center_core_landing": 588,
    "second_stage_restart": 1654,
    "seco-2": 1740,
    "payload_deployment": 2042
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
* Nightly mongodump database backups [here](https://backups.jakemeyer.ml)

## FAQ's
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me
* For any other questions or concerns, just shoot me an email

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fr-spacex%2FSpaceX-API.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fr-spacex%2FSpaceX-API?ref=badge_large)
