<p align="center"><img src="https://i.imgur.com/foNO0Tn.jpg"></p>

<h1 align="center">SpaceX REST API</h1>

<p align="center">
<a href="https://circleci.com/gh/r-spacex/SpaceX-API"><img src="https://circleci.com/gh/r-spacex/SpaceX-API.svg?style=svg"></a>
<a href="https://hub.docker.com/r/jakewmeyer/spacex-api/"><img src="https://img.shields.io/docker/build/jakewmeyer/spacex-api.svg?longCache=true&style=flat"></a>
<a href="https://github.com/r-spacex/SpaceX-API/releases"><img src="https://img.shields.io/github/release/r-spacex/SpaceX-API.svg?longCache=true&style=flat"></a>
<a href="https://en.wikipedia.org/wiki/Representational_state_transfer"><img src="https://img.shields.io/badge/interface-REST-brightgreen.svg?longCache=true&style=flat"></a>
</p>

<h3 align="center">Open Source REST API for rocket, core, capsule, pad, and launch data</h3>

## Documentation
* See the [Docs](https://documenter.getpostman.com/view/2025350/RWaEzAiG) for full  V3 API Documentation

## Postman Collection
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3aeac01a548a87943749)

## Usage

**Example Response**

```bash
curl -s https://api.spacexdata.com/v3/launches/latest | jq
```

```json
{
  "flight_number": 69,
  "mission_name": "SAOCOM 1A",
  "mission_id": [],
  "launch_year": "2018",
  "launch_date_unix": 1538965320,
  "launch_date_utc": "2018-10-08T02:22:00.000Z",
  "launch_date_local": "2018-10-07T19:22:00-07:00",
  "is_tentative": false,
  "tentative_max_precision": "hour",
  "rocket": {
    "rocket_id": "falcon9",
    "rocket_name": "Falcon 9",
    "rocket_type": "FT",
    "first_stage": {
      "cores": [
        {
          "core_serial": "B1048",
          "flight": 2,
          "block": 5,
          "reused": true,
          "land_success": true,
          "landing_intent": true,
          "landing_type": "RTLS",
          "landing_vehicle": "LZ-4"
        }
      ]
    },
    "second_stage": {
      "block": 5,
      "payloads": [
        {
          "payload_id": "SAOCOM 1A",
          "norad_id": [
            43641
          ],
          "reused": false,
          "customers": [
            "CONAE"
          ],
          "nationality": "Argentina",
          "manufacturer": "INVAP",
          "payload_type": "Satellite",
          "payload_mass_kg": 2800,
          "payload_mass_lbs": 6172.94,
          "orbit": "SSO",
          "orbit_params": {
            "reference_system": "geocentric",
            "regime": "sun-synchronous",
            "longitude": null,
            "semi_major_axis_km": 6998.678,
            "eccentricity": 0.0018839,
            "periapsis_km": 607.358,
            "apoapsis_km": 633.728,
            "inclination_deg": 97.8996,
            "period_min": 97.114,
            "lifespan_years": 5,
            "epoch": "2018-10-08T04:06:00.000Z",
            "mean_motion": 14.82786712,
            "raan": 106.0457,
            "arg_of_pericenter": 244.3969,
            "mean_anomaly": 261.797
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
  "ships": [],
  "telemetry": {
    "flight_club": "https://www.flightclub.io/result/2d?code=SAOCOM1A"
  },
  "launch_site": {
    "site_id": "vafb_slc_4e",
    "site_name": "VAFB SLC 4E",
    "site_name_long": "Vandenberg Air Force Base Space Launch Complex 4E"
  },
  "launch_success": true,
  "links": {
    "mission_patch": "https://images2.imgbox.com/66/d2/oVB1ofaZ_o.png",
    "mission_patch_small": "https://images2.imgbox.com/ae/11/H85gskPQ_o.png",
    "reddit_campaign": "https://www.reddit.com/r/spacex/comments/9fwj9o/saocom_1a_launch_campaign_thread/",
    "reddit_launch": "https://www.reddit.com/r/spacex/comments/9lazvr/rspacex_saocom_1a_official_launch_discussion/",
    "reddit_recovery": null,
    "reddit_media": "https://www.reddit.com/r/spacex/comments/9m3ly5/rspacex_saocom_1a_media_thread_videos_images_gifs/",
    "presskit": "https://www.spacex.com/sites/spacex/files/saocom1apresskit.pdf",
    "article_link": "https://spaceflightnow.com/2018/10/08/spacex-aces-first-rocket-landing-in-california-after-launching-argentine-satellite/",
    "wikipedia": "https://en.wikipedia.org/wiki/SAOCOM",
    "video_link": "https://www.youtube.com/watch?v=vr_C6LQ7mHc",
    "flickr_images": [
      "https://farm2.staticflickr.com/1940/44262177535_9582184d3f_o.jpg",
      "https://farm2.staticflickr.com/1917/30234800687_fd94fde151_o.jpg",
      "https://farm2.staticflickr.com/1951/30234801997_b5a65426ca_o.jpg",
      "https://farm2.staticflickr.com/1910/44262169525_e4c6b27299_o.jpg",
      "https://farm2.staticflickr.com/1923/44451125454_8d26929d0b_o.jpg",
      "https://farm2.staticflickr.com/1914/44262170545_22fe55d4bb_o.jpg",
      "https://farm2.staticflickr.com/1934/44262166295_3f84597f09_o.jpg"
    ]
  },
  "details": "SpaceX's seventeenth flight of 2018 will be the first launch of the Saocom Earth observation satellite constellation of the Argentine Space Agency CONAE. The second launch of Saocom 1B will happen in 2019. This flight will mark the first RTLS launch out of Vandenberg, with a landing on the concrete pad at SLC-4W, very close to the launch pad.",
  "upcoming": false,
  "static_fire_date_utc": "2018-10-02T21:00:00.000Z",
  "static_fire_date_unix": 1538514000
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

## Old V2 docs
* API V2 will be available indefinitely, but will no longer receive new feature updates.
* V2 data will still be updated
* V2 docs will no longer be updated
* Old V2 docs located [here](https://github.com/r-spacex/SpaceX-API/tree/master/docs)

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
