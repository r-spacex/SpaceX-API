# Query Starlink satellites

**Method** : `POST`

**URL** : `https://api.spacexdata.com/v4/starlink/query`

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
        "spaceTrack": {
          "CCSDS_OMM_VERS": "2.0",
          "COMMENT": "GENERATED VIA SPACE-TRACK.ORG API",
          "CREATION_DATE": "2020-06-19 21:36:08",
          "ORIGINATOR": "18 SPCS",
          "OBJECT_NAME": "STARLINK-30",
          "OBJECT_ID": "2019-029K",
          "CENTER_NAME": "EARTH",
          "REF_FRAME": "TEME",
          "TIME_SYSTEM": "UTC",
          "MEAN_ELEMENT_THEORY": "SGP4",
          "EPOCH": "2020-06-19 20:00:01.000224",
          "MEAN_MOTION": 15.43862877,
          "ECCENTRICITY": 0.000125,
          "INCLINATION": 52.996,
          "RA_OF_ASC_NODE": 195.8544,
          "ARG_OF_PERICENTER": 108.6906,
          "MEAN_ANOMALY": 109.3199,
          "EPHEMERIS_TYPE": 0,
          "CLASSIFICATION_TYPE": "U",
          "NORAD_CAT_ID": 44244,
          "ELEMENT_SET_NO": 999,
          "REV_AT_EPOCH": 5947,
          "BSTAR": 0.00007,
          "MEAN_MOTION_DOT": 0.00002829,
          "MEAN_MOTION_DDOT": 0,
          "SEMIMAJOR_AXIS": 6812.858,
          "PERIOD": 93.272,
          "APOAPSIS": 435.574,
          "PERIAPSIS": 433.871,
          "OBJECT_TYPE": "PAYLOAD",
          "RCS_SIZE": "LARGE",
          "COUNTRY_CODE": "US",
          "LAUNCH_DATE": "2019-05-24",
          "SITE": "AFETR",
          "DECAY_DATE": null,
          "DECAYED": 0,
          "FILE": 2768931,
          "GP_ID": 155985469,
          "TLE_LINE0": "0 STARLINK-30",
          "TLE_LINE1": "1 44244U 19029K   20171.83334491  .00002829  00000-0  70479-4 0  9997",
          "TLE_LINE2": "2 44244  52.9964 195.8544 0001250 108.6906 109.3199 15.43862877 59477"
        },
        "version": "v0.9",
        "launch": "5eb87d30ffd86e000604b378",
        "id": "5eed770f096e59000698560d"
      },
      ...
    ],
    "totalDocs": 537,
    "offset": 0,
    "limit": 10,
    "totalPages": 54,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": true,
    "prevPage": null,
    "nextPage": 2
}
```

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
