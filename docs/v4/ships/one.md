# Get one core

**Method** : `GET`

**URL** : `https://api.spacexdata.com/v4/cores/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the core

**Auth required** : `False`

## Success Response

**Code** : `200 OK`

**Content example** :

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
    "status": "active",
    "id": "5e9e28a6f35918c0803b265c"
}
```

## Error Responses

**Code** : `404 NOT FOUND`

**Content** : `Not Found`
