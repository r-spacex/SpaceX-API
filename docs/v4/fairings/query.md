# Query fairings

**Method** : `POST`

**URL** : `https://api.spacexdata.com/v4/fairings/query`

**Auth required** : `False`

**Body** :

See [query](../queries.md) guide for more details on building queries and paginating results.

```json
{
  "query": {},
  "options": {}
}
```

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "docs": [
        {
          "serial": "ff13b75ee72046ea8b00e9f4ac242f0b",
          "version": "2.1",
          "status": "active",
          "reuse_count": 3,
          "net_landing_attempts": 2,
          "net_landing": 1,
          "water_landing_attempts": 1,
          "water_landing": 1,
          "last_update": "2020-12-20T21:01:14.606Z",
          "launches": [
            "e7ba84e6294145a1bec0b684a6ca9aa6",
            "9daa1cebfedc41199e9ef5747d17d5c4",
            "9120aff3571e4af18dba1021dac4dfdd"
          ]
        }
        ...
    ],
    "totalDocs": 7,
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

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
