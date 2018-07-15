Get detailed info on all cores
```http
GET https://api.spacexdata.com/v2/parts/cores
```

Get specific core data
```http
GET https://api.spacexdata.com/v2/parts/cores/B1041
```

Sample Response
```json
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
```

Filter cores by using any combination of these querystrings
```http
GET https://api.spacexdata.com/v2/parts/cores?status=active
```

| Query Stings  | Description |
| ------------- | ------------- |
| core_serial  | Filter by core serial # |
| block  | Filter by core block number  |
| status  | Filter by flight status  |
| original_launch  | Filter by original launch date  |
| missions  | Filter by flight missions  |
| rtls_attempt  | Filter by at least 1 rtls attempt  |
| rtls_landings  | Filter by total number of landings  |
| asds_attempt  | Filter by at least 1 asds attempt  |
| asds_landings  | Filter by total number of landings |
| water_landing  | Filter by at least 1 water landing  |