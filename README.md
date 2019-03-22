<p align="center"><img src="https://farm5.staticflickr.com/4882/39684490143_6ca2a58d37_k.jpg"></p>

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
  "flight_number": 76,
  "mission_name": "CCtCap Demo Mission 1",
  "mission_id": [
    "EE86F74"
  ],
  "launch_year": "2019",
  "launch_date_unix": 1551512700,
  "launch_date_utc": "2019-03-02T07:45:00.000Z",
  "launch_date_local": "2019-03-02T02:45:00-05:00",
  "is_tentative": false,
  "tentative_max_precision": "hour",
  "tbd": false,
  "launch_window": 0,
  "rocket": {
    "rocket_id": "falcon9",
    "rocket_name": "Falcon 9",
    "rocket_type": "FT",
    "first_stage": {
      "cores": [
        {
          "core_serial": "B1051",
          "flight": 1,
          "block": 5,
          "gridfins": true,
          "legs": true,
          "reused": false,
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
          "payload_id": "CCtCap Demo Mission 1",
          "norad_id": [
            44063
          ],
          "cap_serial": "C201",
          "reused": false,
          "customers": [
            "NASA (CCtCap)"
          ],
          "nationality": "United States",
          "manufacturer": "SpaceX",
          "payload_type": "Crew Dragon",
          "payload_mass_kg": 12259,
          "payload_mass_lbs": 27026.47,
          "orbit": "ISS",
          "orbit_params": {
            "reference_system": "geocentric",
            "regime": "low-earth",
            "longitude": null,
            "semi_major_axis_km": 6671.344,
            "eccentricity": 0.0087165,
            "periapsis_km": 235.058,
            "apoapsis_km": 351.36,
            "inclination_deg": 51.6368,
            "period_min": 90.381,
            "lifespan_years": null,
            "epoch": "2019-03-02T15:41:00.000Z",
            "mean_motion": 15.93245467,
            "raan": 171.0737,
            "arg_of_pericenter": 56.5274,
            "mean_anomaly": 41.0649
          },
          "mass_returned_kg": null,
          "mass_returned_lbs": null,
          "flight_time_sec": null,
          "cargo_manifest": null
        }
      ]
    },
    "fairings": null
  },
  "ships": [
    "OCISLY"
  ],
  "telemetry": {
    "flight_club": "https://www2.flightclub.io/result/2d?code=DEM1"
  },
  "launch_site": {
    "site_id": "ksc_lc_39a",
    "site_name": "KSC LC 39A",
    "site_name_long": "Kennedy Space Center Historic Launch Complex 39A"
  },
  "launch_success": true,
  "links": {
    "mission_patch": "https://images2.imgbox.com/e6/a4/YKd36su1_o.png",
    "mission_patch_small": "https://images2.imgbox.com/be/7e/gOkzvXPe_o.png",
    "reddit_campaign": "https://www.reddit.com/r/spacex/comments/a65clm/dm1_launch_campaign_thread/",
    "reddit_launch": "https://www.reddit.com/r/spacex/comments/av1asz/rspacex_cctcap_demo_mission_1_official_launch/",
    "reddit_recovery": null,
    "reddit_media": "https://www.reddit.com/r/spacex/comments/aw6g7j/rspacex_cctcap_demo_mission_1_media_thread_videos/",
    "presskit": "https://www.spacex.com/sites/spacex/files/crew_demo-1_press_kit.pdf",
    "article_link": "https://spaceflightnow.com/2019/03/02/spacex-launches-first-crew-dragon-ferry-ship/",
    "wikipedia": "https://en.wikipedia.org/wiki/SpX-DM1",
    "video_link": "https://youtu.be/2ZL0tbOZYhE",
    "youtube_id": "2ZL0tbOZYhE",
    "flickr_images": [
      "https://farm8.staticflickr.com/7851/46535572784_7eb295968e_o.jpg",
      "https://farm8.staticflickr.com/7826/46535572564_a022f9c43a_o.jpg",
      "https://farm8.staticflickr.com/7889/40294395933_f429c12e83_o.jpg",
      "https://farm8.staticflickr.com/7914/40294395873_0a328f2d87_o.jpg",
      "https://farm8.staticflickr.com/7866/46535572294_22499c1223_o.jpg",
      "https://farm8.staticflickr.com/7850/46535573034_03da10f899_o.jpg",
      "https://farm8.staticflickr.com/7848/46535572664_316c466742_o.jpg"
    ]
  },
  "details": "Demonstration Mission 1 (DM-1) will launch Dragon 2 as part of NASA's Commercial Crew Transportation Capability program. This mission will demonstrate Dragon 2, and Falcon 9 in its configuration for crewed missions. DM-1 will launch from LC-39A at Kennedy Space Center, likely carrying some cargo to the International Space Station. The booster is expected to land on OCISLY.",
  "upcoming": false,
  "static_fire_date_utc": "2019-01-24T19:03:00.000Z",
  "static_fire_date_unix": 1548356580,
  "timeline": {
    "webcast_liftoff": 2941,
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
    "maxq": 58,
    "meco": 155,
    "stage_sep": 158,
    "second_stage_ignition": 162,
    "first_stage_entry_burn": 468,
    "seco-1": 539,
    "first_stage_landing_burn": 564,
    "first_stage_landing": 592,
    "dragon_separation": 660
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
