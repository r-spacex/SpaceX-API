# Create a fairing

**Method** : `POST`

**URL** : `https://api.spacexdata.com/v4/fairings`

**Auth required** : `True`

**Body** :

```json
{
  "serial": "ff13b75ee72046ea8b00e9f4ac242f0b",
  "version": "2.1",
  "status": "active",
  "reuse_count": 3,
  "net_landing_attempts": 2,
  "net_landing": 1,
  "water_landing_attempts": 1,
  "water_landing": 1,
  "last_update": "2020-12-20T21:01:14.606Z",
}
```

## Success Response

**Code** : `201 Created`

**Content example** : `Created`

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
