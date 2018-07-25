# Capsules

[Home](https://github.com/r-spacex/SpaceX-API/blob/master/docs/home.md) | [Launches](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches.md) | [Rockets](https://github.com/r-spacex/SpaceX-API/blob/master/docs/rocket.md) | [Capsules](https://github.com/r-spacex/SpaceX-API/blob/master/docs/capsule.md) | [Company Info](https://github.com/r-spacex/SpaceX-API/blob/master/docs/company_info.md) | [Capsule Details](https://github.com/r-spacex/SpaceX-API/blob/master/docs/capsule_detail.md) | [Core Detail](https://github.com/r-spacex/SpaceX-API/blob/master/docs/core_detail.md) | [Launchpads](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launchpad.md) | [Development](https://github.com/r-spacex/SpaceX-API/blob/master/docs/development.md)

## Endpoints
Get all capsule information
```http
GET https://api.spacexdata.com/v2/capsules
```

Get specific capsule information
```http
GET https://api.spacexdata.com/v2/capsules/dragon1
GET https://api.spacexdata.com/v2/capsules/dragon2
GET https://api.spacexdata.com/v2/capsules/crewdragon
```

Sample Response
```json
{
  "id": "dragon2",
  "name": "Dragon 2",
  "type": "capsule",
  "active": false,
  "crew_capacity": 0,
  "sidewall_angle_deg": 15,
  "orbit_duration_yr": 2,
  "heat_shield": {
    "material": "PICA-X",
    "size_meters": 3.6,
    "temp_degrees": 3000,
    "dev_partner": "NASA"
  },
  "thrusters": [
    {
      "type": "Draco",
      "amount": 18,
      "pods": 4,
      "fuel_1": "nitrogen tetroxide",
      "fuel_2": "monomethylhydrazine",
      "thrust": {
        "kN": 0.4,
        "lbf": 90
      }
    }
  ],
  "launch_payload_mass": {
    "kg": 6000,
    "lb": 13228
  },
  "launch_payload_vol": {
    "cubic_meters": 25,
    "cubic_feet": 883
  },
  "return_payload_mass": {
    "kg": 3000,
    "lb": 6614
  },
  "return_payload_vol": {
    "cubic_meters": 11,
    "cubic_feet": 388
  },
  "pressurized_capsule": {
    "payload_volume": {
      "cubic_meters": 11,
      "cubic_feet": 388
    }
  },
  "trunk": {
    "trunk_volume": {
      "cubic_meters": 14,
      "cubic_feet": 494
    },
    "cargo": {
      "solar_array": 2,
      "unpressurized_cargo": true
    }
  },
  "height_w_trunk": {
    "meters": 7.2,
    "feet": 23.6
  },
  "diameter": {
    "meters": 3.7,
    "feet": 12
  }
}
```