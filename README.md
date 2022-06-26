<p align="center"><img src="https://live.staticflickr.com/65535/49185149122_37f5c52e43_k.jpg"></p>

<h1 align="center">SpaceX REST API</h1>

<h3 align="center">
Open Source REST API for launch, rocket, core, capsule, starlink, launchpad, and landing pad data.
</h3>

<p align="center">
<a href="https://github.com/r-spacex/SpaceX-API/actions?query=workflow%3ATest"><img src="https://img.shields.io/github/workflow/status/r-spacex/SpaceX-API/Test?style=flat-square"></a>
<a href="https://hub.docker.com/r/jakewmeyer/spacex-api/"><img src="https://img.shields.io/docker/pulls/jakewmeyer/spacex-api?style=flat-square"></a>
<a href="https://github.com/r-spacex/SpaceX-API/releases"><img src="https://img.shields.io/github/release/r-spacex/SpaceX-API.svg?longCache=true&style=flat-square"></a>
<a href="https://en.wikipedia.org/wiki/Representational_state_transfer"><img src="https://img.shields.io/badge/interface-REST-brightgreen.svg?longCache=true&style=flat-square"></a>
</p>

<h4 align="center">
  <i>
    We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Space Exploration Technologies Corp (SpaceX), or any of its subsidiaries or its affiliates. The names SpaceX as well as related names, marks, emblems and images are registered trademarks of their respective owners.
  </i>
</h4>

<h3 align="center">
<a href="docs/README.md">Docs</a> - <a href="docs/clients.md">API Clients</a> - <a href="docs/apps.md">Apps</a> - <a href="https://status.spacexdata.com">Status</a> - <a href="https://backups.spacexdata.com">Database Exports</a>
<br/>
</h3>

## Usage

```
GET https://api.spacexdata.com/v5/launches/latest
```

```json
{
  "fairings": null,
  "links": {
    "patch": {
      "small": "https://images2.imgbox.com/eb/0f/Vev7xkUX_o.png",
      "large": "https://images2.imgbox.com/ab/79/Wyc9K7fv_o.png"
    },
    "reddit": {
      "campaign": "https://www.reddit.com/r/spacex/comments/fjf6rr/dm2_launch_campaign_thread/",
      "launch": "https://www.reddit.com/r/spacex/comments/glwz6n/rspacex_cctcap_demonstration_mission_2_general",
      "media": "https://www.reddit.com/r/spacex/comments/gp1gf5/rspacex_dm2_media_thread_photographer_contest/",
      "recovery": "https://www.reddit.com/r/spacex/comments/gu5gkd/cctcap_demonstration_mission_2_stage_1_recovery/"
    },
    "flickr": {
      "small": [],
      "original": [
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
    "presskit": "https://www.nasa.gov/sites/default/files/atoms/files/commercialcrew_press_kit.pdf",
    "webcast": "https://youtu.be/xY96v0OIcK4",
    "youtube_id": "xY96v0OIcK4",
    "article": "https://spaceflightnow.com/2020/05/30/nasa-astronauts-launch-from-us-soil-for-first-time-in-nine-years/",
    "wikipedia": "https://en.wikipedia.org/wiki/Crew_Dragon_Demo-2"
  },
  "static_fire_date_utc": "2020-05-22T17:39:00.000Z",
  "static_fire_date_unix": 1590169140,
  "tdb": false,
  "net": false,
  "window": 0,
  "rocket": "5e9d0d95eda69973a809d1ec",
  "success": true,
  "failures": [],
  "details": "SpaceX will launch the second demonstration mission of its Crew Dragon vehicle as part of NASA's Commercial Crew Transportation Capability Program (CCtCap), carrying two NASA astronauts to the International Space Station. Barring unexpected developments, this mission will be the first crewed flight to launch from the United States since the end of the Space Shuttle program in 2011. DM-2 demonstrates the Falcon 9 and Crew Dragon's ability to safely transport crew to the space station and back to Earth and it is the last major milestone for certification of Crew Dragon. Initially the mission duration was planned to be no longer than two weeks, however NASA has been considering an extension to as much as six weeks or three months. The astronauts have been undergoing additional training for the possible longer mission.",
  "crew": [
    "5ebf1b7323a9a60006e03a7b",
    "5ebf1a6e23a9a60006e03a7a"
  ],
  "ships": [
    "5ea6ed30080df4000697c913",
    "5ea6ed2f080df4000697c90b",
    "5ea6ed2f080df4000697c90c",
    "5ea6ed2e080df4000697c909",
    "5ea6ed2f080df4000697c90d"
  ],
  "capsules": [
    "5e9e2c5df359188aba3b2676"
  ],
  "payloads": [
    "5eb0e4d1b6c3bb0006eeb257"
  ],
  "launchpad": "5e9e4502f509094188566f88",
  "auto_update": true,
  "flight_number": 94,
  "name": "CCtCap Demo Mission 2",
  "date_utc": "2020-05-30T19:22:00.000Z",
  "date_unix": 1590866520,
  "date_local": "2020-05-30T15:22:00-04:00",
  "date_precision": "hour",
  "upcoming": false,
  "cores": [
    {
      "core": "5e9e28a7f3591817f23b2663",
      "flight": 1,
      "gridfins": true,
      "legs": true,
      "reused": false,
      "landing_attempt": true,
      "landing_success": true,
      "landing_type": "ASDS",
      "landpad": "5e9e3032383ecb6bb234e7ca"
    }
  ],
  "id": "5eb87d46ffd86e000604b388"
}
```

## Cron Job Status

<p align="left">
<img src="https://healthchecks.io/badge/a99e6369-9795-417e-9a1c-31ea91/zDDqPvw1-2/Capsules.svg">
<br/>
<img src="https://healthchecks.io/badge/a99e6369-9795-417e-9a1c-31ea91/iJIWcg9u-2/Cores.svg">
<br/>
<img src="https://healthchecks.io/badge/a99e6369-9795-417e-9a1c-31ea91/soA1Z2t1-2/Landpads.svg">
<br/>
<img src="https://healthchecks.io/badge/a99e6369-9795-417e-9a1c-31ea91/tc7aK4Iw-2/Launchpads.svg">
<br/>
<img src="https://healthchecks.io/badge/a99e6369-9795-417e-9a1c-31ea91/uB7PIyUo-2/Past-Launches.svg">
<br/>
<img src="https://healthchecks.io/badge/a99e6369-9795-417e-9a1c-31ea91/bQw1ZrmZ-2/Payloads.svg">
<br/>
<img src="https://healthchecks.io/badge/a99e6369-9795-417e-9a1c-31ea91/HhIoHcF6-2/Roadster.svg">
<br/>
<img src="https://healthchecks.io/badge/a99e6369-9795-417e-9a1c-31ea91/wPz7gFQJ-2/Starlink.svg">
<br/>
<img src="https://healthchecks.io/badge/a99e6369-9795-417e-9a1c-31ea91/3L5HxZKX-2/Upcoming-Launches.svg">
<br/>
<img src="https://healthchecks.io/badge/a99e6369-9795-417e-9a1c-31ea91/YvnZYkED-2/Webcast.svg">
<br/>
<img src="https://healthchecks.io/badge/a99e6369-9795-417e-9a1c-31ea91/_Z-lNpev-2/launch-library-v2.svg">
</p>

## Sponsors

### [Studio 3T](https://studio3t.com/)

[![Studio 3T](https://imgur.com/DbJSfAo.png)](https://studio3t.com/)

## FAQ's

* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* For any other questions or concerns, just shoot me an email.
