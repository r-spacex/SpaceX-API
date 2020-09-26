# Get one history event

**Method** : `GET`

**URL** : `https://api.spacexdata.com/v4/history/:id`

**URL Parameters** : `id=[string]` where `id` is the ID of the history event

**Auth required** : `False`

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "title": "SpaceX successfully launches humans to ISS",
    "event_date_utc": "2020-05-30T19:22:00Z",
    "event_date_unix": 1590866520,
    "details": "This mission was the first crewed flight to launch from the United States since the end of the Space Shuttle program in 2011. It carried NASA astronauts Doug Hurley and Bob Behnken to the ISS.",
    "links": {
        "article": "https://spaceflightnow.com/2020/05/30/nasa-astronauts-launch-from-us-soil-for-first-time-in-nine-years/"
    }
}
```

## Error Responses

**Code** : `404 NOT FOUND`

**Content** : `Not Found`
