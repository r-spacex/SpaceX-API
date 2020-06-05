<p align="center"><img src="https://live.staticflickr.com/65535/49185149122_37f5c52e43_k.jpg"></p>

<h1 align="center">SpaceX REST API</h1>

<p align="center">
<a href="https://circleci.com/gh/r-spacex/SpaceX-API"><img src="https://img.shields.io/circleci/project/github/r-spacex/SpaceX-API/master.svg?style=flat-square"></a>
<a href="https://hub.docker.com/r/jakewmeyer/spacex-api/"><img src="https://img.shields.io/docker/build/jakewmeyer/spacex-api.svg?longCache=true&style=flat-square"></a>
<a href="https://hub.docker.com/r/jakewmeyer/spacex-api/"><img src="https://img.shields.io/docker/pulls/jakewmeyer/spacex-api?style=flat-square"></a>
<a href="https://github.com/r-spacex/SpaceX-API/releases"><img src="https://img.shields.io/github/release/r-spacex/SpaceX-API.svg?longCache=true&style=flat-square"></a>
<a href="https://en.wikipedia.org/wiki/Representational_state_transfer"><img src="https://img.shields.io/badge/interface-REST-brightgreen.svg?longCache=true&style=flat-square"></a>
</p>

<h3 align="center">Open Source REST API for rocket, core, capsule, pad, and launch data</h3>

<h3 align="center">
<a href="docs/v4/README.md">V4 Docs (WIP)</a> - <a href="https://docs.spacexdata.com">V3 Docs</a> - <a href="docs/clients.md">Clients</a> - <a href="docs/apps.md">Apps</a> - <a href="https://status.spacexdata.com">Status</a>
<br/>
</h3>

## Usage

```http
GET https://api.spacexdata.com/v3/launches/latest
```

```json
{
   "flight_number": 95,
   "mission_name": "Starlink 7",
   "mission_id": [

   ],
   "launch_year": "2020",
   "launch_date_unix": 1591233900,
   "launch_date_utc": "2020-06-04T01:25:00.000Z",
   "launch_date_local": "2020-06-03T21:25:00-04:00",
   "is_tentative": false,
   "tentative_max_precision": "hour",
   "tbd": false,
   "launch_window": null,
   "rocket": {
      "rocket_id": "falcon9",
      "rocket_name": "Falcon 9",
      "rocket_type": "FT",
      "first_stage": {
         "cores": [
            {
               "core_serial": "B1049",
               "flight": 5,
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
               "payload_id": "Starlink 7",
               "norad_id": [

               ],
               "reused": false,
               "customers": [
                  "SpaceX"
               ],
               "nationality": "United States",
               "manufacturer": "SpaceX",
               "payload_type": "Satellite",
               "payload_mass_kg": 15400,
               "payload_mass_lbs": 33951.2,
               "orbit": "VLEO",
               "orbit_params": {
                  "reference_system": "geocentric",
                  "regime": "very-low-earth",
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
            }
         ]
      },
      "fairings": {
         "reused": false,
         "recovery_attempt": true,
         "recovered": null,
         "ship": "GOMSTREE"
      }
   },
   "ships": [

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
      "mission_patch": "https://images2.imgbox.com/d2/3b/bQaWiil0_o.png",
      "mission_patch_small": "https://images2.imgbox.com/9a/96/nLppz9HW_o.png",
      "reddit_campaign": "https://www.reddit.com/r/spacex/comments/gamcbr/starlink7_launch_campaign_thread/",
      "reddit_launch": "https://www.reddit.com/r/spacex/comments/gkfe30/rspacex_starlink_7_official_launch_discussion/",
      "reddit_recovery": null,
      "reddit_media": null,
      "presskit": "https://spacextimemachine.com/assets/press_kits/185.pdf",
      "article_link": null,
      "wikipedia": null,
      "video_link": "https://youtu.be/y4xBFHjkUvw",
      "youtube_id": "y4xBFHjkUvw",
      "flickr_images": [
         "https://live.staticflickr.com/65535/49971196871_a0462d0084_o.jpg",
         "https://live.staticflickr.com/65535/49970682603_e6333945ee_o.jpg"
      ]
   },
   "details": "This mission will launch the seventh batch of operational Starlink satellites, which are expected to be version 1.0, from SLC-40, Cape Canaveral AFS. It is the eighth Starlink launch overall. The satellites will be delivered to low Earth orbit and will spend a few weeks maneuvering to their operational altitude of 550 km. The booster for this mission is expected to land on JRTI on its first mission since arriving at Port Canaveral.",
   "upcoming": false,
   "static_fire_date_utc": "2020-05-13T11:11:00.000Z",
   "static_fire_date_unix": 1589368260,
   "timeline": null,
   "crew": null,
   "last_date_update": "2020-06-03T15:45:37.000Z",
   "last_ll_launch_date": "2020-06-04T01:25:00.000Z",
   "last_ll_update": "2020-06-03T15:45:37.000Z",
   "last_wiki_launch_date": "2020-06-04T01:25:00.000Z",
   "last_wiki_revision": "f7d37887-a36e-11ea-8ba2-0e4dda687887",
   "last_wiki_update": "2020-05-31T18:45:59.000Z",
   "launch_date_source": "launch_library"
}
```

## Sponsors
[![Studio 3T](https://imgur.com/ZuHz5Fk.png)](https://studio3t.com/)

## FAQ's
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me
* For any other questions or concerns, just shoot me an email
