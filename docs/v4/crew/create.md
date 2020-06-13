# Create a crew member

**Method** : `POST`

**URL** : `https://api.spacexdata.com/v4/crew`

**Auth required** : `True`

**Body** :

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

## Success Response

**Code** : `201 Created`

**Content example** : `Created`

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
