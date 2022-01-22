# Query capsules

**Method** : `POST`

**URL** : `https://api.spacexdata.com/v4/capsules/query`

**Auth required** : `False`

**Body** :

See [query](../../queries.md) guide for more details on building queries and paginating results.

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
            "reuse_count": 1,
            "water_landings": 1,
            "land_landings": 0,
            "last_update": "Reentered after three weeks in orbit",
            "launches": [
                "5eb87cdeffd86e000604b330"
            ],
            "serial": "C101",
            "status": "retired",
            "type": "Dragon 1.0",
            "id": "5e9e2c5bf35918ed873b2664"
        },
        ...
    ],
    "totalDocs": 19,
    "offset": 0,
    "limit": 10,
    "totalPages": 2,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": true,
    "prevPage": null,
    "nextPage": 2
}
```

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
