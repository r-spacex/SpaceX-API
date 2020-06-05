<p align="center"><img src="https://live.staticflickr.com/65535/49185149122_37f5c52e43_k.jpg"></p>

<h1 align="center">SpaceX REST API</h1>

<p align="center">
<a href="https://circleci.com/gh/r-spacex/SpaceX-API"><img src="https://img.shields.io/circleci/project/github/r-spacex/SpaceX-API/master.svg?style=flat-square"></a>
<a href="https://hub.docker.com/r/jakewmeyer/spacex-api/"><img src="https://img.shields.io/docker/build/jakewmeyer/spacex-api.svg?longCache=true&style=flat-square"></a>
<a href="https://github.com/r-spacex/SpaceX-API/releases"><img src="https://img.shields.io/github/release/r-spacex/SpaceX-API.svg?longCache=true&style=flat-square"></a>
<a href="https://en.wikipedia.org/wiki/Representational_state_transfer"><img src="https://img.shields.io/badge/interface-REST-brightgreen.svg?longCache=true&style=flat-square"></a>
</p>

<h3 align="center">Open Source REST API for rocket, core, capsule, pad, and launch data</h3>

<h3 align="center">
<a href="docs/v4/README.md">V4 Docs (WIP)</a> - <a href="https://docs.spacexdata.com">V3 Docs</a> - <a href="docs/clients.md">Clients</a> - <a href="docs/apps.md">Apps</a> - <a href="https://status.spacexdata.com">Status</a>
<br/>
</h3>

# Usage

```http
GET https://api.spacexdata.com/v3/launches/latest
```

```json
{
  "flight_number": 94,
  "mission_name": "CCtCap Demo Mission 2",
  "mission_id": [
    "EE86F74"
  ],
  "launch_year": "2020",
  "launch_date_unix": 1590866520,
  "launch_date_utc": "2020-05-30T19:22:00.000Z",
  "launch_date_local": "2020-05-30T15:22:00-04:00",
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
          "core_serial": "B1058",
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
          "payload_id": "CCtCap Demo Mission 2",
          "norad_id": [
            45623
          ],
          "cap_serial": "C206",
          "reused": false,
          "customers": [
            "NASA (CCtCap)"
          ],
          "nationality": "United States",
          "manufacturer": "SpaceX",
          "payload_type": "Crew Dragon",
          "payload_mass_kg": 9525,
          "payload_mass_lbs": 20999.03,
          "orbit": "ISS",
          "orbit_params": {
            "reference_system": "geocentric",
            "regime": "low-earth",
            "longitude": null,
            "semi_major_axis_km": 6796.553,
            "eccentricity": 0.0001934,
            "periapsis_km": 417.104,
            "apoapsis_km": 419.732,
            "inclination_deg": 51.645,
            "period_min": 92.937,
            "lifespan_years": null,
            "epoch": "2020-06-04T12:25:56.000Z",
            "mean_motion": 15.4942176,
            "raan": 51.1727,
            "arg_of_pericenter": 27.5545,
            "mean_anomaly": 30.229
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
    "OCISLY",
    "GOQUEST",
    "GOSEARCHER",
    "GONAVIGATOR"
  ],
  "telemetry": {
    "flight_club": null
  },
  "launch_site": {
    "site_id": "ksc_lc_39a",
    "site_name": "KSC LC 39A",
    "site_name_long": "Kennedy Space Center Historic Launch Complex 39A"
  },
  "launch_success": true,
  "links": {
    "mission_patch": "https://imgur.com/sopQrl0.png",
    "mission_patch_small": "https://imgur.com/sopQrl0.png",
    "reddit_campaign": "https://www.reddit.com/r/spacex/comments/fjf6rr/dm2_launch_campaign_thread/",
    "reddit_launch": "https://www.reddit.com/r/spacex/comments/glwz6n/rspacex_cctcap_demonstration_mission_2_general",
    "reddit_recovery": "https://www.reddit.com/r/spacex/comments/gu5gkd/cctcap_demonstration_mission_2_stage_1_recovery/",
    "reddit_media": "https://www.reddit.com/r/spacex/comments/gp1gf5/rspacex_dm2_media_thread_photographer_contest/",
    "presskit": "https://www.nasa.gov/sites/default/files/atoms/files/commercialcrew_press_kit.pdf",
    "article_link": "https://spaceflightnow.com/2020/05/30/nasa-astronauts-launch-from-us-soil-for-first-time-in-nine-years/",
    "wikipedia": "https://en.wikipedia.org/wiki/Crew_Dragon_Demo-2",
    "video_link": "https://youtu.be/xY96v0OIcK4",
    "youtube_id": "xY96v0OIcK4",
    "flickr_images": [
      "https://live.staticflickr.com/65535/49927519643_b43c6d4c44_o.jpg",
      "https://live.staticflickr.com/65535/49927519588_8a39a3994f_o.jpg",
      "https://live.staticflickr.com/65535/49928343022_6fb33cbd9c_o.jpg",
      "https://live.staticflickr.com/65535/49934168858_cacb00d790_o.jpg",
      "https://live.staticflickr.com/65535/49934682271_fd6a31becc_o.jpg",
      "https://live.staticflickr.com/65535/49956109906_f88d815772_o.jpg",
      "https://live.staticflickr.com/65535/49956109706_cffa847208_o.jpg",
      "https://live.staticflickr.com/65535/49956109671_859b323ede_o.jpg",
      "https://live.staticflickr.com/65535/49955609618_4cca01d581_o.jpg",
      "https://live.staticflickr.com/65535/49956396622_975c116b71_o.jpg",
      "https://live.staticflickr.com/65535/49955609378_9b77e5c771_o.jpg",
      "https://live.staticflickr.com/65535/49956396262_ef41c1d9b0_o.jpg"
    ]
  },
  "details": "SpaceX will launch the second demonstration mission of its Crew Dragon vehicle as part of NASA's Commercial Crew Transportation Capability Program (CCtCap), carryingNASA astronauts Doug Hurley and Bob Behnken to the International Space Station. This mission will be the first crewed flight to launch from the United States since the end of the Space Shuttle program in 2011. DM-2 demonstrates the Falcon 9 and Crew Dragon's ability to safely transport crew to and from the space station. The booster for this mission will land on OCISLY. The mission will be complete with the safe return the Dragon capsule and astronauts.",
  "upcoming": false,
  "static_fire_date_utc": "2020-05-22T17:39:00.000Z",
  "static_fire_date_unix": 1590169140,
  "last_date_update": "2020-05-27T20:18:43.000Z",
  "last_ll_launch_date": null,
  "last_ll_update": null,
  "last_wiki_launch_date": "2020-05-30T19:22:00.000Z",
  "last_wiki_revision": "42717cfb-a057-11ea-9907-0e24e339ee49",
  "last_wiki_update": "2020-05-27T20:18:43.000Z",
  "launch_date_source": "wiki"
}
```

## Sponsors
[![Studio 3T](https://imgur.com/ZuHz5Fk.png)](https://studio3t.com/)

## FAQ's
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me
* For any other questions or concerns, just shoot me an email
