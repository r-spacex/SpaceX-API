# Update a history event

**Method** : `PATCH`

**URL** : `https://api.spacexdata.com/v4/history/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the history event

**Auth required** : `True`

**Body** :

```json
{
  "title": "SpaceX successfully launches humans to ISS"
}
```

## Success Response

**Code** : `200 OK`

**Content example** : `OK`

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
