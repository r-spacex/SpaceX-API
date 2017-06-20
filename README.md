<div align="center">

![Imgur](http://i.imgur.com/eL73Iit.png)

![Imgur](http://i.imgur.com/EdfIdgC.jpg)

# SpaceX Public JSON API
### JSON API for data about company info, vehicles, launch sites, and launch data.
<br></br>
</div>

## Usage / Endpoints
Get API info
```http
GET https://api.spacex.com
```

Get company info
```http
GET https://api.spacex.com/info
```

Get vehicle information
```http
GET https://api.spacex.com/falcon9
                          /falconheavy
                          /dragon
```

Get launches by year
```http
GET https://api.spacex.com/launches/2017
```

Get launches in a date range
```http
GET https://api.spacex.com/launches/from=01-20-2011/to=01-20-2017
```
