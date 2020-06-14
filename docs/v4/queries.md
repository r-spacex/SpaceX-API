# Query + Pagination Guide

All `/query` routes support pagination parameters via [mongoose-paginate](https://github.com/aravindnc/mongoose-paginate-v2).

The default body for `/query` routes is:

```json
{
  "query": {},
  "options": {},
}
```

`query` accepts any valid MongoDB find() query, documented [here](https://docs.mongodb.com/manual/tutorial/query-documents/)

`options` accepts any of the options documented [here](https://github.com/aravindnc/mongoose-paginate-v2#modelpaginatequery-options-callback), but here are some of the most common:

- `select` { Object | String } - Fields to return (by default returns all fields). [Documentation](http://mongoosejs.com/docs/api.html#query_Query-select)
- `sort` { Object | String } - Sort order. [Documentation](http://mongoosejs.com/docs/api.html#query_Query-sort)
- `offset` { Number } - Use `offset` or `page` to set skip position
- `page` { Number }
- `limit` { Number }
- `pagination` { Boolean } - If set to false, it will return all docs without adding limit condition. (Default: True)
- `populate` {Array | Object | String} - Paths which should be populated with other documents. [Documentation](https://mongoosejs.com/docs/api.html#query_Query-populate)

This is the default return structure for paginated results:

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

By default, UUID's are used to reference documents in another collection. For example, the `launches` endpoint has an array of UUID's named `payloads` that references a payload in the payloads endpoint.

```json
{
  "payloads": [
    "5eb0e4c6b6c3bb0006eeb21e"
  ]
}
```

This allows us to populate or replace the UUID with the payload that it references. In this example, to populate `payloads` with the corresponding document, the body would look like the following:

```json
{
  "query": {},
  "options": {
    "populate": [
      "payloads"
    ]
  },
}
```

Which gives the following results:

```json
{
  "payloads": [
    {
      "dragon": {
        "capsule": null,
        "mass_returned_kg": null,
        "mass_returned_lbs": null,
        "flight_time_sec": null,
        "manifest": null,
        "water_landing": null,
        "land_landing": null
      },
      "name": "Tintin A & B",
      "type": "Satellite",
      "reused": false,
      "launch": "5eb87d14ffd86e000604b361",
      "customers": [
        "SpaceX"
      ],
      "norad_ids": [
        43216,
        43217
      ],
      "nationalities": [
        "United States"
      ],
      "manufacturers": [
        "SpaceX"
      ],
      "mass_kg": 800,
      "mass_lbs": 1763.7,
      "orbit": "SSO",
      "reference_system": "geocentric",
      "regime": "low-earth",
      "longitude": null,
      "semi_major_axis_km": 6737.42,
      "eccentricity": 0.0012995,
      "periapsis_km": 350.53,
      "apoapsis_km": 368.04,
      "inclination_deg": 97.4444,
      "period_min": 91.727,
      "lifespan_years": 1,
      "epoch": "2020-06-13T13:46:31.000Z",
      "mean_motion": 15.69864906,
      "raan": 176.6734,
      "arg_of_pericenter": 174.2326,
      "mean_anomaly": 185.9087,
      "id": "5eb0e4c6b6c3bb0006eeb21e"
    }
  ]
}
```

Populate also allows you to select specific fields to return. For example, if you were only interested in the payload `name`, you could use the following:

```json
{
  "options": {
    "populate": [
      {
        "path": "payloads",
        "select": {
          "name": 1
        }
      }
    ]
  }
}
```

Which would return:

```json
{
  "payloads": [
    {
      "name": "Tintin A & B",
      "id": "5eb0e4c6b6c3bb0006eeb21e"
    }
  ]
}
```

Populate can also be nested inside another populate to recursively fill fields. For example, you could populate the `payloads` array, and also populate the `launch` property inside each payload:

```json
{
  "options": {
    "populate": [
      {
        "path":"payloads",
        "populate": [
          {
            "path":"launch"
          }
        ]
      }
    ]
  }
}
```

## Examples

### Query between 2 dates

Dates need to be ISO 8601 friendly for these operators to work properly

```json
{
  "query": {
  "date_utc": {
   "$gte": "2017-06-22T00:00:00.000Z",
   "$lte": "2017-06-25T00:00:00.000Z"
  }
 }
}
```

### Full text search

This will search all text indexes in a collection. All string fields get indexed

See the mongo [reference](https://docs.mongodb.com/manual/reference/operator/query/text/) for more details on additional operators.

```json
{
 "query": {
    "$text": {
      "$search": "crs"
    }
  }
}
```

### Complex Query

```json
{
  "query": {
    "date_utc": {
      "$gte": "2017-06-22T00:00:00.000Z",
      "$lte": "2017-06-25T00:00:00.000Z"
    },
    "$or": [
      {
        "flight_number": {
          "$gt": 30
        }
      },
      {
        "tbd": true
      }
    ],
    "date_precision": {
      "$in": [
        "month",
        "day"
      ]
    }
  },
  "options": {
    "sort": {
      "flight_number": "asc"
    },
    "limit": 50
  }
}
```
