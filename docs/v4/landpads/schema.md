# Landing Pad Schema

```json
{
  "name": {
    "type": "String",
    "default": null
  },
  "full_name": {
    "type": "String",
    "default": null
  },
  "status": {
    "type": "String",
    "default": null
  },
  "type": {
    "type": "String",
    "default": null
  },
  "locality": {
    "type": "String",
    "default": null
  },
  "region": {
    "type": "String",
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
  "landing_attempts": {
    "type": "Number",
    "default": 0
  },
  "landing_successes": {
    "type": "Number",
    "default": 0
  },
  "wikipedia": {
    "type": "String",
    "default": null
  },
  "details": {
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
