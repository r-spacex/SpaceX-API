# Create a history event

**Method** : `POST`

**URL** : `https://api.spacexdata.com/v4/history`

**Auth required** : `True`

**Body** :

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

## Success Response

**Code** : `201 Created`

**Content example** : `Created`

## Error Responses

**Code** : `400 Bad Request`

**Content** : Mongoose error is shown, with suggestions to fix the query.
