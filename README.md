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
</div>

## Usage / Endpoints
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
Get all past launches
```http
GET https://api.spacexdata.com/launches
```
Get launches by core serial #
```http
GET https://api.spacexdata.com/launches/core=B1021
```
Get launches by capsule serial #
```http
GET https://api.spacexdata.com/launches/cap=C106
```
Get detailed capsule information by serial #
```http
GET https://api.spacexdata.com/parts/cap=C106
```
Get detailed info on all capsules
```http
GET https://api.spacexdata.com/parts/caps
```
Get detailed core information by serial #
```http
GET https://api.spacexdata.com/parts/core=B1021
```
Get detailed info on all cores
```http
GET https://api.spacexdata.com/parts/cores
```
Get past launches by year
```http
GET https://api.spacexdata.com/launches/year=2017
```
Get past launches in a date range
```http
GET https://api.spacexdata.com/launches/from=2011-01-20/to=2017-05-25
```

Example JSON Response for a launch
```json
{
    "flight_number": 28,
    "launch_year": 2016,
    "launch_date": "2016-04-08",
    "time_utc": "20:43",
    "rocket": "Falcon 9",
    "rocket_type": "FT",
    "launch_site": "CCAFS LC-40",
    "payload_1": "SpaceX CRS-8",
    "payload_2": "",
    "payload_type": "Dragon 1.1",
    "payload_mass_kg": "3136",
    "payload_mass_lbs": "6914",
    "orbit": "LEO",
    "customer_1": "NASA (CRS)",
    "customer_2": "",
    "launch_success": "Success",
    "reused": "FALSE",
    "land_success": "Success",
    "landing_type": "ASDS",
    "article_link": "https://en.wikipedia.org/wiki/SpaceX_CRS-8",
    "video_link": "https://www.youtube.com/watch?v=7pUAydjne5M",
    "Details": "Dragon carried over 1500 kg of supplies and delivered (stowed in its trunk) the inflatable Bigelow Expandable Activity Module (BEAM) to the ISS for two years of in-orbit tests. The rocket's first stage landed smoothly on SpaceX's autonomous spaceport drone ship 9 minutes after liftoff, making this the first ever successful landing of a rocket booster on a ship at sea as part of an orbital launch. The first stage B1021 was later also the first orbital booster to be used again, when launching SES-10 on March 30, 2017."
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
