# Ship Schema

```json
{
  "name": {
    "type": "String",
    "unique": true,
    "required": true
  },
  "legacy_id": {
    "type": "String",
    "default": null
  },
  "model": {
    "type": "String",
    "default": null
  },
  "type": {
    "type": "String",
    "default": null
  },
  "roles": [
    "String"
  ],
  "active": {
    "type": "Boolean",
    "required": true
  },
  "imo": {
    "type": "Number",
    "default": null
  },
  "mmsi": {
    "type": "Number",
    "default": null
  },
  "abs": {
    "type": "Number",
    "default": null
  },
  "class": {
    "type": "Number",
    "default": null
  },
  "mass_kg": {
    "type": "Number",
    "default": null
  },
  "mass_lbs": {
    "type": "Number",
    "default": null
  },
  "year_built": {
    "type": "Number",
    "default": null
  },
  "home_port": {
    "type": "String",
    "default": null
  },
  "status": {
    "type": "String",
    "default": null
  },
  "speed_kn": {
    "type": "Number",
    "default": null
  },
  "course_deg": {
    "type": "Number",
    "default": null
  },
  "latitude": {
    "type": "Number",
    "default": null
  },
  "longitude": {
    "type": "Number",
    "default": null
  },
  "last_ais_update": {
    "type": "String",
    "default": null
  },
  "link": {
    "type": "String",
    "default": null
  },
  "image": {
    "type": "String",
    "default": null
  },
  "launches": [
    {
      "type": "UUID"
    }
  ]
}
```
