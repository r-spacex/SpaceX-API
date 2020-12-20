# Update a fairing

**Method** : `PATCH`

**URL** : `https://api.spacexdata.com/v4/fairings/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the fairing

**Auth required** : `True`

**Body** :

```json
{
  "reuse_count": 3,
}
```

## Success Response

**Code** : `200 OK`

**Content example** : `OK`

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
