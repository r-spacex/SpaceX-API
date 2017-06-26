<div align="center">

![Imgur](http://i.imgur.com/eL73Iit.png)

![Imgur](http://i.imgur.com/EdfIdgC.jpg)

# SpaceX JSON Data API

[![GitHub release](https://img.shields.io/github/release/jakewmeyer/SpaceX-API.svg)]()
[![Language](https://img.shields.io/badge/language-Ruby-red.svg)]()
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![Platform](https://img.shields.io/badge/platform-REST--API-brightgreen.svg)]()

### JSON API for data regarding company info, vehicles, launch sites, and launch data.
<br></br>
# Usage / Endpoints
</div>


## Basic Info
Get API info
```http
GET https://api.spacexdata.com
```
Get company info
```http
GET https://api.spacexdata.com/info
```
Get vehicle information
```http
GET https://api.spacexdata.com/vehicles
```
```http
GET https://api.spacexdata.com/vehicles/falcon9
GET https://api.spacexdata.com/vehicles/falconheavy
GET https://api.spacexdata.com/vehicles/dragon
```
Get launchpad information
```http
GET https://api.spacexdata.com/launchpads
```
## Launch information by dates
Get all launches
```http
GET https://api.spacexdata.com/launches
```
Get all future launches
```http
GET https://api.spacexdata.com/launches/upcoming
```
Get past launches by year
```http
GET https://api.spacexdata.com/launches/year=2017
```
Get past launches in a date range
```http
GET https://api.spacexdata.com/launches/from=2011-01-20/to=2017-05-25
```

## Launch info by serial #'s
Get launches by core serial #
```http
GET https://api.spacexdata.com/launches/cores/B1021
```
Get launches by capsule serial #
```http
GET https://api.spacexdata.com/launches/caps/C106
```

## Detailed info about each capsule
Get detailed info on all capsules
```http
GET https://api.spacexdata.com/parts/caps
```
Get detailed capsule information by serial #
```http
GET https://api.spacexdata.com/parts/caps/C106
```

## Detailed info about each core
Get detailed info on all cores
```http
GET https://api.spacexdata.com/parts/cores
```
Get detailed core information by serial #
```http
GET https://api.spacexdata.com/parts/cores/B1021
```

## JSON launch response example

```json
{
  "flight_number": 42,
  "launch_year": "2017",
  "launch_date": "2017-06-23",
  "time_utc": "19:10",
  "time_local": "03:10 pm EDT",
  "rocket": "Falcon 9",
  "rocket_type": "FT",
  "core_serial": "B1029",
  "cap_serial": "",
  "launch_site": "KSC LC39A",
  "payload_1": "BulgariaSat-1",
  "payload_2": "",
  "payload_type": "Satelite",
  "payload_mass_kg": 3669,
  "payload_mass_lbs": 8089,
  "orbit": "GTO",
  "customer_1": "Bulgaria Sat",
  "customer_2": "",
  "launch_success": true,
  "reused": true,
  "land_success": true,
  "landing_type": "ASDS",
  "mission_patch": "http://i.imgur.com/VAvulaO.png",
  "article_link": "https://en.wikipedia.org/wiki/BulgariaSat-1",
  "video_link": "https://www.youtube.com/watch?v=Y8mLi-rRTh8",
  "details": "Second time a booster will be reused: Second flight of B1029 after the Iridium mission of January 2017. The satellite will be the first commercial Bulgarian-owned communications satellite and it will provide television broadcasts and other communications services over southeast Europe."
},
```  
<br></br>


## FAQ's
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me
* For any other questions or concerns, just shoot me an email

## Technical Details
* API is using [Sinatra](http://www.sinatrarb.com/) as a framework in Ruby
* Launch, Capsule, and Core data implemented in [MariaDB](https://mariadb.org/)
* Vehicle, Launchpad, and Company data is stored directly in JSON
* API is deployed on [Heroku](https://www.heroku.com/)
* This repo deploys to a staging server first, so the production server might
be a few commits behind, this allows for testing, and preserves stability
