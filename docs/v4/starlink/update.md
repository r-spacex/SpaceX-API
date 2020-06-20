# Update a Starlink satellite

**Method** : `PATCH`

**URL** : `https://api.spacexdata.com/v4/starlink/:norad_id`

**URL Parameters** : `norad_id=[string]` where `norad_id` is the Norad Id of the Starlink sat

**Auth required** : `True`

**Body** :

```json
{
    "version": "v1.0",
}
```

## Success Response

**Code** : `200 OK`

**Content example** : `OK`

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
