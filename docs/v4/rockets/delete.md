# Delete a rocket

**Method** : `DELETE`

**URL** : `https://api.spacexdata.com/v4/rockets/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the rocket

**Auth required** : `True`

## Success Response

**Code** : `200 OK`

**Content example** : `OK`

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
