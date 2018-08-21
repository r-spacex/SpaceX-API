## Introduction
This collection of documents describes the resources and functions that make up the r/SpaceX API. The documentation uses [api blueprint](https://apiblueprint.org/) for formatting.

## API Status
See the [status](https://status.spacexdata.com) page for more details

## Authentication
No authentication is required to use this public API

## Rate Limiting
The API has a rate limit of 50 req/sec per IP address, if exceeded, a response of 429 will be given
until the rate drops back below 50 req/sec

## Pretty Printing
JSON pretty printing is turned off by default to reduce payload size. It can be enabled by including
the querystring `pretty=true` in the url
```http
GET https://api.spacexdata.com/v2/launches/latest?pretty=true
```

## Development 
[Dev Info](https://github.com/r-spacex/SpaceX-API/blob/master/docs/development.md)

## Endpoints
[Launches](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches.md)

[Rockets](https://github.com/r-spacex/SpaceX-API/blob/master/docs/rocket.md)

[Capsules](https://github.com/r-spacex/SpaceX-API/blob/master/docs/capsule.md)

[Company Info](https://github.com/r-spacex/SpaceX-API/blob/master/docs/company_info.md)

[Parts](https://github.com/r-spacex/SpaceX-API/blob/master/docs/parts.md)

[Launchpads](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launchpad.md)