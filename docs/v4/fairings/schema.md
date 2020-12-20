# Fairing Schema

```json
{
  "serial": {
    "type": "String",
    "unique": true,
    "required": true,
  },
  "version": {
    "enum": ["1.0", "2.0", "2.1"],
    "default": null,
  },
  "status": {
    "type": "String",
    "enum": ["active", "inactive", "unknown", "expended", "lost", "retired"],
    "required": true,
  },
  "reuse_count": {
    "type": "Number",
    "default": 0,
  },
  "net_landing_attempts": {
    "type": "Number",
    "default": 0,
  },
  "net_landing": {
    "type": "Number",
    "default": 0,
  },
  "water_landing_attempts": {
    "type": "Number",
    "default": 0,
  },
  "water_landing": {
    "type": "Number",
    "default": 0,
  },
  "last_update": {
    "type": "String",
    "default": null,
  },
  "launches": [{
    "type": "UUID",
  }],
}
```
