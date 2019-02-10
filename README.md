<p align="center"><img src="https://farm5.staticflickr.com/4891/39745614053_43855205bc_o.jpg"></p>

<h1 align="center">SpaceX REST API</h1>

<p align="center">
<a href="https://circleci.com/gh/r-spacex/SpaceX-API"><img src="https://img.shields.io/circleci/project/github/r-spacex/SpaceX-API.svg?style=flat-square"></a>
<a href="https://hub.docker.com/r/jakewmeyer/spacex-api/"><img src="https://img.shields.io/docker/build/jakewmeyer/spacex-api.svg?longCache=true&style=flat-square"></a>
<a href="https://github.com/r-spacex/SpaceX-API/releases"><img src="https://img.shields.io/github/release/r-spacex/SpaceX-API.svg?longCache=true&style=flat-square"></a>
<a href="https://en.wikipedia.org/wiki/Representational_state_transfer"><img src="https://img.shields.io/badge/interface-REST-brightgreen.svg?longCache=true&style=flat-square"></a>
</p>

<h3 align="center">Open Source REST API for rocket, core, capsule, pad, and launch data</h3>

<h1 align="center">
<a href="https://documenter.getpostman.com/view/2025350/RWaEzAiG">Documentation</a>
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
  "flight_number": 74,
  "mission_name": "Iridium NEXT Mission 8",
  "mission_id": [
    "F3364BF"
  ],
  "launch_year": "2019",
  "launch_date_unix": 1547220660,
  "launch_date_utc": "2019-01-11T15:31:00.000Z",
  "launch_date_local": "2019-01-11T07:31:00-08:00",
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
          "core_serial": "B1049",
          "flight": 2,
          "block": 5,
          "gridfins": true,
          "legs": true,
          "reused": true,
          "land_success": true,
          "landing_intent": true,
          "landing_type": "ASDS",
          "landing_vehicle": "JRTI"
        }
      ]
    },
    "second_stage": {
      "block": 5,
      "payloads": [
        {
          "payload_id": "Iridium NEXT 8",
          "norad_id": [
            43922,
            43923,
            43924,
            43925,
            43926,
            43927,
            43928,
            43929,
            43930,
            43931
          ],
          "reused": false,
          "customers": [
            "Iridium Communications"
          ],
          "nationality": "United States",
          "manufacturer": "Thales Alenia Space",
          "payload_type": "Satellite",
          "payload_mass_kg": 9600,
          "payload_mass_lbs": 21164.38,
          "orbit": "PO",
          "orbit_params": {
            "reference_system": "geocentric",
            "regime": "low-earth",
            "longitude": null,
            "semi_major_axis_km": 7155.799,
            "eccentricity": 0.0001578,
            "periapsis_km": 776.534,
            "apoapsis_km": 778.793,
            "inclination_deg": 86.3952,
            "period_min": 100.403,
            "lifespan_years": 15,
            "epoch": "2019-02-04T11:45:18.000Z",
            "mean_motion": 14.34219278,
            "raan": 37.5829,
            "arg_of_pericenter": 49.2066,
            "mean_anomaly": 310.9266
          }
        }
      ]
    },
    "fairings": {
      "reused": false,
      "recovery_attempt": false,
      "recovered": null,
      "ship": null
    }
  },
  "ships": [
    "JRTI-2",
    "NRCQUEST",
    "PACIFICFREEDOM"
  ],
  "telemetry": {
    "flight_club": "https://www.flightclub.io/result?code=IRD8"
  },
  "launch_site": {
    "site_id": "vafb_slc_4e",
    "site_name": "VAFB SLC 4E",
    "site_name_long": "Vandenberg Air Force Base Space Launch Complex 4E"
  },
  "launch_success": true,
  "links": {
    "mission_patch": "https://images2.imgbox.com/80/ae/1JL1ZzXD_o.png",
    "mission_patch_small": "https://images2.imgbox.com/11/f0/xPDcIpmS_o.png",
    "reddit_campaign": "https://www.reddit.com/r/spacex/comments/a699fh/iridium_next_constellation_mission_8_launch/",
    "reddit_launch": "https://www.reddit.com/r/spacex/comments/aemq2i/rspacex_iridium_next_8_official_launch_discussion/",
    "reddit_recovery": "https://www.reddit.com/r/spacex/comments/aewp4r/iridium_8_recovery_thread/",
    "reddit_media": "https://www.reddit.com/r/spacex/comments/aeoxve/rspacex_iridium_next_8_media_thread_videos_images/",
    "presskit": "https://www.spacex.com/sites/spacex/files/iridium8presskit.pdf",
    "article_link": "https://spaceflightnow.com/2019/01/11/spacex-begins-2019-with-eighth-and-final-for-upgraded-iridium-network/",
    "wikipedia": "https://en.wikipedia.org/wiki/Iridium_satellite_constellation#Next-generation_constellation",
    "video_link": "https://youtu.be/VshdafZvwrg",
    "youtube_id": "VshdafZvwrg",
    "flickr_images": [
      "https://farm5.staticflickr.com/4866/39745612523_14270b4b9d_o.jpg",
      "https://farm8.staticflickr.com/7833/39745612923_21aa442350_o.jpg",
      "https://farm5.staticflickr.com/4881/39745613173_e99b09c000_o.jpg",
      "https://farm8.staticflickr.com/7882/39745613513_6cdd4581af_o.jpg",
      "https://farm8.staticflickr.com/7807/39745613733_1a7b70e54a_o.jpg",
      "https://farm5.staticflickr.com/4891/39745614053_43855205bc_o.jpg"
    ]
  },
  "details": "SpaceX's first flight of 2019 will be the eighth and final launch of its planned Iridium flights. Delivering 10 satellites to low earth orbit, this brings the total up to 75 and completes the Iridium NEXT constellation. This mission launches from SLC-4E at Vandenberg AFB. The booster is expected to land on JRTI.",
  "upcoming": false,
  "static_fire_date_utc": "2019-01-06T13:51:00.000Z",
  "static_fire_date_unix": 1546782660,
  "timeline": {
    "webcast_liftoff": 960,
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
    "maxq": 61,
    "meco": 147,
    "stage_sep": 150,
    "second_stage_ignition": 158,
    "fairing_deploy": 193,
    "first_stage_boostback_burn": 193,
    "first_stage_entry_burn": 330,
    "first_stage_landing": 434,
    "seco-1": 526,
    "second_stage_restart": 3108,
    "seco-2": 3111,
    "payload_deploy": 3412
  }
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
