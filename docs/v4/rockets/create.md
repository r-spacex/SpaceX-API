# Create a core

**Method** : `POST`

**URL** : `https://api.spacexdata.com/v4/cores`

**Auth required** : `True`

**Body** :

```json
{
    "block": 5,
    "reuse_count": 3,
    "rtls_attempts": 1,
    "rtls_landings": 1,
    "asds_attempts": 3,
    "asds_landings": 3,
    "last_update": "Landed on OCISLY as of Jan 29, 2020. ",
    "launches": [
        "5eb87d2bffd86e000604b375",
        "5eb87d31ffd86e000604b379",
        "5eb87d3fffd86e000604b382",
        "5eb87d44ffd86e000604b386"
    ],
    "serial": "B1051",
    "status": "active"
}
```

## Success Response

**Code** : `201 Created`

**Content example** : `Created`

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
