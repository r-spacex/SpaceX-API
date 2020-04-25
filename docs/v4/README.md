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

**ships**, **payloads** - 5 minutes

**capsules**, **cores**, **launchpads**, **landpads**, **crew** - 1 hour

**dragons**, **rockets** - 24 hours

Cache can be cleared with the following endpoint:
* [Clear cache](cache/clear.md) : `DELETE /admin/cache` - Requires Auth

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

* [Get all cores](cores/get.md) : `GET /v4/cores`
* [Get one core](cores/one.md) : `GET /v4/cores/:id`
* [Query cores](cores/query.md) : `POST /v4/cores/query`
* [Create a core](cores/create.md) : `POST /v4/cores`
* [Update a core](cores/update.md) : `PATCH /v4/cores/:id`
* [Delete a core](cores/delete.md) : `DELETE /v4/cores/:id`

### Crew

Detailed info on dragon crew members

* [Get all crew members](crew/get.md) : `GET /v4/crew`
* [Get one crew member](crew/one.md) : `GET /v4/crew/:id`
* [Query crew members](crew/query.md) : `POST /v4/crew/query`
* [Create a crew member](crew/create.md) : `POST /v4/crew`
* [Update a crew member](crew/update.md) : `PATCH /v4/crew/:id`
* [Delete a crew member](crew/delete.md) : `DELETE /v4/crew/:id`

### Dragons

Detailed info about dragon capsule versions

* [Get all dragons](dragons/get.md) : `GET /v4/dragons`
* [Get one dragon](dragons/one.md) : `GET /v4/dragons/:id`
* [Query dragons](dragons/query.md) : `POST /v4/dragons/query`
* [Create a dragon](dragons/create.md) : `POST /v4/dragons`
* [Update a dragon](dragons/update.md) : `PATCH /v4/dragons/:id`
* [Delete a dragon](dragons/delete.md) : `DELETE /v4/dragons/:id`

### Landpads

Detailed info about landing pads and ships

* [Get all landpads](landpads/get.md) : `GET /v4/landpads`
* [Get one landpad](landpads/one.md) : `GET /v4/landpads/:id`
* [Query landpads](landpads/query.md) : `POST /v4/landpads/query`
* [Create a landpad](landpads/create.md) : `POST /v4/landpads`
* [Update a landpad](landpads/update.md) : `PATCH /v4/landpads/:id`
* [Delete a landpad](landpads/delete.md) : `DELETE /v4/landpads/:id`

### Launches

Detailed info about launches

* [Get past launches](launches/past.md) : `GET /v4/launches/past`
* [Get upcoming launches](launches/upcoming.md) : `GET /v4/launches/upcoming`
* [Get latest launches](launches/latest.md) : `GET /v4/launches/latest`
* [Get next launches](launches/next.md) : `GET /v4/launches/next`
* [Get all launches](launches/get.md) : `GET /v4/launches`
* [Get one launch](launches/one.md) : `GET /v4/launches/:id`
* [Query launches](launches/query.md) : `POST /v4/launches/query`
* [Create a launch](launches/create.md) : `POST /v4/launches`
* [Update a launch](launches/update.md) : `PATCH /v4/launches/:id`
* [Delete a launch](launches/delete.md) : `DELETE /v4/launches/:id`

### Launchpads

Detailed info about launchpads

* [Get all launchpads](launchpads/get.md) : `GET /v4/launchpads`
* [Get one launchpad](launchpads/one.md) : `GET /v4/launchpads/:id`
* [Query launchpads](launchpads/query.md) : `POST /v4/launchpads/query`
* [Create a launchpad](launchpads/create.md) : `POST /v4/launchpads`
* [Update a launchpad](launchpads/update.md) : `PATCH /v4/launchpads/:id`
* [Delete a launchpad](launchpads/delete.md) : `DELETE /v4/launchpads/:id`

### Payloads

Detailed info about launch payloads

* [Get all payloads](payloads/get.md) : `GET /v4/payloads`
* [Get one payload](payloads/one.md) : `GET /v4/payloads/:id`
* [Query payloads](payloads/query.md) : `POST /v4/payloads/query`
* [Create a payload](payloads/create.md) : `POST /v4/payloads`
* [Update a payload](payloads/update.md) : `PATCH /v4/payloads/:id`
* [Delete a payload](payloads/delete.md) : `DELETE /v4/payloads/:id`

### Rockets

Detailed info about rocket versions

* [Get all rockets](rockets/get.md) : `GET /v4/rockets`
* [Get one rocket](rockets/one.md) : `GET /v4/rockets/:id`
* [Query rockets](rockets/query.md) : `POST /v4/rockets/query`
* [Create a rocket](rockets/create.md) : `POST /v4/rockets`
* [Update a rocket](rockets/update.md) : `PATCH /v4/rockets/:id`
* [Delete a rocket](rockets/delete.md) : `DELETE /v4/rockets/:id`

### Ships

Detailed info about ships in the SpaceX fleet

* [Get all ships](ships/get.md) : `GET /v4/ships`
* [Get one ship](ships/one.md) : `GET /v4/ships/:id`
* [Query ships](ships/query.md) : `POST /v4/ships/query`
* [Create a ship](ships/create.md) : `POST /v4/ships`
* [Update a ship](ships/update.md) : `PATCH /v4/ships/:id`
* [Delete a ship](ships/delete.md) : `DELETE /v4/ships/:id`
