FORMAT: 1A

HOST: https://api.spacexdata.com/v2/

# Group Rockets

Endpoints allowing you to get information related to SpaceX rockets.

[Home](https://github.com/r-spacex/SpaceX-API/tree/master/docs)
 | [Launches](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches.md)
 | Rockets
 | [Capsules](https://github.com/r-spacex/SpaceX-API/blob/master/docs/capsules.md)
 | [Company Info](https://github.com/r-spacex/SpaceX-API/blob/master/docs/company_info.md)
 | [Parts](https://github.com/r-spacex/SpaceX-API/blob/master/docs/parts.md)
 | [Launchpads](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launchpads.md)

## Rockets [/rockets]

### Get information for rockets [GET]

+ Response 200 (application/json)

        [
            {
                "rocketid": 1,
                "id": "falcon1",
                "name": "Falcon 1",
                "type": "rocket",
                "active": false,
                "stages": 2,
                "boosters": 0,
                "cost_per_launch": 6700000,
                "success_rate_pct": 40,
                "first_flight": "2006-03-24",
                "country": "Republic of the Marshall Islands",
                "company": "SpaceX",
                "height": {
                    "meters": 22.25,
                    "feet": 73
                },
                "diameter": {
                    "meters": 1.68,
                    "feet": 5.5
                },
                "mass": {
                    "kg": 30146,
                    "lb": 66460
                },
                "payload_weights": [
                    {
                        "id": "leo",
                        "name": "Low Earth Orbit",
                        "kg": 450,
                        "lb": 992
                    }
                ],
                "first_stage": {
                    "reusable": false,
                    "engines": 1,
                    "fuel_amount_tons": 44.3,
                    "burn_time_sec": 169,
                    "thrust_sea_level": {
                        "kN": 420,
                        "lbf": 94000
                    },
                    "thrust_vacuum": {
                        "kN": 480,
                        "lbf": 110000
                    }
                },
                "second_stage": {
                    "engines": 1,
                    "fuel_amount_tons": 3.38,
                    "burn_time_sec": 378,
                    "thrust": {
                        "kN": 31,
                        "lbf": 7000
                    },
                    "payloads": {
                        "option_1": "composite fairing",
                        "composite_fairing": {
                            "height": {
                                "meters": 3.5,
                                "feet": 11.5
                            },
                            "diameter": {
                                "meters": 1.5,
                                "feet": 4.9
                            }
                        }
                    }
                },
                "engines": {
                    "number": 1,
                    "type": "merlin",
                    "version": "1C",
                    "layout": "single",
                    "engine_loss_max": 0,
                    "propellant_1": "liquid oxygen",
                    "propellant_2": "RP-1 kerosene",
                    "thrust_sea_level": {
                        "kN": 420,
                        "lbf": 94000
                    },
                    "thrust_vacuum": {
                        "kN": 480,
                        "lbf": 110000
                    },
                    "thrust_to_weight": 96
                },
                "landing_legs": {
                    "number": 0,
                    "material": null
                },
                "wikipedia": "https://en.wikipedia.org/wiki/Falcon_1",
                "description": "The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, Falcon 1 became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth."
            },
            {
                "rocketid": 2,
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
                "wikipedia": "https://en.wikipedia.org/wiki/Falcon_9",
                "description": "Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit."
            }
        ]

## Rockets [/rockets/{rocket_id}]

+ Parameters
    + rocket_id: `bfr` (string) - ID of the rocket

###  Get information for a specific rocket [GET]

+ Response 200 (application/json)

        {
            "rocketid": 4,
            "id": "bfr",
            "name": "Big Falcon Rocket",
            "type": "rocket",
            "active": false,
            "stages": 2,
            "boosters": 0,
            "cost_per_launch": 7000000,
            "success_rate_pct": 0,
            "first_flight": "2019-12-01",
            "country": "United States",
            "company": "SpaceX",
            "height": {
                "meters": 106,
                "feet": 348
            },
            "diameter": {
                "meters": 9,
                "feet": 30
            },
            "mass": {
                "kg": 4400000,
                "lb": 9700000
            },
            "payload_weights": [
                {
                    "id": "leo",
                    "name": "Low Earth Orbit",
                    "kg": 150000,
                    "lb": 330000
                },
                {
                    "id": "mars",
                    "name": "Mars Orbit",
                    "kg": 150000,
                    "lb": 330000
                }
            ],
            "first_stage": {
                "reusable": true,
                "engines": 31,
                "fuel_amount_tons": 6700,
                "burn_time_sec": 0,
                "thrust_sea_level": {
                    "kN": 128000,
                    "lbf": 28775544
                },
                "thrust_vacuum": {
                    "kN": 138000,
                    "lbf": 31023634
                }
            },
            "second_stage": {
                "engines": 6,
                "fuel_amount_tons": 1100,
                "burn_time_sec": 0,
                "thrust": {
                    "kN": 1900,
                    "lbf": 427136
                },
                "payloads": {
                    "option_1": "Spaceship",
                    "option_2": "composite fairing",
                    "composite_fairing": {
                        "height": {
                            "meters": null,
                            "feet": null
                        },
                        "diameter": {
                            "meters": null,
                            "feet": null
                        }
                    }
                }
            },
            "engines": {
                "number": 31,
                "type": "raptor",
                "version": "",
                "layout": null,
                "engine_loss_max": null,
                "propellant_1": "liquid oxygen",
                "propellant_2": "liquid methane",
                "thrust_sea_level": {
                    "kN": 1700,
                    "lbf": 382175
                },
                "thrust_vacuum": {
                    "kN": 1900,
                    "lbf": 427136
                },
                "thrust_to_weight": null
            },
            "landing_legs": {
                "number": 4,
                "material": "carbon fiber"
            },
            "wikipedia": "https://en.wikipedia.org/wiki/BFR_(rocket)",
            "description": "BFR is a privately funded next-generation reusable launch vehicle and spacecraft system developed by SpaceX. It was announced by Elon Musk in September 2017; the first spacecraft prototype was being manufactured as of March 2018 and will begin testing in early 2019. The overall space vehicle architecture includes both launch vehicles and spacecraft that are intended to completely replace all of SpaceX's existing space hardware by the early 2020s as well as ground infrastructure for rapid launch and relaunch, and zero-gravity propellant transfer technology to be deployed in low Earth orbit (LEO). The large payload to Earth orbit of up to 150,000 kg (330,000 lb) makes BFR a super heavy-lift launch vehicle."
        }
