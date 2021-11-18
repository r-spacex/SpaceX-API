# r/SpaceX API Docs

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/ed4ed700dcc55b2c1f1c)

## Disclaimer

*We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Space Exploration Technologies Corp (SpaceX), or any of its subsidiaries or its affiliates. The names SpaceX as well as related names, marks, emblems and images are registered trademarks of their respective owners.*

## Base URL

`https://api.spacexdata.com`

## Versioning

Each route is individually versioned, see route list below for all avaliable versions. The API can also be pinned to the lastest version with `https://api.spacexdata.com/latest`, but only do this if you're cool with potential breaking changes.

## Authentication

Authentication via api key is required for all destructive routes. This includes all `create`, `update`, and `delete` routes.

Authenticate by passing the header `spacex-key` with your api key. Protected routes return `401` without a valid key.

## Pagination + Custom Queries

All `/query` routes support pagination, custom queries, and other output controls.

See the [pagination + query](queries.md) guide for more details and examples.

## Launch date FAQ's

* **Why does the date appear wrong?** - This is usually due to the way we store and display partial dates in the api. For example, a launch scheduled for `2020 July` would be represented as `2020-07-01T00:00:00.000Z`. In this case, the field `date_precision` would be set as `month`, meaning the date is only valid to the `month` level, or `2020-07`

## Launch date field explanations

* `date_utc` -  UTC launch date/time in ISO 8601 format

* `date_unix` - UTC launch date/time as a UNIX timestamp in seconds

* `date_local` -  Local launch time with time zone offset in ISO 8601 format

* `date_precision` - Gives the date precision for partial dates. Valid values are `quarter`, `half`, `year`, `month`, `day`, `hour`.

* `tbd` - Set as true if date is `To be determined`

* `net` - Set as true if the date is `No earlier than`

## Caching

The api makes use of response caching via Redis for all `GET` requests, and `POST` requests on `/query` endpoints.

Standard cache times are as follows:

**launches** - 20 seconds

**capsules**, **cores**, **launchpads**, **landpads**, **crew**, **ships**, **payloads** - 5 minutes

**dragons**, **rockets** - 24 hours

Cache can be cleared with the following endpoint:

* 🔒 [Clear cache](cache/clear.md) : `DELETE /admin/cache`

## Routes

### [Capsules](capsules) - Detailed info for serialized dragon capsules

### [Company Info](company) - Detailed info about SpaceX as a company

### [Cores](cores) - Detailed info for serialized first stage cores

### [Crew](crew) - Detailed info on dragon crew members

### [Dragons](dragons) - Detailed info about dragon capsule versions

### [Landpads](landpads) - Detailed info about landing pads and ships

### [Launches](launches) - Detailed info about launches

### [Launchpads](launchpads) - Detailed info about launchpads

### [Payloads](payloads) - Detailed info about launch payloads

### [Roadster info](roadster) - Detailed info about Elon's Tesla roadster's current position

### [Rockets](rockets) - Detailed info about rocket versions

### [Ships](ships) - Detailed info about ships in the SpaceX fleet

### [Starlink](starlink) - Detailed info about Starlink satellites and orbits

Includes raw orbit data from [Space Track](https://www.space-track.org/auth/login), updated hourly.

Space Track data adheres to the standard for [Orbit Data Messages](https://public.ccsds.org/Pubs/502x0b2c1e2.pdf)

### [History](history) - Detailed info on SpaceX historical events
