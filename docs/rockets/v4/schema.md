# Rocket Schema

```json
{
  "name": {
    "type": "String"
  },
  "type": {
    "type": "String"
  },
  "active": {
    "type": "Boolean"
  },
  "stages": {
    "type": "Number"
  },
  "boosters": {
    "type": "Number"
  },
  "cost_per_launch": {
    "type": "Number"
  },
  "success_rate_pct": {
    "type": "Number"
  },
  "first_flight": {
    "type": "String"
  },
  "country": {
    "type": "String"
  },
  "company": {
    "type": "String"
  },
  "height": {
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
  "mass": {
    "kg": {
      "type": "Number"
    },
    "lb": {
      "type": "Number"
    }
  },
  "payload_weights": {
    "type": [
      "Object"
    ]
  },
  "first_stage": {
    "reusable": {
      "type": "Boolean"
    },
    "engines": {
      "type": "Number"
    },
    "fuel_amount_tons": {
      "type": "Number"
    },
    "burn_time_sec": {
      "type": "Number"
    },
    "thrust_sea_level": {
      "kN": {
        "type": "Number"
      },
      "lbf": {
        "type": "Number"
      }
    },
    "thrust_vacuum": {
      "kN": {
        "type": "Number"
      },
      "lbf": {
        "type": "Number"
      }
    }
  },
  "second_stage": {
    "reusable": {
      "type": "Boolean"
    },
    "engines": {
      "type": "Number"
    },
    "fuel_amount_tons": {
      "type": "Number"
    },
    "burn_time_sec": {
      "type": "Number"
    },
    "thrust": {
      "kN": {
        "type": "Number"
      },
      "lbf": {
        "type": "Number"
      }
    },
    "payloads": {
      "option_1": {
        "type": "String"
      },
      "composite_fairing": {
        "height": {
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
        }
      }
    }
  },
  "engines": {
    "number": {
      "type": "Number"
    },
    "type": {
      "type": "String"
    },
    "version": {
      "type": "String"
    },
    "layout": {
      "type": "String"
    },
    "isp": {
      "sea_level": {
        "type": "Number"
      },
      "vacuum": {
        "type": "Number"
      }
    },
    "engine_loss_max": {
      "type": "Number"
    },
    "propellant_1": {
      "type": "String"
    },
    "propellant_2": {
      "type": "String"
    },
    "thrust_sea_level": {
      "kN": {
        "type": "Number"
      },
      "lbf": {
        "type": "Number"
      }
    },
    "thrust_vacuum": {
      "kN": {
        "type": "Number"
      },
      "lbf": {
        "type": "Number"
      }
    },
    "thrust_to_weight": {
      "type": "Number"
    }
  },
  "landing_legs": {
    "number": {
      "type": "Number"
    },
    "material": {
      "type": "Object"
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
