# Company Info

[Home](https://github.com/r-spacex/SpaceX-API/blob/master/docs/home.md) | [Launches](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches.md) | [Rockets](https://github.com/r-spacex/SpaceX-API/blob/master/docs/rocket.md) | [Capsules](https://github.com/r-spacex/SpaceX-API/blob/master/docs/capsule.md) | [Company Info](https://github.com/r-spacex/SpaceX-API/blob/master/docs/company_info.md) | [Roadster Info](https://github.com/r-spacex/SpaceX-API/blob/master/docs/roadster.md) | [Capsule Details](https://github.com/r-spacex/SpaceX-API/blob/master/docs/capsule_detail.md) | [Core Detail](https://github.com/r-spacex/SpaceX-API/blob/master/docs/core_detail.md) | [Launchpads](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launchpad.md)

# Info
Get company info
```http
GET https://api.spacexdata.com/v2/info
```

# Starman Roadster Orbital Data
Get info + orbital data for roadster
```http
GET https://api.spacexdata.com/v2/info/roadster
```
**NOTE:** Data updated every 10 minutes

# History
Get company history / milestones
```http
GET https://api.spacexdata.com/v2/info/history
```

## Querystring Response Notes
* By default, the `/info/history` endpoint returns an array of JSON objects when queried
* If no match is found when using querystring filtering, an empty array is returned `[]` with a 200 response code

## History Query String Options
| Query Strings  | Description | Example |
| ------------- | ------------- | ------------- |
| order  | Change result ordering by setting values of `asc` or `desc` | `order=desc` |
| start & end  | Include both to sort by date range using any valid javascript date format | `start=2017-06-22&end=2017-06-25` |
| flight\_number  | Filter by flight number  | `flight_number=60` |