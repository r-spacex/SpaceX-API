# Company Info

[Home](https://github.com/r-spacex/SpaceX-API/blob/master/docs/home.md) | [Launches](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches.md) | [Rockets](https://github.com/r-spacex/SpaceX-API/blob/master/docs/rocket.md) | [Capsules](https://github.com/r-spacex/SpaceX-API/blob/master/docs/capsule.md) | [Company Info](https://github.com/r-spacex/SpaceX-API/blob/master/docs/company_info.md) | [Roadster Info](https://github.com/r-spacex/SpaceX-API/blob/master/docs/roadster.md) | [Capsule Details](https://github.com/r-spacex/SpaceX-API/blob/master/docs/capsule_detail.md) | [Core Detail](https://github.com/r-spacex/SpaceX-API/blob/master/docs/core_detail.md) | [Launchpads](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launchpad.md) | [Development](https://github.com/r-spacex/SpaceX-API/blob/master/docs/development.md)

# Starman Roadster Orbital Data
Get info + orbital data for roadster
```http
GET https://api.spacexdata.com/v2/info/roadster
```
**NOTE:** Data updated every 10 minutes

## Sample Response
```json
{
  "name": "Elon Musk's Tesla Roadster",
  "launch_date_utc": "2018-02-06T20:45:00.000Z",
  "launch_date_unix": 1517949900,
  "launch_mass_kg": 1350,
  "launch_mass_lbs": 2976,
  "norad_id": 43205,
  "epoch_jd": "2458335.450578704",
  "orbit_type": "heliocentric",
  "apoapsis_au": 1.663765240082827,
  "periapsis_au": 0.9861195640863657,
  "semi_major_axis_au": 117.5756506093678,
  "eccentricity": 0.2557264658940226,
  "inclination": 1.077452087899354,
  "longitude": 317.0971466828072,
  "periapsis_arg": 177.4927765278181,
  "period_days": 557.0496752889933,
  "speed_kph": 1320.0612,
  "speed_mph": 820.2477479052001,
  "earth_distance_km": 144738435.68344215,
  "earth_distance_mi": 89936266.51905613,
  "mars_distance_km": 133802709.94507824,
  "mars_distance_mi": 83141123.6812832,
  "wikipedia": "https://en.wikipedia.org/wiki/Elon_Musk%27s_Tesla_Roadster",
  "details": "Elon Musk's Tesla Roadster is an electric sports car that served as the dummy payload for the February 2018 Falcon Heavy test flight and is now an artificial satellite of the Sun. Starman, a mannequin dressed in a spacesuit, occupies the driver's seat. The car and rocket are products of Tesla and SpaceX, both companies founded by Elon Musk. This 2008-model Roadster was previously used by Musk for commuting, and is the only consumer car sent into space."
}
```
