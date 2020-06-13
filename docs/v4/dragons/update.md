# Update a Dragon

**Method** : `PATCH`

**URL** : `https://api.spacexdata.com/v4/dragons/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the Dragon

**Auth required** : `True`

**Body** :

```json
{
  "sidewall_angle_deg": 15,
}
```

## Success Response

**Code** : `200 OK`

**Content example** : `OK`

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
