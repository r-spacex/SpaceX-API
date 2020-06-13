# Query rockets

**Method** : `POST`

**URL** : `https://api.spacexdata.com/v4/rockets/query`

**Auth required** : `False`

**Body** :

See [query](../queries) guide for more details on building queries and paginating results.

```json
{
  "query": {},
  "options": {}
}
```

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
  "docs": [
    {
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
      "first_stage": {
        "thrust_sea_level": {
          "kN": 7607,
          "lbf": 1710000
        },
        "thrust_vacuum": {
          "kN": 8227,
          "lbf": 1849500
        },
        "reusable": true,
        "engines": 9,
        "fuel_amount_tons": 385,
        "burn_time_sec": 162
      },
      "second_stage": {
        "thrust": {
          "kN": 934,
          "lbf": 210000
        },
        "payloads": {
          "composite_fairing": {
            "height": {
              "meters": 13.1,
              "feet": 43
            },
            "diameter": {
              "meters": 5.2,
              "feet": 17.1
            }
          },
          "option_1": "dragon"
        },
        "reusable": false,
        "engines": 1,
        "fuel_amount_tons": 90,
        "burn_time_sec": 397
      },
      "engines": {
        "isp": {
          "sea_level": 288,
          "vacuum": 312
        },
        "thrust_sea_level": {
          "kN": 845,
          "lbf": 190000
        },
        "thrust_vacuum": {
          "kN": 914,
          "lbf": 205500
        },
        "number": 9,
        "type": "merlin",
        "version": "1D+",
        "layout": "octaweb",
        "engine_loss_max": 2,
        "propellant_1": "liquid oxygen",
        "propellant_2": "RP-1 kerosene",
        "thrust_to_weight": 180.1
      },
      "landing_legs": {
        "number": 4,
        "material": "carbon fiber"
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
      "flickr_images": [
        "https://farm1.staticflickr.com/929/28787338307_3453a11a77_b.jpg",
        "https://farm4.staticflickr.com/3955/32915197674_eee74d81bb_b.jpg",
        "https://farm1.staticflickr.com/293/32312415025_6841e30bf1_b.jpg",
        "https://farm1.staticflickr.com/623/23660653516_5b6cb301d1_b.jpg",
        "https://farm6.staticflickr.com/5518/31579784413_d853331601_b.jpg",
        "https://farm1.staticflickr.com/745/32394687645_a9c54a34ef_b.jpg"
      ],
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
      "wikipedia": "https://en.wikipedia.org/wiki/Falcon_9",
      "description": "Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.",
      "id": "5e9d0d95eda69973a809d1ec"
    },
    ...
  ],
  "totalDocs": 4,
  "offset": 0,
  "limit": 10,
  "totalPages": 1,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevPage": null,
  "nextPage": null
}
```

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
