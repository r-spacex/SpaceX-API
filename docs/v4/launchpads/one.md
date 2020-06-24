# Get one launchpad

**Method** : `GET`

**URL** : `https://api.spacexdata.com/v4/launchpads/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the launchpad

**Auth required** : `False`

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "name": "VAFB SLC 4E",
    "full_name": "Vandenberg Air Force Base Space Launch Complex 4E",
    "locality": "Vandenberg Air Force Base",
    "region": "California",
    "timezone": "America/Los_Angeles",
    "latitude": 34.632093,
    "longitude": -120.610829,
    "launch_attempts": 15,
    "launch_successes": 15,
    "rockets": [
        "5e9d0d95eda69973a809d1ec"
    ],
    "launches": [
        "5eb87ce1ffd86e000604b334",
        "5eb87cf0ffd86e000604b343",
        "5eb87cfdffd86e000604b34c",
        "5eb87d05ffd86e000604b354",
        "5eb87d08ffd86e000604b357",
        "5eb87d0affd86e000604b359",
        "5eb87d0fffd86e000604b35d",
        "5eb87d14ffd86e000604b361",
        "5eb87d16ffd86e000604b363",
        "5eb87d1affd86e000604b367",
        "5eb87d1fffd86e000604b36b",
        "5eb87d23ffd86e000604b36e",
        "5eb87d25ffd86e000604b370",
        "5eb87d28ffd86e000604b373",
        "5eb87d31ffd86e000604b379"
    ],
    "status": "active",
    "id": "5e9e4502f509092b78566f87"
}
```

## Error Responses

**Code** : `404 NOT FOUND`

**Content** : `Not Found`
