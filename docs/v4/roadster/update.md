# Update roadster info

**Method** : `PATCH`

**URL** : `https://api.spacexdata.com/v4/roadster/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the roadster

**Auth required** : `True`

**Body** :

```json
{
  "video": "https://youtu.be/wbSwFU6tY1c"
}
```

## Success Response

**Code** : `200 OK`

**Content example** : `OK`

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
