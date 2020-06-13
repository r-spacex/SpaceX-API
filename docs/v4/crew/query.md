# Query crew members

**Method** : `POST`

**URL** : `https://api.spacexdata.com/v4/crew/query`

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
            "name": "Robert Behnken",
            "agency": "NASA",
            "image": "https://imgur.com/0smMgMH.png",
            "wikipedia": "https://en.wikipedia.org/wiki/Robert_L._Behnken",
            "launches": [
                "5eb87d46ffd86e000604b388"
            ],
            "status": "active",
            "id": "5ebf1a6e23a9a60006e03a7a"
        },
        ...
    ],
    "totalDocs": 2,
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
