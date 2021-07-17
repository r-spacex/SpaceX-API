# Crew Schema

```json
{
  "name": {
    "type": "String",
    "default": null
  },
  "status": {
    "type": "String",
    "required": true,
    "enum": ["active", "inactive", "retired", "unknown"]
  },
  "agency": {
    "type": "String",
    "default": null
  },
  "image": {
    "type": "String",
    "default": null
  },
  "wikipedia": {
    "type": "String",
    "default": null
  },
  "launches": [{
      "type": "UUID"
  }]
}
```
