# Launch Schema

```json
{
  "flight_number": {
    "type": "Number",
    "required": true
  },
  "name": {
    "type": "String",
    "unique": true,
    "required": true
  },
  "date_utc": {
    "type": "String",
    "required": true
  },
  "date_unix": {
    "type": "Number",
    "required": true
  },
  "date_local": {
    "type": "String",
    "required": true
  },
  "date_precision": {
    "type": "String",
    "required": true,
    "enum": [
      "half",
      "quarter",
      "year",
      "month",
      "day",
      "hour"
    ]
  },
  "static_fire_date_utc": {
    "type": "String",
    "default": null
  },
  "static_fire_date_unix": {
    "type": "Number",
    "default": null
  },
  "tdb": {
    "type": "Boolean",
    "default": false
  },
  "net": {
    "type": "Boolean",
    "default": false
  },
  "window": {
    "type": "Number",
    "default": null
  },
  "rocket": {
    "type": "UUID",
    "default": null
  },
  "success": {
    "type": "Boolean",
    "default": null
  },
  "failures": [
    "String"
  ],
  "upcoming": {
    "type": "Boolean",
    "required": true
  },
  "details": {
    "type": "String",
    "default": null
  },
  "fairings": {
    "reused": {
      "type": "Boolean",
      "default": null
    },
    "recovery_attempt": {
      "type": "Boolean",
      "default": null
    },
    "recovered": {
      "type": "Boolean",
      "default": null
    },
    "ships": [
      "UUID"
    ]
  },
  "crew": [
    "UUID"
  ],
  "ships": [
    "UUID"
  ],
  "capsules": [
    "UUID"
  ],
  "payloads": [
    "UUID"
  ],
  "launchpad": {
    "type": "UUID",
    "default": null
  },
  "cores": [
    {
      "core": {
        "type": "UUID",
        "default": null
      },
      "flight": {
        "type": "Number",
        "default": null
      },
      "gridfins": {
        "type": "Boolean",
        "default": null
      },
      "legs": {
        "type": "Boolean",
        "default": null
      },
      "reused": {
        "type": "Boolean",
        "default": null
      },
      "landing_attempt": {
        "type": "Boolean",
        "default": null
      },
      "landing_success": {
        "type": "Boolean",
        "default": null
      },
      "landing_type": {
        "type": "String",
        "default": null
      },
      "landpad": {
        "type": "UUID",
        "default": null
      }
    }
  ],
  "links": {
    "patch": {
      "small": {
        "type": "String",
        "default": null
      },
      "large": {
        "type": "String",
        "default": null
      }
    },
    "reddit": {
      "campaign": {
        "type": "String",
        "default": null
      },
      "launch": {
        "type": "String",
        "default": null
      },
      "media": {
        "type": "String",
        "default": null
      },
      "recovery": {
        "type": "String",
        "default": null
      }
    },
    "flickr": {
      "small": [
        "String"
      ],
      "original": [
        "String"
      ]
    },
    "presskit": {
      "type": "String",
      "default": null
    },
    "webcast": {
      "type": "String",
      "default": null
    },
    "youtube_id": {
      "type": "String",
      "default": null
    },
    "article": {
      "type": "String",
      "default": null
    },
    "wikipedia": {
      "type": "String",
      "default": null
    }
  },
  "auto_update": {
    "type": "Boolean",
    "default": true
  }
}
```
