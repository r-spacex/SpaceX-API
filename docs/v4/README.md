# r/SpaceX API Docs

## Base URL

`https://api.spacexdata.com/v4`

## Authentication

Authentication via api key is required for all destructive routes. This includes all `create`, `update`, and `delete` routes.

Authenticate by passing the header `spacex-key` with your api key. Protected routes return `401` without a valid key.

## Pagination + Querying

All `/query` routes support pagination parameters via [mongoose-paginate](https://github.com/aravindnc/mongoose-paginate-v2).

By default the body is:
```json
{
  "query": {},
  "options": {},
}
```

`query` accepts any valid MongoDB find() query, documented [here](https://docs.mongodb.com/manual/tutorial/query-documents/)

See [examples](examples.md) for some common queries

**Note:** The [$where](https://docs.mongodb.com/manual/reference/operator/query/where/) operator is not supported in `query`. [$expr](https://docs.mongodb.com/manual/reference/operator/query/expr/) should be used instead for complex query expressions

`options` accepts any of the options documented [here](https://github.com/aravindnc/mongoose-paginate-v2#modelpaginatequery-options-callback), but here are some of the most common:

  - `select` { Object | String } - Fields to return (by default returns all fields). [Documentation](http://mongoosejs.com/docs/api.html#query_Query-select)
  - `sort` { Object | String } - Sort order. [Documentation](http://mongoosejs.com/docs/api.html#query_Query-sort)
  - `offset` { Number } - Use `offset` or `page` to set skip position
  - `page` { Number }
  - `limit` { Number }
  - `pagination` { Boolean } - If set to false, it will return all docs without adding limit condition. (Default: True)

This is the default return structure:
```json
{
    "docs": [],
    "totalDocs": 0,
    "offset": 0,
    "limit": 10,
    "totalPages": 1,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevPage": null,
    "nextPage": null
}
```

## Caching

The api makes use of response caching via Redis for all `GET` requests, and `POST` requests on `/query` endpoints.

Standard cache times are as follows:

**launches** - 20 seconds

**capsules**, **cores**, **launchpads**, **landpads**, **crew**, **ships**, **payloads** - 5 minutes

**dragons**, **rockets** - 24 hours

Cache can be cleared with the following endpoint:
* [Clear cache](cache/clear.md) : `DELETE /admin/cache` - Auth required

## Routes

### Capsules

Detailed info for serialized dragon capsules

* [Get all capsules](capsules/get.md) : `GET /capsules`
* [Get one capsule](capsules/one.md) : `GET /capsules/:id`
* [Query capsules](capsules/query.md) : `POST /capsules/query`
* [Create a capsule](capsules/create.md) : `POST /capsules`
* [Update a capsule](capsules/update.md) : `PATCH /capsules/:id`
* [Delete a capsule](capsules/delete.md) : `DELETE /capsules/:id`

### Cores

Detailed info for serialized first stage cores

* [Get all cores](cores/get.md) : `GET /cores`
* [Get one core](cores/one.md) : `GET /v4/cores/:id`
* [Query cores](cores/query.md) : `POST /cores/query`
* [Create a core](cores/create.md) : `POST /cores`
* [Update a core](cores/update.md) : `PATCH /cores/:id`
* [Delete a core](cores/delete.md) : `DELETE /cores/:id`

### Crew

Detailed info on dragon crew members

* [Get all crew members](crew/get.md) : `GET /crew`
* [Get one crew member](crew/one.md) : `GET /crew/:id`
* [Query crew members](crew/query.md) : `POST /crew/query`
* [Create a crew member](crew/create.md) : `POST /crew`
* [Update a crew member](crew/update.md) : `PATCH /crew/:id`
* [Delete a crew member](crew/delete.md) : `DELETE /crew/:id`

### Dragons

Detailed info about dragon capsule versions

* [Get all dragons](dragons/get.md) : `GET /dragons`
* [Get one dragon](dragons/one.md) : `GET /dragons/:id`
* [Query dragons](dragons/query.md) : `POST /dragons/query`
* [Create a dragon](dragons/create.md) : `POST /dragons`
* [Update a dragon](dragons/update.md) : `PATCH /dragons/:id`
* [Delete a dragon](dragons/delete.md) : `DELETE /dragons/:id`

### Landpads

Detailed info about landing pads and ships

* [Get all landpads](landpads/get.md) : `GET /landpads`
* [Get one landpad](landpads/one.md) : `GET /landpads/:id`
* [Query landpads](landpads/query.md) : `POST /landpads/query`
* [Create a landpad](landpads/create.md) : `POST /landpads`
* [Update a landpad](landpads/update.md) : `PATCH /landpads/:id`
* [Delete a landpad](landpads/delete.md) : `DELETE /landpads/:id`

### Launches

Detailed info about launches

* [Get past launches](launches/past.md) : `GET /launches/past`
* [Get upcoming launches](launches/upcoming.md) : `GET /launches/upcoming`
* [Get latest launches](launches/latest.md) : `GET /launches/latest`
* [Get next launches](launches/next.md) : `GET /launches/next`
* [Get all launches](launches/get.md) : `GET /launches`
* [Get one launch](launches/one.md) : `GET /launches/:id`
* [Query launches](launches/query.md) : `POST /launches/query`
* [Create a launch](launches/create.md) : `POST /launches`
* [Update a launch](launches/update.md) : `PATCH /launches/:id`
* [Delete a launch](launches/delete.md) : `DELETE /launches/:id`

### Launchpads

Detailed info about launchpads

* [Get all launchpads](launchpads/get.md) : `GET /launchpads`
* [Get one launchpad](launchpads/one.md) : `GET /launchpads/:id`
* [Query launchpads](launchpads/query.md) : `POST /launchpads/query`
* [Create a launchpad](launchpads/create.md) : `POST /launchpads`
* [Update a launchpad](launchpads/update.md) : `PATCH /launchpads/:id`
* [Delete a launchpad](launchpads/delete.md) : `DELETE /launchpads/:id`

### Payloads

Detailed info about launch payloads

* [Get all payloads](payloads/get.md) : `GET /payloads`
* [Get one payload](payloads/one.md) : `GET /payloads/:id`
* [Query payloads](payloads/query.md) : `POST /payloads/query`
* [Create a payload](payloads/create.md) : `POST /payloads`
* [Update a payload](payloads/update.md) : `PATCH /payloads/:id`
* [Delete a payload](payloads/delete.md) : `DELETE /payloads/:id`

### Rockets

Detailed info about rocket versions

* [Get all rockets](rockets/get.md) : `GET /rockets`
* [Get one rocket](rockets/one.md) : `GET /rockets/:id`
* [Query rockets](rockets/query.md) : `POST /rockets/query`
* [Create a rocket](rockets/create.md) : `POST /rockets`
* [Update a rocket](rockets/update.md) : `PATCH /rockets/:id`
* [Delete a rocket](rockets/delete.md) : `DELETE /rockets/:id`

### Ships

Detailed info about ships in the SpaceX fleet

* [Get all ships](ships/get.md) : `GET /ships`
* [Get one ship](ships/one.md) : `GET /ships/:id`
* [Query ships](ships/query.md) : `POST /ships/query`
* [Create a ship](ships/create.md) : `POST /ships`
* [Update a ship](ships/update.md) : `PATCH /ships/:id`
* [Delete a ship](ships/delete.md) : `DELETE /ships/:id`

### Company Info

Detailed info about SpaceX as a company

* [Get company info](company/get.md) : `GET /company`
* [Update company info](comapny/update.md) : `PATCH /company/:id`

### Roadster info

Detailed info about Elon's Tesla roadster's current position

* [Get roadster info](roadster/get.md) : `GET /roadster`
* [Update roadster info](roadster/update.md) : `PATCH /roadster/:id`
