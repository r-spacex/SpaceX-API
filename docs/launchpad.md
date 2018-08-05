# Launchpads

[Home](https://github.com/r-spacex/SpaceX-API/blob/master/docs/home.md) | [Launches](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches.md) | [Rockets](https://github.com/r-spacex/SpaceX-API/blob/master/docs/rocket.md) | [Capsules](https://github.com/r-spacex/SpaceX-API/blob/master/docs/capsule.md) | [Company Info](https://github.com/r-spacex/SpaceX-API/blob/master/docs/company_info.md) | [Roadster Info](https://github.com/r-spacex/SpaceX-API/blob/master/docs/roadster.md) | [Capsule Details](https://github.com/r-spacex/SpaceX-API/blob/master/docs/capsule_detail.md) | [Core Detail](https://github.com/r-spacex/SpaceX-API/blob/master/docs/core_detail.md) | [Launchpads](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launchpad.md) | [Development](https://github.com/r-spacex/SpaceX-API/blob/master/docs/development.md)

## Endpoints
Get launchpad information
```http
GET https://api.spacexdata.com/v2/launchpads
```
Get individual launchpad info
```http
GET https://api.spacexdata.com/v2/launchpads/ksc_lc_39a
```

Sample Response
```json
{
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
```