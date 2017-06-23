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
GET https://api.spacexdata.com/vehicles/falcon9
GET https://api.spacexdata.com/vehicles/falconheavy
GET https://api.spacexdata.com/vehicles/dragon
```
Get launch site information
```http
GET https://api.spacexdata.com/sites
```
## Launch information by dates
Get all past launches
```http
GET https://api.spacexdata.com/launches
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
GET https://api.spacexdata.com/launches/core=B1021
```
Get launches by capsule serial #
```http
GET https://api.spacexdata.com/launches/cap=C106
```

## Detailed info about each capsule
Get detailed info on all capsules
```http
GET https://api.spacexdata.com/parts/caps
```
Get detailed capsule information by serial #
```http
GET https://api.spacexdata.com/parts/cap=C106
```

## Detailed info about each core
Get detailed info on all cores
```http
GET https://api.spacexdata.com/parts/cores
```
Get detailed core information by serial #
```http
GET https://api.spacexdata.com/parts/core=B1021
```
<br></br>
Example JSON Response for a launch
```json
{
  "flight_number": 38,
  "launch_year": 2017,
  "launch_date": "2017-03-30",
  "time_utc": "22:27",
  "time_local": "",
  "rocket": "Falcon 9",
  "rocket_type": "FT",
  "core_serial": "B1021",
  "cap_serial": "",
  "launch_site": "KSC LC39A",
  "payload_1": "SES-10",
  "payload_2": "",
  "payload_type": "Satelite",
  "payload_mass_kg": "5300",
  "payload_mass_lbs": "11700",
  "orbit": "GTO",
  "customer_1": "SES",
  "customer_2": "",
  "launch_success": "Success",
  "reused": "FALSE",
  "land_success": "Success",
  "landing_type": "ASDS",
  "article_link": "https://en.wikipedia.org/wiki/SES-10",
  "video_link": "https://www.youtube.com/watch?v=xsZSXav4wI8",
  "details": "First payload to fly on a reused first stage, B1021, previously launched with CRS-8, which also landed a second time. In what is also a first, the payload fairing remained intact after a successful splashdown achieved with thrusters and a steerable parachute."
}
```  
<br></br>


## FAQ's / Contact
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* All data and photos are property of Space Exploration Technologies Corporation (SpaceX)
* I am not affiliated with SpaceX in any way, shape, form, or fashion. Just a fun side project for me.
* For any other questions or concerns, just shoot me an email.

## Technical Details
* API is using [Sinatra](http://www.sinatrarb.com/) as a framework in Ruby
* Launch data is implemented in MySQL
* Static data is stored as JSON
* API is deployed on [Heroku](https://www.heroku.com/)
