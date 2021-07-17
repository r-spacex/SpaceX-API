# Get one landing pad

**Method** : `GET`

**URL** : `https://api.spacexdata.com/v4/landpads/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the landing pad

**Auth required** : `False`

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "name": "LZ-2",
    "full_name": "Landing Zone 2",
    "status": "active",
    "type": "RTLS",
    "locality": "Cape Canaveral",
    "region": "Florida",
    "latitude": 28.485833,
    "longitude": -80.544444,
    "landing_attempts": 3,
    "landing_successes": 3,
    "wikipedia": "https://en.wikipedia.org/wiki/Landing_Zones_1_and_2",
    "details": "SpaceX's first east coast landing pad is Landing Zone 1, where the historic first Falcon 9 landing occurred in December 2015. LC-13 was originally used as a launch pad for early Atlas missiles and rockets from Lockheed Martin. LC-1 was later expanded to include Landing Zone 2 for side booster RTLS Falcon Heavy missions, and it was first used in February 2018 for that purpose.",
    "launches": [
        "5eb87d13ffd86e000604b360",
        "5eb87d2dffd86e000604b376",
        "5eb87d35ffd86e000604b37a"
    ],
    "id": "5e9e3032383ecb90a834e7c8"
}
```

## Error Responses

**Code** : `404 NOT FOUND`

**Content** : `Not Found`
