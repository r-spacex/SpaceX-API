<p align="center"><img src="https://farm5.staticflickr.com/4840/45473446114_7d5e5d6fe2_o.jpg"></p>

<h1 align="center">SpaceX REST API</h1>

<p align="center">
<a href="https://circleci.com/gh/r-spacex/SpaceX-API"><img src="https://img.shields.io/circleci/project/github/r-spacex/SpaceX-API.svg?style=flat-square"></a>
<a href="https://hub.docker.com/r/jakewmeyer/spacex-api/"><img src="https://img.shields.io/docker/build/jakewmeyer/spacex-api.svg?longCache=true&style=flat-square"></a>
<a href="https://github.com/r-spacex/SpaceX-API/releases"><img src="https://img.shields.io/github/release/r-spacex/SpaceX-API.svg?longCache=true&style=flat-square"></a>
<a href="https://en.wikipedia.org/wiki/Representational_state_transfer"><img src="https://img.shields.io/badge/interface-REST-brightgreen.svg?longCache=true&style=flat-square"></a>
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
  "flight_number": 72,
  "mission_name": "CRS-16",
  "mission_id": [
    "EE86F74"
  ],
  "launch_year": "2018",
  "launch_date_unix": 1544033760,
  "launch_date_utc": "2018-12-05T18:16:00.000Z",
  "launch_date_local": "2018-12-05T13:16:00-05:00",
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
          "core_serial": "B1050",
          "flight": 1,
          "block": 5,
          "gridfins": true,
          "legs": true,
          "reused": false,
          "land_success": false,
          "landing_intent": true,
          "landing_type": "RTLS",
          "landing_vehicle": "LZ-1"
        }
      ]
    },
    "second_stage": {
      "block": 5,
      "payloads": [
        {
          "payload_id": "CRS-16",
          "norad_id": [
            43827
          ],
          "cap_serial": "C112",
          "reused": true,
          "customers": [
            "NASA (CRS)"
          ],
          "nationality": "United States",
          "manufacturer": "SpaceX",
          "payload_type": "Dragon 1.1",
          "payload_mass_kg": 2573,
          "payload_mass_lbs": 5672.494,
          "orbit": "ISS",
          "orbit_params": {
            "reference_system": "geocentric",
            "regime": "low-earth",
            "longitude": null,
            "semi_major_axis_km": 6660.431,
            "eccentricity": 0.0116661,
            "periapsis_km": 204.595,
            "apoapsis_km": 359.997,
            "inclination_deg": 51.6366,
            "period_min": 90.159,
            "lifespan_years": null,
            "epoch": "2018-12-06T23:10:05.000Z",
            "mean_motion": 15.97162853,
            "raan": 239.104,
            "arg_of_pericenter": 50.4048,
            "mean_anomaly": 52.6829
          },
          "mass_returned_kg": null,
          "mass_returned_lbs": null,
          "flight_time_sec": null,
          "cargo_manifest": "https://www.nasa.gov/sites/default/files/atoms/files/spacex_crs-16_mision_overview_high_res_rev2.pdf"
        }
      ]
    },
    "fairings": null
  },
  "ships": [
    "GOQUEST"
  ],
  "telemetry": {
    "flight_club": "https://www.flightclub.io/result/2d?code=CR16"
  },
  "launch_site": {
    "site_id": "ccafs_slc_40",
    "site_name": "CCAFS SLC 40",
    "site_name_long": "Cape Canaveral Air Force Station Space Launch Complex 40"
  },
  "launch_success": true,
  "links": {
    "mission_patch": "https://images2.imgbox.com/b6/15/tLQrmwcl_o.png",
    "mission_patch_small": "https://images2.imgbox.com/de/47/liJzNMRP_o.png",
    "reddit_campaign": "https://www.reddit.com/r/spacex/comments/9z7i4j/crs16_launch_campaign_thread/",
    "reddit_launch": "https://www.reddit.com/r/spacex/comments/a2oubw/rspacex_crs16_official_launch_discussion_updates/",
    "reddit_recovery": "https://www.reddit.com/r/spacex/comments/a3n3vm/crs16_emergency_recovery_thread/",
    "reddit_media": "https://www.reddit.com/r/spacex/comments/a2uojp/rspacex_crs16_media_thread_videos_images_gifs/",
    "presskit": "https://www.spacex.com/sites/spacex/files/crs16_press_kit_12_4.pdf",
    "article_link": "https://spaceflightnow.com/2018/12/05/spacex-falcon-9-boosts-dragon-cargo-ship-to-orbit-first-stage-misses-landing-target/",
    "wikipedia": "https://en.wikipedia.org/wiki/SpaceX_CRS-16",
    "video_link": "https://www.youtube.com/watch?v=Esh1jHT9oTA",
    "flickr_images": [
      "https://farm5.staticflickr.com/4835/45473442624_69ee8bee45_o.jpg",
      "https://farm5.staticflickr.com/4903/45473443604_0d668c31da_o.jpg",
      "https://farm5.staticflickr.com/4858/45473444314_413a344dcb_o.jpg",
      "https://farm5.staticflickr.com/4856/45473445134_d9384878f8_o.jpg",
      "https://farm5.staticflickr.com/4840/45473446114_7d5e5d6fe2_o.jpg"
    ]
  },
  "details": "SpaceX's 16th Crew Resupply Mission on behalf of NASA, with a total of 20 contracted flights. This will bring essential supplies to the International Space Station using SpaceX's reusable Dragon spacecraft. The Falcon 9 will launch from SLC-40 at Cape Canaveral Air Force Station. During the landing of the first stage, a grid fin hydraulic pump stalled, causing the core to enter an uncontrolled roll, and resulting in a (succesful) water landing.",
  "upcoming": false,
  "static_fire_date_utc": "2018-11-30T19:57:00.000Z",
  "static_fire_date_unix": 1543607820
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
