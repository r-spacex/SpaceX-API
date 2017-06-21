<div align="center">

![Imgur](http://i.imgur.com/eL73Iit.png)

![Imgur](http://i.imgur.com/EdfIdgC.jpg)

# Open Source SpaceX JSON data API

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
Get launches by year
```http
GET https://api.spacexdata.com/launches/2017
```

Get launches in a date range
```http
GET https://api.spacexdata.com/launches/from=2011-01-20/to=2017-05-25
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
