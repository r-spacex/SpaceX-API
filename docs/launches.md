## Examples
Get latest launch
```http
GET https://api.spacexdata.com/v2/launches/latest
```

Get next launch
```http
GET https://api.spacexdata.com/v2/launches/next
```

Get all past launches
```http
GET https://api.spacexdata.com/v2/launches
```

Get all upcoming launches
```http
GET https://api.spacexdata.com/v2/launches/upcoming
```

Get all upcoming and past launches
```http
GET https://api.spacexdata.com/v2/launches/all
```

All launches can be filtered though any combination of the following query strings

```http
GET https://api.spacexdata.com/v2/launches?launch_year=2017&rocket_id=falcon9&core_reuse=true&core_serial=B1029
```

## Querystring Response Notes
* By default, the `/launches` endpoint returns an array of JSON objects when queried
* `/launches/next` and `/launches/latest` returns one object instead of an array, since only one launch is possible for those endpoints
* If no match is found when using querystring filtering, an empty array is returned `[]` with a 200 response code

## Query String Options
| Query Strings  | Description | Example |
| ------------- | ------------- | ------------- |
| id  | Set as `true` to show mongo document id's | `id=true` |
| flight\_id  | Filter launches by mongo document id | `flight_id=5a9fc479ab70786ba5a1eaaa` |
| order  | Change result ordering by setting values of `asc` or `desc` | `order=desc` |
| start & end  | Include both to sort by date range using any valid javascript date format | `start=2017-06-22&end=2017-06-25` |
| flight\_number  | Filter by flight number  | `flight_number=60` |
| launch\_year  | Filter by year  | `launch_year=2018` |
| launch\_date\_utc  | Filter by UTC ISO timestamp  | `launch_date_utc=2017-06-23T19:10:000Z` |
| launch\_date\_local  | Filter by local ISO timestamp  | `launch_date_local=2017-06-23T15:10:00-04:00` |
| rocket\_id  | Filter by rocket id  | `rocket_id=falconheavy` |
| rocket\_name  | Filter by rocket name  | `rocket_name=Falcon+Heavy` |
| rocket\_type  | Filter by rocket type  | `rocket_type=FT` |
| core_serial  | Filter by core serial #  | `core_serial=B1045` |
| cap_serial  | Filter by dragon capsule serial #  | `core_serial=C111` |
| core_flight  | Filter by number of previous core flights  | `core_flight=2` | 
| block  | Filter by core block number  | `block=5` |
| core_reuse  | Filter by core reusability  | `core_reuse=true` |
| side\_core1_reuse  | Filter by Falcon Heavy side core 1 reuse  | `side_core1_reuse=false` |
| side\_core2_reuse | Filter by Falcon Heavy side core 2 reuse  | `side_core2_reuse=false` |
| fairings_reuse | Filter by fairing reuse  | `fairings_reuse=false` |
| capsule_reuse  | Filter by dragon capsule reuse  | `capsule_reuse=true` |
| site_id | Filter by launch site id  | `site_id=ksc_lc_39a` |
| site_name  | Filter by launch site name  | `site_name=KSC+LC+39A` |
| site\_name_long  | Filter by long launch site name  | `site_name_long=Kennedy+Space+Center+Historic+Launch+Complex+39A` |
| payload_id  | Filter by payload id  | `payload_id=BulgariaSat-1` |
| customer | Filter by launch customer  | `customer=Bulgaria+Sat` |
| payload_type  | Filter by payload type  | `payload_type=Satellite` |
| orbit  | Filter by payload orbit  | `orbit=GTO` |
| launch_success  | Filter by successful launches | `launch_success=true` |
| reused  | Filter by launches with reused cores  | `reused=true` |
| land_success  | Filter by sucessful core landings  | `land_success=true` |
| landing_type  | Filter by landing method  | `landing_type=ASDS` |
| landing_vehicle  | Filter by landing vehicle  | `landing_vehicle=OCISLY` |
 
## HTTP Response Codes
| Code  | Description |
| ------------- | ------------- |
| 200  | Returns all launches by default |
| 404  | Returns  `Not Found` |

## Sample Response
```json
{
  "flight_number": 60,
  "mission_name": "TESS",
  "launch_year": "2018",
  "launch_date_unix": 1524091860,
  "launch_date_utc": "2018-04-18T22:51:00.000Z",
  "launch_date_local": "2018-04-18T18:51:00-04:00",
  "rocket": {
    "rocket_id": "falcon9",
    "rocket_name": "Falcon 9",
    "rocket_type": "FT",
    "first_stage": {
      "cores": [
        {
          "core_serial": "B1045",
          "flight": 1,
          "block": 4,
          "reused": false,
          "land_success": true,
          "landing_type": "ASDS",
          "landing_vehicle": "OCISLY"
        }
      ]
    },
    "second_stage": {
      "block": 4,
      "payloads": [
        {
          "payload_id": "TESS",
          "reused": false,
          "customers": [
            "NASA"
          ],
          "payload_type": "Satellite",
          "payload_mass_kg": 350,
          "payload_mass_lbs": 772,
          "orbit": "HEO",
          "orbit_params": {
            "reference_system": "highly-elliptical",
            "regime": "high-earth",
            "longitude": null,
            "semi_major_axis_km": 240000,
            "eccentricity": 0.55,
            "periapsis_km": 108000,
            "apoapsis_km": 375000,
            "inclination_deg": 37,
            "period_min": 19728,
            "lifespan_years": 10
          }
        }
      ]
    }
  },
  "telemetry": {
    "flight_club": "https://www.flightclub.io/results/?code=TESS"
  },
  "reuse": {
    "core": true,
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
    "mission_patch": "https://images2.imgbox.com/7d/2c/pYXpOVCz_o.png",
    "mission_patch_small": "https://images2.imgbox.com/ca/54/EEGqRRto_o.png",
    "reddit_campaign": "https://www.reddit.com/r/spacex/comments/88l46q/tess_launch_campaign_thread/",
    "reddit_launch": "https://www.reddit.com/r/spacex/comments/8cm61o/rspacex_tess_official_launch_discussion_updates/",
    "reddit_recovery": null,
    "reddit_media": "https://www.reddit.com/r/spacex/comments/8cmzop/rspacex_tess_media_thread_videos_images_gifs/",
    "presskit": "http://www.spacex.com/sites/spacex/files/tesspresskitfinal417.pdf",
    "article_link": "https://spaceflightnow.com/2018/04/19/all-sky-surveyor-launched-from-cape-canaveral-on-the-hunt-for-exoplanets/",
    "wikipedia": "https://en.wikipedia.org/wiki/Transiting_Exoplanet_Survey_Satellite",
    "video_link": "https://www.youtube.com/watch?v=aY-0uBIYYKk"
  },
  "details": "Part of the Explorers program, this space telescope is intended for wide-field search of exoplanets transiting nearby stars. It is the first NASA high priority science mission launched by SpaceX. It was the first time SpaceX launched a scientific satellite not primarily intended for Earth observations. The second stage placed it into a high-Earth elliptical orbit, after which the satellite's own booster will perform complex maneuvers including a lunar flyby, and over the course of two months, reach a stable, 2:1 resonant orbit with the Moon. In January 2018, SpaceX received NASA's Launch Services Program Category 2 certification of its Falcon 9 'Full Thrust', certification which is required for launching medium risk missions like TESS. It was the last launch of a new Block 4 booster, and marked the 24th successful recovery of the booster. An experimental water landing was performed in order to attempt fairing recovery."
}
```