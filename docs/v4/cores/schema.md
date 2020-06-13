# Core Schema

```json
{
  "serial": {
    "type": "String",
    "unique": true,
    "required": true,
  },
  "block": {
    "type": "Number",
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
  "rtls_attempts": {
    "type": "Number",
    "default": 0,
  },
  "rtls_landings": {
    "type": "Number",
    "default": 0,
  },
  "asds_attempts": {
    "type": "Number",
    "default": 0,
  },
  "asds_landings": {
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
