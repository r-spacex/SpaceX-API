FORMAT: 1A

HOST: https://api.spacexdata.com/v2/

# Group Parts

Endpoints allowing you to get information related to parts used during flights.

[Home](https://github.com/r-spacex/SpaceX-API/tree/master/docs) | [Launches](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches.md) | [Rockets](https://github.com/r-spacex/SpaceX-API/blob/master/docs/rockets.md) | [Capsules](https://github.com/r-spacex/SpaceX-API/blob/master/docs/capsules.md) | [Company Info](https://github.com/r-spacex/SpaceX-API/blob/master/docs/company_info.md) | Parts | [Launchpads](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launchpads.md)

## Capsule Details [/parts/caps]

+ Parameters
    + capsule_serial: `C113` (string) - Filter by case-sensitive capsule serial
    + capsule_id: `dragon1` (string) - Filter by capsule ID
    + status: `active` (string) - Filter by capsule status
    + original_launch: `2017-08-14T16:31:00.000Z` (ISO UTC timestamp) - Filter by original launch date
    + missions: `SpaceX+CRS-12` (string) - Filter by flight missions
    + landings: `1` (integer) - Filter by number of landings
    + type: `Dragon+1.1` (string) - Filter by type of Dragon capsule
    + sort: `norad_id` (string) - Change result sorting by setting value to any parameter in this list
    + order: `desc` (string) - Change result ordering by setting values of `asc` or `desc`

### Get information for all capsules [GET]

+ Response 200 (application/json)

        [
            {
                "capsule_serial": "C201",
                "capsule_id": "dragon2",
                "status": "active",
                "original_launch": null,
                "original_launch_unix": null,
                "missions": [],
                "landings": 0,
                "type": "Dragon 2.0",
                "details": "Pressure vessel used for Dragon 2 structural testing. Rumored to be repurposed for first Red Dragon Mission"
            },
            {
                "capsule_serial": "C202",
                "capsule_id": "dragon2",
                "status": "active",
                "original_launch": null,
                "original_launch_unix": null,
                "missions": [],
                "landings": 0,
                "type": "Dragon 2.0",
                "details": "Capsule used to qualify Dragon 2's environmental control and life support systems."
            }
        ]

## Specific Capsule Details [/parts/caps/{capsule_serial}]

+ Parameters
    + capsule_serial (string) - Serial number of specific capsule

### Get information for specific capsule [GET]

+ Response 200 (application/json)

        {
            "capsule_serial": "C201",
            "capsule_id": "dragon2",
            "status": "active",
            "original_launch": null,
            "original_launch_unix": null,
            "missions": [],
            "landings": 0,
            "type": "Dragon 2.0",
            "details": "Pressure vessel used for Dragon 2 structural testing. Rumored to be repurposed for first Red Dragon Mission"
        }

## Core Details [/parts/cores]

+ Parameters
    + core_serial: `B1050` (string) - Filter by core serial number
    + block: `5` (integer) - Filter by core block number
    + status: `active` (string) - Filter by flight status
    + original_launch: `2007-03-21T01:10:00.000Z` (UTC ISO timestamp) - Filter by original launch date
    + missions: `DemoSAT` (string) - Filter by flight missions
    + rtls_attempt: `false` (boolean) - Filter by at least 1 rtls attempt
    + rtls_landings: `0` (integer) - Filter by total number of landings
    + asds_attempt: `false` (boolean) - Filter by at least 1 asda attempt
    + asds_landings: `0` (integer) - Filter by total number of landings
    + water_landing: `false` (boolean) - Filter by at least 1 water landing

### Get information for all cores [GET]

+ Response 200 (application/json)

        [
            {
                "core_serial": "B1050",
                "block": 5,
                "status": "active",
                "original_launch": null,
                "original_launch_unix": null,
                "missions": [],
                "rtls_attempt": false,
                "rtls_landings": 0,
                "asds_attempt": false,
                "asds_landings": 0,
                "water_landing": false,
                "details": "En-route to Cape Canaveral."
            },
            {
                "core_serial": "B1051",
                "block": 5,
                "status": "active",
                "original_launch": null,
                "original_launch_unix": null,
                "missions": [
                    "NASA DM-1"
                ],
                "rtls_attempt": false,
                "rtls_landings": 0,
                "asds_attempt": false,
                "asds_landings": 0,
                "water_landing": false,
                "details": "Undergoing qualification testing at McGegor."
            }
        ]

## Specific Core Details [/parts/cores/{core_serial}]

+ Parameters
    + core_serial (string) - Serial number of specific core

### Get information for specific core [GET]

+ Response 200 (application/json)

        {
            "core_serial": "B1041",
            "block": 4,
            "status": "expended",
            "original_launch": "2017-10-09T12:37:00.000Z",
            "original_launch_unix": 1507552620,
            "missions": [
                "Iridium NEXT 21-30",
                "Iridium NEXT 41-50"
            ],
            "rtls_attempt": false,
            "rtls_landings": 0,
            "asds_attempt": true,
            "asds_landings": 1,
            "water_landing": false,
            "details": "Will fly expendable on Iridium NEXT 41-50"
        }
