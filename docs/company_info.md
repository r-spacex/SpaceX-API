FORMAT: 1A

HOST: https://api.spacexdata.com/v2/

# Group Company Info

Endpoints allowing you to get information related to SpaceX as a company (including the Starman Roadster 🚗)!.

[Home](https://github.com/r-spacex/SpaceX-API/tree/master/docs)
 | [Launches](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches.md)
 | [Rockets](https://github.com/r-spacex/SpaceX-API/blob/master/docs/rockets.md)
 | [Capsules](https://github.com/r-spacex/SpaceX-API/blob/master/docs/capsules.md)
 | Company Info
 | [Parts](https://github.com/r-spacex/SpaceX-API/blob/master/docs/parts.md)
 | [Launchpads](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launchpads.md)

## Company Info [/info]

### Get information on Space Exploration Technologies Corp [GET]

+ Response 200 (application/json)

        {
            "name": "SpaceX",
            "founder": "Elon Musk",
            "founded": 2002,
            "employees": 7000,
            "vehicles": 3,
            "launch_sites": 3,
            "test_sites": 1,
            "ceo": "Elon Musk",
            "cto": "Elon Musk",
            "coo": "Gwynne Shotwell",
            "cto_propulsion": "Tom Mueller",
            "valuation": 15000000000,
            "headquarters": {
                "address": "Rocket Road",
                "city": "Hawthorne",
                "state": "California"
            },
            "summary": "SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets."
        }

## Starman Roadster Orbital Data [/info/roadster]

### Get information and orbital data for Starman Roadster [GET]
**Updated every 10 minutes.**

+ Response 200 (application/json)

        {
            "name": "Elon Musk's Tesla Roadster",
            "launch_date_utc": "2018-02-06T20:45:00.000Z",
            "launch_date_unix": 1517949900,
            "launch_mass_kg": 1350,
            "launch_mass_lbs": 2976,
            "norad_id": 43205,
            "epoch_jd": 2458351.350717593,
            "orbit_type": "heliocentric",
            "apoapsis_au": 1.663758111520328,
            "periapsis_au": 0.9860978131167345,
            "semi_major_axis_au": 127.8536201620165,
            "eccentricity": 0.2557347711258714,
            "inclination": 1.077471933138666,
            "longitude": 317.0962840934014,
            "periapsis_arg": 177.4915324616513,
            "period_days": 557.0405688798362,
            "speed_kph": 76919.832,
            "speed_mph": 47795.752929671995,
            "earth_distance_km": 170231639.72352818,
            "earth_distance_mi": 105777004.20664842,
            "mars_distance_km": 146255195.0091546,
            "mars_distance_mi": 90878736.77803339,
            "wikipedia": "https://en.wikipedia.org/wiki/Elon_Musk%27s_Tesla_Roadster",
            "details": "Elon Musk's Tesla Roadster is an electric sports car that served as the dummy payload for the February 2018 Falcon Heavy test flight and is now an artificial satellite of the Sun. Starman, a mannequin dressed in a spacesuit, occupies the driver's seat. The car and rocket are products of Tesla and SpaceX, both companies founded by Elon Musk. This 2008-model Roadster was previously used by Musk for commuting, and is the only consumer car sent into space."
        }

## History [/info/history]

+ Parameters
    + sort: `norad_id` (string) - Change result sorting by setting value to any parameter in this list
    + order: `asc` (string) - Change result ordering by setting values of `asc` or `desc`
    + start/end: `start=2017-06-22&end=2017-06-25` (valid JavaScript date format) - Include both to sort by date range
    + flight_number: `60` (integer) - Filter by flight number

### Get company history and milestones [GET]

+ Response 200 (application/json)

        [
            {
                "title": "Pad Abort Test",
                "event_date_utc": "2015-05-06T13:00:00Z",
                "event_date_unix": 1430917200,
                "flight_number": null,
                "details": "Crew Dragon tests launch abort system, which can provide astronauts with escape capability all the way to orbit.",
                "links": {
                    "reddit": "https://www.reddit.com/r/spacex/comments/3527zv/official_video_pad_abort_test_2015/",
                    "article": "https://spaceflightnow.com/2015/04/21/dragon-pad-abort-test-set-for-early-may/",
                    "wikipedia": "https://en.wikipedia.org/wiki/Pad_abort_test"
                }
            },
            {
                "title": "SpaceX Awarded Commercial Crew Contract",
                "event_date_utc": "2014-09-16T01:00:00Z",
                "event_date_unix": 1410829200,
                "flight_number": null,
                "details": "NASA awards $2.6 billion SpaceX contract to fly American astronauts.",
                "links": {
                    "reddit": null,
                    "article": "https://www.washingtonpost.com/news/the-switch/wp/2014/09/16/nasa-awards-space-contract-to-boeing-and-spacex/?utm_term=.d6388390d071",
                    "wikipedia": null
                }
            },
            {
                "title": "Falcon 9 Reusable Test Vehicle Flies 1000M",
                "event_date_utc": "2014-05-02T01:00:00Z",
                "event_date_unix": 1398992400,
                "flight_number": null,
                "details": "Vehicle completes highest leap to date, lands safely.",
                "links": {
                    "reddit": null,
                    "article": "http://www.parabolicarc.com/2014/05/02/falcon-9-reusable-vehicle-flies-1000-meters/",
                    "wikipedia": null
                }
            }
        ]
