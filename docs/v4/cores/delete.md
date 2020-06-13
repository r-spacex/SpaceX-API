# Delete a core

**Method** : `DELETE`

**URL** : `/cores/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the core

**Auth required** : `True`

## Success Response

**Code** : `200 OK`

**Content example** : `OK`

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
