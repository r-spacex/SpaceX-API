# Rockets

[Home](https://github.com/r-spacex/SpaceX-API/blob/master/docs/home.md) | [Launches](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches.md) | [Rockets](https://github.com/r-spacex/SpaceX-API/blob/master/docs/rocket.md) | [Capsules](https://github.com/r-spacex/SpaceX-API/blob/master/docs/capsule.md) | [Company Info](https://github.com/r-spacex/SpaceX-API/blob/master/docs/company_info.md) | [Capsule Details](https://github.com/r-spacex/SpaceX-API/blob/master/docs/capsule_detail.md) | [Core Detail](https://github.com/r-spacex/SpaceX-API/blob/master/docs/core_detail.md) | [Launchpads](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launchpad.md) | [Development](https://github.com/r-spacex/SpaceX-API/blob/master/docs/development.md)

## Endpoints
Get all rocket information
```http
GET https://api.spacexdata.com/v2/rockets
```

Get specific rocket information
```http
GET https://api.spacexdata.com/v2/rockets/falcon1
GET https://api.spacexdata.com/v2/rockets/falcon9
GET https://api.spacexdata.com/v2/rockets/falconheavy
GET https://api.spacexdata.com/v2/rockets/bfr
```

Sample Response
```json
{
  "id": "falcon9",
  "name": "Falcon 9",
  "type": "rocket",
  "active": true,
  "stages": 2,
  "boosters": 0,
  "cost_per_launch": 50000000,
  "success_rate_pct": 97,
  "first_flight": "2010-06-04",
  "country": "United States",
  "company": "SpaceX",
  "height": {
    "meters": 70,
    "feet": 229.6
  },
  "diameter": {
    "meters": 3.7,
    "feet": 12
  },
  "mass": {
    "kg": 549054,
    "lb": 1207920
  },
  "payload_weights": [
    {
      "id": "leo",
      "name": "Low Earth Orbit",
      "kg": 22800,
      "lb": 50265
    },
    {
      "id": "gto",
      "name": "Geosynchronous Transfer Orbit",
      "kg": 8300,
      "lb": 18300
    },
    {
      "id": "mars",
      "name": "Mars Orbit",
      "kg": 4020,
      "lb": 8860
    }
  ],
  "first_stage": {
    "reusable": true,
    "engines": 9,
    "fuel_amount_tons": 385,
    "burn_time_sec": 162,
    "thrust_sea_level": {
      "kN": 7607,
      "lbf": 1710000
    },
    "thrust_vacuum": {
      "kN": 8227,
      "lbf": 1849500
    }
  },
  "second_stage": {
    "engines": 1,
    "fuel_amount_tons": 90,
    "burn_time_sec": 397,
    "thrust": {
      "kN": 934,
      "lbf": 210000
    },
    "payloads": {
      "option_1": "dragon",
      "option_2": "composite fairing",
      "composite_fairing": {
        "height": {
          "meters": 13.1,
          "feet": 43
        },
        "diameter": {
          "meters": 5.2,
          "feet": 17.1
        }
      }
    }
  },
  "engines": {
    "number": 9,
    "type": "merlin",
    "version": "1D+",
    "layout": "octaweb",
    "engine_loss_max": 2,
    "propellant_1": "liquid oxygen",
    "propellant_2": "RP-1 kerosene",
    "thrust_sea_level": {
      "kN": 845,
      "lbf": 190000
    },
    "thrust_vacuum": {
      "kN": 914,
      "lbf": 205500
    },
    "thrust_to_weight": 180.1
  },
  "landing_legs": {
    "number": 4,
    "material": "carbon fiber"
  },
  "description": "Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit."
}
```