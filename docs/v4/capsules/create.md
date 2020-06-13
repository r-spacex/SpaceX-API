# Create a capsule

**Method** : `POST`

**URL** : `https://api.spacexdata.com/v4/capsules`

**Auth required** : `True`

**Body** :

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
    "status": "retired"
}
```

## Success Response

**Code** : `201 Created`

**Content example** : `Created`

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
