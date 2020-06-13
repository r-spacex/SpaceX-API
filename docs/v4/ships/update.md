# Update a ship

**Method** : `PATCH`

**URL** : `https://api.spacexdata.com/v4/ships/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the ship

**Auth required** : `True`

**Body** :

```json
{
  "home_port": "Port Canaveral",
}
```

## Success Response

**Code** : `200 OK`

**Content example** : `OK`

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
