# Query cores

**Method** : `POST`

**URL** : `https://api.spacexdata.com/v4/cores/query`

**Auth required** : `False`

**Body** :

See [query](../queries) guide for more details on building queries and paginating results.

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
        "block": 5,
        "reuse_count": 3,
        "rtls_attempts": 1,
        "rtls_landings": 1,
        "asds_attempts": 2,
        "asds_landings": 2,
        "last_update": "Missed the droneship and made successful water landing; apparently scuttled at sea afterward. ",
        "launches": [
            "5eb87d2effd86e000604b377",
            "5eb87d36ffd86e000604b37b",
            "5eb87d3bffd86e000604b37f",
            "5eb87d41ffd86e000604b383"
        ],
        "serial": "B1056",
        "status": "lost",
        "id": "5e9e28a7f3591809313b2660"
      },
      ...
    ],
    "totalDocs": 65,
    "offset": 0,
    "limit": 10,
    "totalPages": 7,
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
