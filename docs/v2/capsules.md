FORMAT: 1A

HOST: https://api.spacexdata.com/v2/

# Group Capsules

Endpoints allowing you to get information related to SpaceX capsules.

[Home](https://github.com/r-spacex/SpaceX-API/tree/master/docs)
 | [Launches](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches.md)
 | [Rockets](https://github.com/r-spacex/SpaceX-API/blob/master/docs/rockets.md)
 | Capsules
 | [Company Info](https://github.com/r-spacex/SpaceX-API/blob/master/docs/company_info.md)
 | [Parts](https://github.com/r-spacex/SpaceX-API/blob/master/docs/parts.md)
 | [Launchpads](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launchpads.md)

## Capsules [/capsules]

### Get information for all capsules [GET]

+ Response 200 (application/json)

        [
            {
                "id": "dragon1",
                "name": "Dragon 1",
                "type": "capsule",
                "active": true,
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
                },
                "wikipedia": "https://en.wikipedia.org/wiki/SpaceX_Dragon",
                "description": "Dragon is a reusable spacecraft developed by SpaceX, an American private space transportation company based in Hawthorne, California. Dragon is launched into space by the SpaceX Falcon 9 two-stage-to-orbit launch vehicle. The Dragon spacecraft was originally designed for human travel, but so far has only been used to deliver cargo to the International Space Station (ISS)."
            },
        ]

## Capsule [/capsules/{capsule_id}]

+ Parameters
    + capsule_id (string) - ID of the capsule

### Get information for a specific capsule [GET]

+ Response 200 (application/json)

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
