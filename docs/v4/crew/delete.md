# Delete a crew member

**Method** : `DELETE`

**URL** : `https://api.spacexdata.com/v4/crew/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the crew member

**Auth required** : `True`

## Success Response

**Code** : `200 OK`

**Content example** : `OK`

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
