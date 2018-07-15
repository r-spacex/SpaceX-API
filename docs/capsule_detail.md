# Capsule Details

## Endpoints
Get detailed info on all capsules
```http
GET https://api.spacexdata.com/v2/parts/caps
```

Get specific capsule data
```http
GET https://api.spacexdata.com/v2/parts/caps/C113 
```

Sample Response
```json
{
  "capsule_serial": "C113",
  "capsule_id": "dragon1",
  "status": "active",
  "original_launch": "2017-08-14T16:31:00.000Z",
  "original_launch_unix": 1502728260,
  "missions": [
    "SpaceX CRS-12"
  ],
  "landings": 1,
  "type": "Dragon 1.1",
  "details": "The last newly manufactured Dragon 1"
}

```
Filter all capsules by using any combination of these querystrings
```http
GET https://api.spacexdata.com/v2/parts/caps?status=active
```

| Query Stings  | Description |
| ------------- | ------------- |
| capsule_serial  | Filter by capsule serial # |
| capsule_id  | Filter by capsule id |
| status  | Filter by capsule status  |
| original_launch  | Filter by original launch date  |
| missions  | Filter by flight missions  |
| landings  | Filter by # of landings  |
| type  | Filter by type of dragon capusle  |