# Update a launch

**Method** : `PATCH`

**URL** : `https://api.spacexdata.com/v4/launches/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the launch

**Auth required** : `True`

**Body** :

```json
{
  "success": true,
}
```

## Success Response

**Code** : `200 OK`

**Content example** : `OK`

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
