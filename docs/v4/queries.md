# Query examples

### Query between 2 dates

Dates need to be ISO 8601 friendly for these operators to work properly

```json
{
  "query": {
  "date_utc": {
   "$gte": "2017-06-22T00:00:00.000Z",
   "$lte": "2017-06-25T00:00:00.000Z"
  }
 }
}
```

### Full text search

Generally this will search all text indexes in a collection. All string fields get indexed

See the mongo [reference](https://docs.mongodb.com/manual/reference/operator/query/text/) for more details on additional operators.

```json
{
 "query": {
    "$text": {
      "$search": "crs"
    }
  }
}
```

Note: Full text search using `$text` will search all text index fields in a document, with no way to restrict to a specific field. The closest way to fuzzy match on an individual field is through the [$regex](https://docs.mongodb.com/manual/reference/operator/query/regex/) operator. 

```json
{
	"query": {
		"serial": {
			"$regex": "/^crs/i"
		}
	}
}
```

### Complex Query

```json
{
	"query": {
  "date_utc": {
			"$gte": "2017-06-22T00:00:00.000Z",
			"$lte": "2017-06-25T00:00:00.000Z"
		},
		"$or": [
			{
				"flight_number": {
					"$gt": 30
				}
			},
			{
				"tbd": true
			}
		],
		"date_precision": {
			"$in": ["month", "day"]
		}
	},
	"options": {
		"sort": {
			"flight_number": "asc"
		},
		"limit": 50
	}
}
```
