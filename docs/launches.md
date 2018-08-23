FORMAT: 1A

HOST: https://api.spacexdata.com/v2/

# Group Launches

Endpoints allowing you to get information related to SpaceX launches.

[Home](https://github.com/r-spacex/SpaceX-API/tree/master/docs)
| Launches | [Rockets](https://github.com/r-spacex/SpaceX-API/blob/master/docs/rockets.md)
| [Capsules](https://github.com/r-spacex/SpaceX-API/blob/master/docs/capsules.md)
| [Company Info](https://github.com/r-spacex/SpaceX-API/blob/master/docs/company_info.md)
| [Parts](https://github.com/r-spacex/SpaceX-API/blob/master/docs/parts.md)
| [Launchpads](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launchpads.md)

All launches can be filtered though any combination of query parameters.

+ Parameters
    + id: `true` (boolean) - Set as `true` to show mongo document id's
    + flight_id: `5a9fc479ab70786ba5a1eaaa` (string) - Filter launches by mongo document id
    + sort: `norad_id` (string) - Change result sorting by setting value to any parameter in this list
    + order: `desc` (string) - Change result ordering by setting values of `asc` or `desc`
    + start/end: `start=2017-06-22&end=2017-06-25` (valid JavaScript date format) - Include both to sort by date range
    + flight_number: `60` (integer) - Filter by flight number
    + launch_year: `2018` (integer) - Filter by launch year
    + launch_date_utc: `2017-06-23T19:10:000Z` (UTC ISO timestamp)
    + launch_date_local: `2017-06-23T15:10:00-04:00` (local ISO timestamp)
    + rocket_id: `falconheavy` (string) - Filter by rocket ID
    + rocket_name: `Falcon+Heavy` (string) - Filter by rocket name
    + rocket_type: `FT` (string) - Filter by rocket type
    + core_serial: `B1045` (string) - Filter by core serial number
    + cap_serial: `C111` (string) - Filter by dragon capsule serial number
    + core_flight: `2` (integer) - Filter by number of previous core flights
    + block: `5` (integer) - Filter by core block number
    + core_reuse: `true` (boolean) - Filter by core reusability
    + side_core1_reuse: `false` (boolean) - Filter by Falcon Heavy side core 1 reuse
    + side_core2_reuse: `false` (boolean) - Filter by Falcon Heavy side core 2 reuse
    + fairings_reuse: `false` (boolean) - Filter by fairing reuse
    + capsule_reuse: `true` (boolean) - Filter by Dragon capsule reuse
    + site_id: `ksc_lc_39a` (string) - Filter by launch site ID
    + site_name: `KSC+LC+39A` (string) - Filter by launch site name
    + site_name_long: `Kennedy+Space+Center+Historic+Launch+Complex+39A` (string) - Filter by long launch site name
    + payload_id: `BulgariaSat-1` (string) - Filter by payload ID
    + norad_id: `43571` (integer) - Filter by NORAD ID
    + customer: `Iridium` (string) - Filter by launch customer
    + nationality: `Bulgaria` (string) - Filter by payload nationality
    + manufacturer: `SSL` (string) - Filter by payload manufacturer
    + payload_type: `Satellita` (string) - Filter by payload type
    + orbit: `GTO` (string) - Filter by payload orbit
    + launch_success: `true` (boolean) - Filter by successful launches
    + reused: `true` (boolean) - Filter by launches with reused cores
    + land_success: `true` (boolean) - Filter by successful core landings
    + landing_type: `ASDS` (string) - Filter by landing method
    + landing_vehicle: `OCISLY` (string) - Filter by landing vehicle

## Past Launches [/launches]

### Get information for all past launches [GET]

+ Response 200 (application/json)

        [
            {
                "flight_number": 1,
                "mission_name": "FalconSat",
                "upcoming": false,
                "launch_year": "2006",
                "launch_date_unix": 1143239400,
                "launch_date_utc": "2006-03-24T22:30:00.000Z",
                "launch_date_local": "2006-03-25T10:30:00+12:00",
                "rocket": {
                    "rocket_id": "falcon1",
                    "rocket_name": "Falcon 1",
                    "rocket_type": "Merlin A",
                    "first_stage": {
                        "cores": [
                            {
                                "core_serial": "Merlin1A",
                                "flight": 1,
                                "block": null,
                                "reused": false,
                                "land_success": false,
                                "landing_type": null,
                                "landing_vehicle": null
                            }
                        ]
                    },
                    "second_stage": {
                        "block": 1,
                        "payloads": [
                            {
                                "payload_id": "FalconSAT-2",
                                "norad_id": [],
                                "reused": false,
                                "customers": [
                                    "DARPA"
                                ],
                                "nationality": "United States",
                                "manufacturer": "SSTL",
                                "payload_type": "Satellite",
                                "payload_mass_kg": 20,
                                "payload_mass_lbs": 43,
                                "orbit": "LEO",
                                "orbit_params": {
                                    "reference_system": "geocentric",
                                    "regime": "low-earth",
                                    "longitude": null,
                                    "semi_major_axis_km": null,
                                    "eccentricity": null,
                                    "periapsis_km": 400,
                                    "apoapsis_km": 500,
                                    "inclination_deg": 39,
                                    "period_min": null,
                                    "lifespan_years": null
                                }
                            }
                        ]
                    }
                },
                "telemetry": {
                    "flight_club": null
                },
                "reuse": {
                    "core": false,
                    "side_core1": false,
                    "side_core2": false,
                    "fairings": false,
                    "capsule": false
                },
                "launch_site": {
                    "site_id": "kwajalein_atoll",
                    "site_name": "Kwajalein Atoll",
                    "site_name_long": "Kwajalein Atoll Omelek Island"
                },
                "launch_success": false,
                "links": {
                    "mission_patch": "https://images2.imgbox.com/40/e3/GypSkayF_o.png",
                    "mission_patch_small": "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png",
                    "article_link": "https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html",
                    "wikipedia": "https://en.wikipedia.org/wiki/DemoSat",
                    "video_link": "https://www.youtube.com/watch?v=0a_00nJ_Y88"
                },
                "details": "Engine failure at 33 seconds and loss of vehicle",
                "static_fire_date_utc": "2006-03-17T00:00:00.000Z"
            }
        ]

## Latest Launch [/launches/latest]

### Get information for the latest launch [GET]

+ Response 200 (application/json)

        {
            "flight_number": 67,
            "mission_name": "Merah Putih",
            "launch_year": "2018",
            "launch_date_unix": 1533619080,
            "launch_date_utc": "2018-08-07T05:18:00.000Z",
            "launch_date_local": "2018-08-07T01:18:00-04:00",
            "rocket": {
                "rocket_id": "falcon9",
                "rocket_name": "Falcon 9",
                "rocket_type": "FT",
                "first_stage": {
                    "cores": [
                        {
                            "core_serial": "B1046",
                            "flight": 2,
                            "block": 5,
                            "reused": true,
                            "land_success": true,
                            "landing_type": "ASDS",
                            "landing_vehicle": "OCISLY"
                        }
                    ]
                },
                "second_stage": {
                    "block": 5,
                    "payloads": [
                        {
                            "payload_id": "Telkom-4",
                            "norad_id": [
                                43587
                            ],
                            "reused": false,
                            "customers": [
                                "Telkom"
                            ],
                            "nationality": "Indonesia",
                            "manufacturer": "SSL",
                            "payload_type": "Satellite",
                            "payload_mass_kg": 5800,
                            "payload_mass_lbs": 12786.81,
                            "orbit": "GTO",
                            "orbit_params": {
                                "reference_system": "geocentric",
                                "regime": "geostationary",
                                "longitude": -108,
                                "semi_major_axis_km": 21226.178,
                                "eccentricity": 0.6904141,
                                "periapsis_km": 193.19,
                                "apoapsis_km": 29502.896,
                                "inclination_deg": 27.0648,
                                "period_min": 512.941,
                                "lifespan_years": 15,
                                "epoch": "2018-08-07T06:57:16.000Z",
                                "mean_motion": 2.80734018,
                                "raan": 227.0228
                            }
                        }
                    ]
                }
            },
            "telemetry": {
                "flight_club": null
            },
            "reuse": {
                "core": true,
                "side_core1": false,
                "side_core2": false,
                "fairings": false,
                "capsule": false
            },
            "launch_site": {
                "site_id": "ccafs_slc_40",
                "site_name": "CCAFS SLC 40",
                "site_name_long": "Cape Canaveral Air Force Station Space Launch Complex 40"
            },
            "launch_success": true,
            "links": {
                "mission_patch": "https://images2.imgbox.com/a8/f5/ZgdsrbqW_o.png",
                "mission_patch_small": "https://images2.imgbox.com/a7/ec/sbwePzVD_o.png",
                "reddit_campaign": "https://www.reddit.com/r/spacex/comments/91gwfg/merah_putih_telkom4_launch_campaign_thread/",
                "reddit_launch": "https://www.reddit.com/r/spacex/comments/9539nr/rspacex_merah_putih_telkom4_official_launch/",
                "reddit_recovery": null,
                "reddit_media": "https://www.reddit.com/r/spacex/comments/94zr0b/rspacex_merah_putih_media_thread_videos_images/",
                "presskit": "https://www.spacex.com/sites/spacex/files/merahputihpresskit.pdf",
                "article_link": "https://spaceflightnow.com/2018/08/07/indonesian-communications-satellite-deployed-in-orbit-by-spacex/",
                "wikipedia": "https://en.wikipedia.org/wiki/Telkom_Indonesia",
                "video_link": "https://www.youtube.com/watch?v=FjfQNBYv2IY"
            },
            "details": "Indonesian comsat intended to replace the aging Telkom 1 at 108° E. First reflight of a Block 5-version booster.",
            "upcoming": false,
            "static_fire_date_utc": "2018-08-02T15:53:00.000Z"
        }

## Next Launch [/launches/next]

### Get information for the next launch [GET]

        {
            "flight_number": 68,
            "mission_name": "Telstar 18V",
            "launch_year": "2018",
            "launch_date_unix": 1535254380,
            "launch_date_utc": "2018-08-26T03:33:00.000Z",
            "launch_date_local": "2018-08-25T23:33:00-04:00",
            "rocket": {
                "rocket_id": "falcon9",
                "rocket_name": "Falcon 9",
                "rocket_type": "FT",
                "first_stage": {
                    "cores": [
                        {
                            "core_serial": "B1049",
                            "flight": 1,
                            "block": 5,
                            "reused": false,
                            "land_success": null,
                            "landing_type": "ASDS",
                            "landing_vehicle": "OCISLY"
                        }
                    ]
                },
                "second_stage": {
                    "block": null,
                    "payloads": [
                        {
                            "payload_id": "Telstar 18V",
                            "norad_id": [],
                            "reused": false,
                            "customers": [
                                "Telesat"
                            ],
                            "nationality": null,
                            "manufacturer": null,
                            "payload_type": "Satellite",
                            "payload_mass_kg": null,
                            "payload_mass_lbs": null,
                            "orbit": "GTO",
                            "orbit_params": {
                                "reference_system": "geocentric",
                                "regime": "geostationary",
                                "longitude": null,
                                "semi_major_axis_km": null,
                                "eccentricity": null,
                                "periapsis_km": null,
                                "apoapsis_km": null,
                                "inclination_deg": null,
                                "period_min": null,
                                "lifespan_years": 15
                            }
                        }
                    ]
                }
            },
            "telemetry": {
                "flight_club": null
            },
            "reuse": {
                "core": false,
                "side_core1": false,
                "side_core2": false,
                "fairings": false,
                "capsule": false
            },
            "launch_site": {
                "site_id": "ccafs_slc_40",
                "site_name": "CCAFS SLC 40",
                "site_name_long": "Cape Canaveral Air Force Station Space Launch Complex 40"
            },
            "launch_success": null,
            "links": {
                "mission_patch": null,
                "mission_patch_small": null,
                "reddit_campaign": "https://www.reddit.com/r/spacex/comments/95cte4/telstar_18v_apstar_5c_launch_campaign_thread/",
                "reddit_launch": null,
                "reddit_recovery": null,
                "reddit_media": null,
                "presskit": null,
                "article_link": null,
                "wikipedia": null,
                "video_link": null
            },
            "details": null,
            "upcoming": true,
            "static_fire_date_utc": null
        }

## Upcoming Launches [/launches/upcoming]

### Get information for upcoming launches [GET]

        [
            {
                "flight_number": 68,
                "mission_name": "Telstar 18V",
                "launch_year": "2018",
                "launch_date_unix": 1535254380,
                "launch_date_utc": "2018-08-26T03:33:00.000Z",
                "launch_date_local": "2018-08-25T23:33:00-04:00",
                "rocket": {
                    "rocket_id": "falcon9",
                    "rocket_name": "Falcon 9",
                    "rocket_type": "FT",
                    "first_stage": {
                        "cores": [
                            {
                                "core_serial": "B1049",
                                "flight": 1,
                                "block": 5,
                                "reused": false,
                                "land_success": null,
                                "landing_type": "ASDS",
                                "landing_vehicle": "OCISLY"
                            }
                        ]
                    },
                    "second_stage": {
                        "block": null,
                        "payloads": [
                            {
                                "payload_id": "Telstar 18V",
                                "norad_id": [],
                                "reused": false,
                                "customers": [
                                    "Telesat"
                                ],
                                "nationality": null,
                                "manufacturer": null,
                                "payload_type": "Satellite",
                                "payload_mass_kg": null,
                                "payload_mass_lbs": null,
                                "orbit": "GTO",
                                "orbit_params": {
                                    "reference_system": "geocentric",
                                    "regime": "geostationary",
                                    "longitude": null,
                                    "semi_major_axis_km": null,
                                    "eccentricity": null,
                                    "periapsis_km": null,
                                    "apoapsis_km": null,
                                    "inclination_deg": null,
                                    "period_min": null,
                                    "lifespan_years": 15
                                }
                            }
                        ]
                    }
                },
                "telemetry": {
                    "flight_club": null
                },
                "reuse": {
                    "core": false,
                    "side_core1": false,
                    "side_core2": false,
                    "fairings": false,
                    "capsule": false
                },
                "launch_site": {
                    "site_id": "ccafs_slc_40",
                    "site_name": "CCAFS SLC 40",
                    "site_name_long": "Cape Canaveral Air Force Station Space Launch Complex 40"
                },
                "launch_success": null,
                "links": {
                    "mission_patch": null,
                    "mission_patch_small": null,
                    "reddit_campaign": "https://www.reddit.com/r/spacex/comments/95cte4/telstar_18v_apstar_5c_launch_campaign_thread/",
                    "reddit_launch": null,
                    "reddit_recovery": null,
                    "reddit_media": null,
                    "presskit": null,
                    "article_link": null,
                    "wikipedia": null,
                    "video_link": null
                },
                "details": null,
                "upcoming": true,
                "static_fire_date_utc": null
            },
            {
                "flight_number": 69,
                "mission_name": "SAOCOM 1A",
                "launch_year": "2018",
                "launch_date_unix": 1538179200,
                "launch_date_utc": "2018-09-29T00:00:00.000Z",
                "launch_date_local": "2018-09-28T17:00:00-07:00",
                "rocket": {
                    "rocket_id": "falcon9",
                    "rocket_name": "Falcon 9",
                    "rocket_type": "FT",
                    "first_stage": {
                        "cores": [
                            {
                                "core_serial": "B1048",
                                "flight": 2,
                                "block": 5,
                                "reused": true,
                                "land_success": null,
                                "landing_type": "RTLS",
                                "landing_vehicle": "LZ-3"
                            }
                        ]
                    },
                    "second_stage": {
                        "block": null,
                        "payloads": [
                            {
                                "payload_id": "SAOCOM 1A",
                                "norad_id": [],
                                "reused": false,
                                "customers": [
                                    "CONAE"
                                ],
                                "nationality": null,
                                "manufacturer": null,
                                "payload_type": "Satellite",
                                "payload_mass_kg": 1600,
                                "payload_mass_lbs": 3527.4,
                                "orbit": "SSO",
                                "orbit_params": {
                                    "reference_system": "geocentric",
                                    "regime": "sun-synchronous",
                                    "longitude": null,
                                    "semi_major_axis_km": null,
                                    "eccentricity": null,
                                    "periapsis_km": null,
                                    "apoapsis_km": null,
                                    "inclination_deg": null,
                                    "period_min": null,
                                    "lifespan_years": null
                                }
                            }
                        ]
                    }
                },
                "telemetry": {
                    "flight_club": null
                },
                "reuse": {
                    "core": false,
                    "side_core1": false,
                    "side_core2": false,
                    "fairings": false,
                    "capsule": false
                },
                "launch_site": {
                    "site_id": "vafb_slc_4e",
                    "site_name": "VAFB SLC 4E",
                    "site_name_long": "Vandenberg Air Force Base Space Launch Complex 4E"
                },
                "launch_success": null,
                "links": {
                    "mission_patch": null,
                    "mission_patch_small": null,
                    "reddit_campaign": null,
                    "reddit_launch": null,
                    "reddit_recovery": null,
                    "reddit_media": null,
                    "presskit": null,
                    "article_link": null,
                    "wikipedia": null,
                    "video_link": null
                },
                "details": null,
                "upcoming": true,
                "static_fire_date_utc": null
            }
        ]

## All Launches [/launches/all]

### Get information for all upcoming and past launches [GET]

+ Response 200 (application/json)

        [
            {
                "flight_number": 1,
                "mission_name": "FalconSat",
                "upcoming": false,
                "launch_year": "2006",
                "launch_date_unix": 1143239400,
                "launch_date_utc": "2006-03-24T22:30:00.000Z",
                "launch_date_local": "2006-03-25T10:30:00+12:00",
                "rocket": {
                    "rocket_id": "falcon1",
                    "rocket_name": "Falcon 1",
                    "rocket_type": "Merlin A",
                    "first_stage": {
                        "cores": [
                            {
                                "core_serial": "Merlin1A",
                                "flight": 1,
                                "block": null,
                                "reused": false,
                                "land_success": false,
                                "landing_type": null,
                                "landing_vehicle": null
                            }
                        ]
                    },
                    "second_stage": {
                        "block": 1,
                        "payloads": [
                            {
                                "payload_id": "FalconSAT-2",
                                "norad_id": [],
                                "reused": false,
                                "customers": [
                                    "DARPA"
                                ],
                                "nationality": "United States",
                                "manufacturer": "SSTL",
                                "payload_type": "Satellite",
                                "payload_mass_kg": 20,
                                "payload_mass_lbs": 43,
                                "orbit": "LEO",
                                "orbit_params": {
                                    "reference_system": "geocentric",
                                    "regime": "low-earth",
                                    "longitude": null,
                                    "semi_major_axis_km": null,
                                    "eccentricity": null,
                                    "periapsis_km": 400,
                                    "apoapsis_km": 500,
                                    "inclination_deg": 39,
                                    "period_min": null,
                                    "lifespan_years": null
                                }
                            }
                        ]
                    }
                },
                "telemetry": {
                    "flight_club": null
                },
                "reuse": {
                    "core": false,
                    "side_core1": false,
                    "side_core2": false,
                    "fairings": false,
                    "capsule": false
                },
                "launch_site": {
                    "site_id": "kwajalein_atoll",
                    "site_name": "Kwajalein Atoll",
                    "site_name_long": "Kwajalein Atoll Omelek Island"
                },
                "launch_success": false,
                "links": {
                    "mission_patch": "https://images2.imgbox.com/40/e3/GypSkayF_o.png",
                    "mission_patch_small": "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png",
                    "article_link": "https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html",
                    "wikipedia": "https://en.wikipedia.org/wiki/DemoSat",
                    "video_link": "https://www.youtube.com/watch?v=0a_00nJ_Y88"
                },
                "details": "Engine failure at 33 seconds and loss of vehicle",
                "static_fire_date_utc": "2006-03-17T00:00:00.000Z"
            },
            {
                "flight_number": 2,
                "mission_name": "DemoSat",
                "launch_year": "2007",
                "launch_date_unix": 1174439400,
                "launch_date_utc": "2007-03-21T01:10:00.000Z",
                "launch_date_local": "2007-03-21T13:10:00+12:00",
                "rocket": {
                    "rocket_id": "falcon1",
                    "rocket_name": "Falcon 1",
                    "rocket_type": "Merlin A",
                    "first_stage": {
                        "cores": [
                            {
                                "core_serial": "Merlin2A",
                                "flight": 1,
                                "block": null,
                                "reused": false,
                                "land_success": false,
                                "landing_type": null,
                                "landing_vehicle": null
                            }
                        ]
                    },
                    "second_stage": {
                        "block": 1,
                        "payloads": [
                            {
                                "payload_id": "DemoSAT",
                                "norad_id": [],
                                "reused": false,
                                "customers": [
                                    "DARPA"
                                ],
                                "nationality": "United States",
                                "manufacturer": "SpaceX",
                                "payload_type": "Satellite",
                                "payload_mass_kg": null,
                                "payload_mass_lbs": null,
                                "orbit": "LEO",
                                "orbit_params": {
                                    "reference_system": "geocentric",
                                    "regime": "low-earth",
                                    "longitude": null,
                                    "semi_major_axis_km": null,
                                    "eccentricity": null,
                                    "periapsis_km": null,
                                    "apoapsis_km": null,
                                    "inclination_deg": null,
                                    "period_min": null,
                                    "lifespan_years": null
                                }
                            }
                        ]
                    }
                },
                "telemetry": {
                    "flight_club": null
                },
                "reuse": {
                    "core": false,
                    "side_core1": false,
                    "side_core2": false,
                    "fairings": false,
                    "capsule": false
                },
                "launch_site": {
                    "site_id": "kwajalein_atoll",
                    "site_name": "Kwajalein Atoll",
                    "site_name_long": "Kwajalein Atoll Omelek Island"
                },
                "launch_success": false,
                "links": {
                    "mission_patch": "https://images2.imgbox.com/be/e7/iNqsqVYM_o.png",
                    "mission_patch_small": "https://images2.imgbox.com/4f/e3/I0lkuJ2e_o.png",
                    "article_link": "https://www.space.com/3590-spacex-falcon-1-rocket-fails-reach-orbit.html",
                    "wikipedia": "https://en.wikipedia.org/wiki/DemoSat",
                    "video_link": "https://www.youtube.com/watch?v=YMvQsmLv44o"
                },
                "details": "Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage",
                "upcoming": false,
                "static_fire_date_utc": null
            }
        ]
