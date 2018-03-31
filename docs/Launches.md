Get latest launch
```http
GET https://api.spacexdata.com/v2/launches/latest
```
Get all past launches
```http
GET https://api.spacexdata.com/v2/launches
```
Get all upcoming launches
```http
GET https://api.spacexdata.com/v2/launches/upcoming
```
Get all upcoming and past launches
```http
GET https://api.spacexdata.com/v2/launches/all
```

All launches can be filtered though any combination of the following query strings

```http
GET https://api.spacexdata.com/v2/launches?launch_year=2017&rocket_id=falcon9&core_reuse=true&core_serial=B1029
```
# Querystring Response Notes
* By default, this endpoint returns an array of JSON objects when queried
* If no match is found when using querystring filtering, an empty array is returned `[]` with a 200 response code

# Query String Options
| Query Strings  | Description |
| ------------- | ------------- |
| id  | Use `true` to show mongo document id's |
| flight\_id  | Filter launches by mongo document id |
| order  | Change result ordering by `asc` or `desc` |
| start & final  | Filter by a date range |
| flight\_number  | Filter by flight number  |
| launch\_year  | Filter by year  |
| launch\_date\_utc  | Filter by UTC timestamp  |
| launch\_date\_local  | Filter by local ISO timestamp  |
| rocket\_id  | Filter by rocket id  |
| rocket\_name  | Filter by rocket name  |
| rocket\_type  | Filter by rocket type  |
| core_serial  | Filter by core serial #  |
| cap_serial  | Filter by dragon capsule serial #  |
| core_flight  | Filter by core flight number  |
| block  | Filter by core block number  |
| core_reuse  | Filter by core reusability  |
| side\_core1_reuse  | Filter by Falcon Heavy side core 1 reuse  |
| side\_core2_reuse | Filter by Falcon Heavy side core 2 reuse  |
| fairings_reuse | Filter by fairing reuse  |
| capsule_reuse  | Filter by dragon capsule reuse  |
| site_id | Filter by launch site id  |
| site_name  | Filter by launch site name  |
| site\_name_long  | Filter by long launch site name  |
| payload_id  | Filter by payload id  |
| customer | Filter by launch customer  |
| payload_type  | Filter by payload type  |
| orbit  | Filter by payload orbit  |
| launch_success  | Filter by successful launches  |
| reused  | Filter by launches with reused cores  |
| land_success  | Filter by sucessful core landings  |
| landing_type  | Filter by landing method  |
| landing_vehicle  | Filter by landing vehicle  |

# HTTP Response Codes
| Code  | Description |
| ------------- | ------------- |
| 200  | Returns all launches by default |
| 404  | Returns  `"error": "No results found"` |

# Return Values
| Field Name  | Data Type | Sample |
| ------------- | ------------- | ------------- |
| flight\_number  | Number | 28
| launch\_year  | String | "2018"
| launch\_date\_unix  | Number | 1522419231
| launch\_date\_utc  | ISO 8601 String | "2018-03-30T14:13:51Z"
| launch\_date\_local  | ISO 8601 String | "2018-03-30T07:13:51-08:00"
| rocket\_id  | String | "falcon9"
| rocket\_name  | String | "Falcon 9"
| rocket\_type  | String | "FT"
| core\_serial  | String | "B1041"
| flight  | Number | 2
| block  | Number | 4
| reused  | Boolean | true
| land\_success  | Boolean | true
| landing\_type  | String | "ASDS"
| landing\_vehicle  | String | "OCISLY"