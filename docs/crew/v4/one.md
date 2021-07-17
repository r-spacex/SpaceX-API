# Get one crew member

**Method** : `GET`

**URL** : `https://api.spacexdata.com/v4/crew/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the crew member

**Auth required** : `False`

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "name": "Douglas Hurley",
    "agency": "NASA",
    "image": "https://i.imgur.com/ooaayWf.png",
    "wikipedia": "https://en.wikipedia.org/wiki/Douglas_G._Hurley",
    "launches": [
        "5eb87d46ffd86e000604b388"
    ],
    "status": "active",
    "id": "5ebf1b7323a9a60006e03a7b"
}
```

## Error Responses

**Code** : `404 NOT FOUND`

**Content** : `Not Found`
