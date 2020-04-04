# Get one capsule

**URL** : `/capsules/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the capsule

**Method** : `GET`

**Auth required** : NO

## Success Response

**Condition** : If capsule exists

**Code** : `200 OK`

**Content example**

```json
{

}
```

## Error Responses

**Condition** : If Capsule does not exist with `id`.

**Code** : `404 NOT FOUND`

**Content** : `Not Found`
