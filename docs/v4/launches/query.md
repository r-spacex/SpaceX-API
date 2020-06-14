# Query launches

**Method** : `POST`

**URL** : `https://api.spacexdata.com/v4/launches/query`

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
      "fairings": {
        "reused": false,
        "recovery_attempt": true,
        "recovered": false,
        "ships": [
          "5ea6ed2e080df4000697c908"
        ]
      },
      "links": {
        "patch": {
          "small": "https://images2.imgbox.com/02/51/7NLaBm8c_o.png",
          "large": "https://images2.imgbox.com/69/f5/04lBXd2F_o.png"
        },
        "reddit": {
          "campaign": "https://www.reddit.com/r/spacex/comments/73ttkd/koreasat_5a_launch_campaign_thread/",
          "launch": "https://www.reddit.com/r/spacex/comments/79iuvb/rspacex_koreasat_5a_official_launch_discussion/",
          "media": "https://www.reddit.com/r/spacex/comments/79lmdu/rspacex_koreasat5a_media_thread_videos_images/",
          "recovery": null
        },
        "flickr": {
          "small": [],
          "original": [
            "https://farm5.staticflickr.com/4477/38056454431_a5f40f9fd7_o.jpg",
            "https://farm5.staticflickr.com/4455/26280153979_b8016a829f_o.jpg",
            "https://farm5.staticflickr.com/4459/38056455051_79ef2b949a_o.jpg",
            "https://farm5.staticflickr.com/4466/26280153539_ecbc2b3fa9_o.jpg",
            "https://farm5.staticflickr.com/4482/26280154209_bf08d76361_o.jpg",
            "https://farm5.staticflickr.com/4493/38056455211_a4565a9cee_o.jpg"
          ]
        },
        "presskit": "http://www.spacex.com/sites/spacex/files/koreasat5apresskit.pdf",
        "webcast": "https://www.youtube.com/watch?v=RUjH14vhLxA",
        "youtube_id": "RUjH14vhLxA",
        "article": "https://spaceflightnow.com/2017/10/30/spacex-launches-and-lands-third-rocket-in-three-weeks/",
        "wikipedia": "https://en.wikipedia.org/wiki/Koreasat_5A"
      },
      "static_fire_date_utc": "2017-10-26T16:00:00.000Z",
      "static_fire_date_unix": 1509033600,
      "tdb": false,
      "net": false,
      "window": 8640,
      "rocket": "5e9d0d95eda69973a809d1ec",
      "success": true,
      "failures": [],
      "details": "KoreaSat 5A is a Ku-band satellite capable of providing communication services from East Africa and Central Asia to southern India, Southeast Asia, the Philippines, Guam, Korea, and Japan. The satellite will be placed in GEO at 113Â° East Longitude, and will provide services ranging from broadband internet to broadcasting services and maritime communications.",
      "crew": [],
      "ships": [
        "5ea6ed2f080df4000697c90d",
        "5ea6ed2e080df4000697c908",
        "5ea6ed30080df4000697c913"
      ],
      "capsules": [],
      "payloads": [
        "5eb0e4c5b6c3bb0006eeb217"
      ],
      "launchpad": "5e9e4502f509094188566f88",
      "auto_update": true,
      "flight_number": 50,
      "name": "KoreaSat 5A",
      "date_utc": "2017-10-30T19:34:00.000Z",
      "date_unix": 1509392040,
      "date_local": "2017-10-30T15:34:00-04:00",
      "date_precision": "hour",
      "upcoming": false,
      "cores": [
        {
          "core": "5e9e28a4f359185cc03b2651",
          "flight": 1,
          "gridfins": true,
          "legs": true,
          "reused": false,
          "landing_attempt": true,
          "landing_success": true,
          "landing_type": "ASDS",
          "landpad": "5e9e3032383ecb6bb234e7ca"
        }
      ],
      "id": "5eb87d0dffd86e000604b35b"
    }
  ],
  "totalDocs": 109,
  "limit": 10,
  "totalPages": 11,
  "page": 5,
  "pagingCounter": 41,
  "hasPrevPage": true,
  "hasNextPage": true,
  "prevPage": 4,
  "nextPage": 6
}
```

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
