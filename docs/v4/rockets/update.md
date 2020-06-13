# Update a rocket

**Method** : `PATCH`

**URL** : `https://api.spacexdata.com/v4/rockets/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the rocket

**Auth required** : `True`

**Body** :

```json
{
  "flickr_images": [
    "https://farm5.staticflickr.com/4599/38583829295_581f34dd84_b.jpg"
  ]
}
```

## Success Response

**Code** : `200 OK`

**Content example** : `OK`

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
