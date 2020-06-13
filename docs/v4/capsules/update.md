# Update a capsule

**Method** : `PATCH`

**URL** : `https://api.spacexdata.com/v4/capsules/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the capsule

**Auth required** : `True`

**Body** :

```json
{
  "status": "retired",
}
```

## Success Response

**Code** : `200 OK`

**Content example** : `OK`

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
