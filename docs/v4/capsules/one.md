# Get one capsule

**Method** : `GET`

**URL** : `https://api.spacexdata.com/v4/capsules/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the capsule

**Auth required** : `False`

## Success Response

**Code** : `200 OK`

**Content example** :

```json
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
    "id": "5e9e2c5bf35918ed873b2664"
}
```

## Error Responses

**Code** : `404 NOT FOUND`

**Content** : `Not Found`
