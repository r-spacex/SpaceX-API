# Company Info

# Info
Get company info
```http
GET https://api.spacexdata.com/v2/info
```

# History
Get company history / milestones
```http
GET https://api.spacexdata.com/v2/info/history
```

## Querystring Response Notes
* By default, the `/info/history` endpoint returns an array of JSON objects when queried
* If no match is found when using querystring filtering, an empty array is returned `[]` with a 200 response code

## History Query String Options
| Query Strings  | Description | Example |
| ------------- | ------------- | ------------- |
| order  | Change result ordering by setting values of `asc` or `desc` | `order=desc` |
| start & end  | Include both to sort by date range using any valid javascript date format | `start=2017-06-22&end=2017-06-25` |
| flight\_number  | Filter by flight number  | `flight_number=60` |