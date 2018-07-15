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
| Query Strings  | Description |
| ------------- | ------------- |
| start & end  | Filter by a date range |
| flight\_number  | Filter history events by flight number |
| order  | Change result ordering by `asc` or `desc` |