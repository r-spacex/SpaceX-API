# Dragon Schema

```json
{
  "name": {
    "type": "String",
    "unique": true,
    "required": true
  },
  "type": {
    "type": "String",
    "required": true
  },
  "active": {
    "type": "Boolean",
    "required": true
  },
  "crew_capacity": {
    "type": "Number",
    "required": true
  },
  "sidewall_angle_deg": {
    "type": "Number",
    "required": true
  },
  "orbit_duration_yr": {
    "type": "Number",
    "required": true
  },
  "dry_mass_kg": {
    "type": "Number",
    "required": true
  },
  "dry_mass_lb": {
    "type": "Number",
    "required": true
  },
  "first_flight": {
    "type": "String",
    "default": null
  },
  "heat_shield": {
    "material": {
      "type": "String",
      "required": true
    },
    "size_meters": {
      "type": "Number",
      "required": true
    },
    "temp_degrees": {
      "type": "Number"
    },
    "dev_partner": {
      "type": "String"
    }
  },
  "thrusters": {
    "type": "Object"
  },
  "launch_payload_mass": {
    "kg": {
      "type": "Number"
    },
    "lb": {
      "type": "Number"
    }
  },
  "launch_payload_vol": {
    "cubic_meters": {
      "type": "Number"
    },
    "cubic_feet": {
      "type": "Number"
    }
  },
  "return_payload_mass": {
    "kg": {
      "type": "Number"
    },
    "lb": {
      "type": "Number"
    }
  },
  "return_payload_vol": {
    "cubic_meters": {
      "type": "Number"
    },
    "cubic_feet": {
      "type": "Number"
    }
  },
  "pressurized_capsule": {
    "payload_volume": {
      "cubic_meters": {
        "type": "Number"
      },
      "cubic_feet": {
        "type": "Number"
      }
    }
  },
  "trunk": {
    "trunk_volume": {
      "cubic_meters": {
        "type": "Number"
      },
      "cubic_feet": {
        "type": "Number"
      }
    },
    "cargo": {
      "solar_array": {
        "type": "Number"
      },
      "unpressurized_cargo": {
        "type": "Boolean"
      }
    }
  },
  "height_w_trunk": {
    "meters": {
      "type": "Number"
    },
    "feet": {
      "type": "Number"
    }
  },
  "diameter": {
    "meters": {
      "type": "Number"
    },
    "feet": {
      "type": "Number"
    }
  },
  "flickr_images": {
    "type": [
      "String"
    ]
  },
  "wikipedia": {
    "type": "String"
  },
  "description": {
    "type": "String"
  }
}
```
