FORMAT: 1A

HOST: https://api.spacexdata.com/v2/

# Group Launchpads

Endpoints allowing you to get information related to launchpads used for SpaceX flights.

[Home](https://github.com/r-spacex/SpaceX-API/tree/master/docs)
 | [Launches](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches.md)
 | [Rockets](https://github.com/r-spacex/SpaceX-API/blob/master/docs/rockets.md)
 | [Capsules](https://github.com/r-spacex/SpaceX-API/blob/master/docs/capsules.md)
 | [Company Info](https://github.com/r-spacex/SpaceX-API/blob/master/docs/company_info.md)
 | [Parts](https://github.com/r-spacex/SpaceX-API/blob/master/docs/parts.md)
 | Launchpads

## Launchpads [/launchpads]

### Get information for all launchpads [GET]

+ Response 200 (application/json)

        [
            {
                "padid": 1,
                "id": "kwajalein_atoll",
                "full_name": "Kwajalein Atoll Omelek Island",
                "status": "retired",
                "location": {
                    "name": "Omelek Island",
                    "region": "Marshall Islands",
                    "latitude": 9.0477206,
                    "longitude": 167.7431292
                },
                "vehicles_launched": [
                    "Falcon 1"
                ],
                "details": "SpaceX original launch site, where all of the Falcon 1 launches occured. Abandoned as SpaceX decided against upgrading the pad to support Falcon 9."
            },
            {
                "padid": 2,
                "id": "ccafs_slc_40",
                "full_name": "Cape Canaveral Air Force Station Space Launch Complex 40",
                "status": "active",
                "location": {
                    "name": "Cape Canaveral",
                    "region": "Florida",
                    "latitude": 28.5618571,
                    "longitude": -80.577366
                },
                "vehicles_launched": [
                    "Falcon 9"
                ],
                "details": "SpaceX primary Falcon 9 launch pad, where all east coast Falcon 9s launched prior to the AMOS-6 anomaly. Initially used to launch Titan rockets for Lockheed Martin. Back online since CRS-13 on 2017-12-15."
            }
        ]

## Launchpad [/launchpads/{launchpad_id}]

+ Parameters
    + launchpad_id: `ksc_lc_39a` (string) - ID of the launchpad

### Get information for a specific launchpad [GET]

+ Response 200 (application/json)

        {
            "padid": 4,
            "id": "ksc_lc_39a",
            "full_name": "Kennedy Space Center Historic Launch Complex 39A",
            "status": "active",
            "location": {
                "name": "Cape Canaveral",
                "region": "Florida",
                "latitude": 28.6080585,
                "longitude": -80.6039558
            },
            "vehicles_launched": [
                "Falcon 9",
                "Falcon Heavy"
            ],
            "details": "NASA historic launch pad that launched most of the Saturn V and Space Shuttle missions. Initially for Falcon Heavy launches, it is now launching all of SpaceX east coast missions due to the damage from the AMOS-6 anomaly. After SLC-40 repairs are complete, it will be upgraded to support Falcon Heavy, a process which will take about two months. In the future it will launch commercial crew missions and the Interplanetary Transport System."
        }
