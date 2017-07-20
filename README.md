<div align="center">

![Imgur](http://i.imgur.com/eL73Iit.png)

![Imgur](http://i.imgur.com/5RX6fgN.jpg)

# SpaceX Data REST API

[![Build Status](https://travis-ci.org/r-spacex/SpaceX-API.svg?branch=master)](https://travis-ci.org/r-spacex/SpaceX-API)
[![GitHub release](https://img.shields.io/github/release/jakewmeyer/SpaceX-API.svg)]()
[![Language](https://img.shields.io/badge/language-Ruby-red.svg)]()
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![Platform](https://img.shields.io/badge/platform-REST--API-brightgreen.svg)]()

### REST API for data regarding company info, vehicles, launch sites, and launch data.
<br></br>

</div>

## Usage / Endpoints
See the [Wiki](https://github.com/r-spacex/SpaceX-API/wiki) for API Documentation

**Example Response**

```json
{
    "flight_number": 44,
    "launch_year": "2017",
    "launch_date_utc": "2017-07-05T23:35:00Z",
    "launch_date_local": "2017-07-05T19:35:00-04:00",
    "rocket": "Falcon 9",
    "rocket_type": "FT",
    "core_serial": "B1037",
    "cap_serial": null,
    "launch_site": {
      "site_id": "ksc_lc_39a",
      "site_name": "KSC LC 39A"
    },
    "payloads": [
      {
        "payload_id": "Intelsat 35e",
        "customer": "Intelsat",
        "payload_type": "Satelite",
        "payload_mass_kg": 6000.0,
        "payload_mass_lbs": 13227.0,
        "orbit": "GTO"
      }
    ],
    "launch_success": true,
    "reused": false,
    "land_success": false,
    "landing_type": null,
    "landing_vehicle": null,
    "links": {
      "mission_patch": "http://i.imgur.com/8URp6ea.png",
      "reddit_campaign": "https://www.reddit.com/r/spacex/comments/6fw4yy/",
      "reddit_launch": "https://www.reddit.com/r/spacex/comments/6kt2re/",
      "reddit_recovery": null,
      "reddit_media": "https://www.reddit.com/r/spacex/comments/6kt3fe/",
      "presskit": "http://www.spacex.com/sites/spacex/files/intelsat35epresskit.pdf",
      "article_link": "https://en.wikipedia.org/wiki/Intelsat_35e",
      "video_link": "https://www.youtube.com/watch?v=MIHVPCj25Z0"
    },
    "details": "Due to the constraints of sending a heavy satellite (~6,000 kg) to GTO, the rocket will fly in its expendable configuration and the first-stage booster will not be recovered."
  }
  ```

## Contributions
See the [Contribution](https://github.com/r-spacex/SpaceX-API/blob/master/CONTRIBUTING.md) guide for detailed steps

## FAQ's
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me
* For any other questions or concerns, just shoot me an email

## Technical Details
* API is using [Sinatra](http://www.sinatrarb.com/) framework
* Uses [Travis CI](https://travis-ci.org/) for testing + deployment
* All data stored in [MongoDB](https://www.mongodb.com/)
* API is deployed on [Heroku](https://www.heroku.com/)
