# Get one Starlink satellite

**Method** : `GET`

**URL** : `https://api.spacexdata.com/v4/starlink/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the Starlink sat

**Auth required** : `False`

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
  "spaceTrack": {
      "CCSDS_OMM_VERS": "2.0",
      "COMMENT": "GENERATED VIA SPACE-TRACK.ORG API",
      "CREATION_DATE": "2020-06-19 21:46:09",
      "ORIGINATOR": "18 SPCS",
      "OBJECT_NAME": "STARLINK-1506",
      "OBJECT_ID": "2020-038T",
      "CENTER_NAME": "EARTH",
      "REF_FRAME": "TEME",
      "TIME_SYSTEM": "UTC",
      "MEAN_ELEMENT_THEORY": "SGP4",
      "EPOCH": "2020-06-19 20:00:01.000224",
      "MEAN_MOTION": 15.88829743,
      "ECCENTRICITY": 0.0087515,
      "INCLINATION": 53.002,
      "RA_OF_ASC_NODE": 266.3302,
      "ARG_OF_PERICENTER": 69.9474,
      "MEAN_ANOMALY": 221.4733,
      "EPHEMERIS_TYPE": 0,
      "CLASSIFICATION_TYPE": "U",
      "NORAD_CAT_ID": 45747,
      "ELEMENT_SET_NO": 999,
      "REV_AT_EPOCH": 212,
      "BSTAR": 0.01007,
      "MEAN_MOTION_DOT": 0.03503094,
      "MEAN_MOTION_DDOT": 0.01265,
      "SEMIMAJOR_AXIS": 6683.699,
      "PERIOD": 90.632,
      "APOAPSIS": 364.057,
      "PERIAPSIS": 247.072,
      "OBJECT_TYPE": "PAYLOAD",
      "RCS_SIZE": null,
      "COUNTRY_CODE": "US",
      "LAUNCH_DATE": "2020-06-13",
      "SITE": "AFETR",
      "DECAY_DATE": null,
      "DECAYED": 0,
      "FILE": 2768947,
      "GP_ID": 155985688,
      "TLE_LINE0": "0 STARLINK-1506",
      "TLE_LINE1": "1 45747U 20038T   20171.83334491  .03503094  12654-1  10068-1 0  9995",
      "TLE_LINE2": "2 45747  53.0017 266.3302 0087515  69.9474 221.4733 15.88829743  2124"
  },
  "version": "v1.0",
  "launch": "5eb87d46ffd86e000604b389",
  "id": "5eed7716096e590006985825"
}
```

## Error Responses

**Code** : `404 NOT FOUND`

**Content** : `Not Found`
