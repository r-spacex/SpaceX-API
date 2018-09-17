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
* V3 docs preview located [here](https://documenter.getpostman.com/view/2025350/RWaEzAiG)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3aeac01a548a87943749)

## Usage

**Example Response**

```bash
curl -s https://api.spacexdata.com/v2/launches/latest | jq
```

```json
{
  "flight_number": 68,
  "mission_name": "Telstar 18V",
  "mission_id": [
    "F4F83DE"
  ],
  "launch_year": "2018",
  "launch_date_unix": 1536554700,
  "launch_date_utc": "2018-09-10T04:45:00.000Z",
  "launch_date_local": "2018-09-10T00:45:00-04:00",
  "is_tentative": false,
  "tentative_max_precision": "hour",
  "rocket": {
    "rocket_id": "falcon9",
    "rocket_name": "Falcon 9",
    "rocket_type": "FT",
    "first_stage": {
      "cores": [
        {
          "core_serial": "B1049",
          "flight": 1,
          "block": 5,
          "reused": false,
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
          "payload_id": "Telstar 18V",
          "norad_id": [
            43611
          ],
          "reused": false,
          "customers": [
            "Telesat"
          ],
          "nationality": "Canada",
          "manufacturer": "SSL",
          "payload_type": "Satellite",
          "payload_mass_kg": 7060,
          "payload_mass_lbs": 15564.64,
          "orbit": "GTO",
          "orbit_params": {
            "reference_system": "geocentric",
            "regime": "geostationary",
            "longitude": 138,
            "semi_major_axis_km": 7226.647,
            "eccentricity": 0.0013608,
            "periapsis_km": 838.677,
            "apoapsis_km": 858.346,
            "inclination_deg": 98.8086,
            "period_min": 101.897,
            "lifespan_years": 15,
            "epoch": "2018-09-07T06:29:40.000Z",
            "mean_motion": 14.13180055,
            "raan": 322.194,
            "arg_of_pericenter": 130.3173,
            "mean_anomaly": 328.1487
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
    "OCISLY",
    "HAWK",
    "GOQUEST"
  ],
  "telemetry": {
    "flight_club": "https://www.flightclub.io/result/2d?code=T18V"
  },
  "reuse": {
    "core": false,
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
    "mission_patch": "https://images2.imgbox.com/ba/db/3plcm5IB_o.png",
    "mission_patch_small": "https://images2.imgbox.com/2d/d2/jStsqeLC_o.png",
    "reddit_campaign": "https://www.reddit.com/r/spacex/comments/95cte4/telstar_18v_apstar_5c_launch_campaign_thread/",
    "reddit_launch": "https://www.reddit.com/r/spacex/comments/9e7bmq/rspacex_telstar_18v_official_launch_discussion/",
    "reddit_recovery": "https://www.reddit.com/r/spacex/comments/9erxlh/telstar_18_vantage_recovery_thread/",
    "reddit_media": "https://www.reddit.com/r/spacex/comments/9ebkqw/rspacex_telstar_18v_media_thread_videos_images/",
    "presskit": "https://www.spacex.com/sites/spacex/files/telstar18vantagepresskit.pdf",
    "article_link": "https://spaceflightnow.com/2018/09/10/spacex-telesat-achieve-repeat-success-with-midnight-hour-launch/",
    "wikipedia": "https://en.wikipedia.org/wiki/Telstar_18V",
    "video_link": "https://www.youtube.com/watch?v=Apw3xqwsG1U",
    "flickr_images": [
      "https://farm2.staticflickr.com/1878/43690848045_492ef182dd_o.jpg",
      "https://farm2.staticflickr.com/1856/43881229604_6d42e838b6_o.jpg",
      "https://farm2.staticflickr.com/1852/43881223704_93777e34af_o.jpg",
      "https://farm2.staticflickr.com/1841/43881217094_558b7b214e_o.jpg",
      "https://farm2.staticflickr.com/1869/43881193934_423eff8c86_o.jpg"
    ]
  },
  "details": "SpaceX's sixteenth mission of 2018 will be the launch of Telstar 18V / APStar 5C to GTO for Telesat and APStar. Telesat signed a contract with SSL in December 2015 for the construction of the satellite. It is based on the SSL-1300 bus with an electrical output of approximately 14 kW. The new satellite will operate from 138° East and significantly expand Telesat’s capacity over the Asia Pacific region through a combination of broad regional beams and high throughput spot-beams. Telesat also announced it has entered into an agreement with APT Satellite Company Limited (APSTAR) under which APSTAR will make use of capacity on Telstar-18-VANTAGE to serve its growing base of customers. This agreement extends the long term relationship between APSTAR and Telesat that has existed for more than a decade. Equipped with C and Ku-band transponders, Telstar 18 VANTAGE will offer superior performance for broadcasters, telecom service providers and enterprise networks on the ground, in the air and at sea. Its broad C-band coverage will extend across the Asia region to Hawaii enabling direct connectivity between any point in Asia and the Americas. Its Ku-band capacity will expand on Telesat’s coverage of growing satellite service markets in China, Mongolia, Southeast Asia, and the Pacific Ocean.",
  "upcoming": false,
  "static_fire_date_utc": "2018-09-05T07:21:00.000Z",
  "static_fire_date_unix": 1536132060
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
