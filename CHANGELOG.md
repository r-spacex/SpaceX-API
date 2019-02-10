## Version 3.1.0
**Features**
* Added new `timeline` field to launches with presskit timeline events offset according to webcast launch time
* Added `gridfins` and `legs` boolean in launch cores section
* Added `youtube_id` field to all launches for easier url building
* Added `/cores/upcoming` and `/cores/past` to show cores that have or have not launched - b0184f1
* Added `/capsules/upcoming` and `/capsules/past` to show caps that have or have not launched - b0184f1
* Added `/landpad` endpoint - 0253c0e

**Fixes**
* Fixed bug in orbit update script causing high API usage - dc48e07
* Fixed parsing bug in upcoming launch script for `TDB` launches - 51a6f28
* Fixed parsing bug in upcoming launch script for launches with `mid`, `early`, and `late` launch dates - 
a13aace
* Fixed order of appearanch for `/dragons` endpoint - 
fe40a55
* Fixed broken Reddit links in upcoming launch script - d8b484e

**Scripts**
* Added webcast script to auto update webcast link/youtube_id as soon as it is posted - b37df98
* Added launchpad updater script for attempt/success counts - 7a34812
* Added landing pad updater script for attempt/success counts - 1ff486a
* Added missions updating to ships script - 566e9ad
* Added cores update script + scrape subreddit wiki for updates - 1fb50f7
* Added capsule update script - 82f5e10
* Added fairing catch attempt/success counts to ships script - 1cfa2b1

**Misc**
* Migrated from Travis CI to Circle CI

## Version 3.0.0
**Features**
* Added ability to sort on any field where an endpoint returns an array - #129
* Added array of links to official SpaceX flickr photos for rockets, dragon capsules, launches, and the tesla roadster
* Added `tentative_max_precision` field for more information about partial dates in upcoming launches. Values can include hour, day, month, quarter, half, or year. This provides important context about how precise the future date is
* Added link to api status page - 42aec55
* Added reusable date parsing utility - 0d8ebc0
* Added ability to pretty print json results with the `pretty=true` querystring - d8c51e6
* Added ability to mask and filter specific json fields from the response to reduce JSON payload size - 9558453 - ( thanks **@jhpratt** )
* Added script to update payload orbit params on an hourly basis - 03777f4
* Added missions endpoint with additional data regarding groups of 2 or more launches by the same company
* Added `arg_of_pericenter` and `mean_anomaly` to current orbital params for full Keplerian element support
* Added automated update script to pull updated launch times from the [r/SpaceX wiki manifest](https://www.reddit.com/r/spacex/wiki/launches/manifest) every 10 min
* Added automated script to pull current orbital data from the [SpaceTrack API](https://www.space-track.org) every hour
* Added automated script to pull current lat/long, status, course, and speed of SpaceX support ships from [MarineTraffic.com](https://www.marinetraffic.com/) every 10 min
* Updated docker compose to use alpine redis to reduce image size - 3e70fd1
* Updated production logger to strip private info from response object - d9b47c1
* Switched from day.js to moment.js in update scripts for improved UTC support - bf596e5

**Fixes**
* Fixed bug where duplicates might show up in payload endpoint - 5e608d5
* Fixed bug where v3 rocket id was removed - 82c2568
* Fixed bug where roadster epoch was displayed as a string instead of an int - 884c713

**Docs Changes**
* Now using [Postman](https://www.getpostman.com/) for [docs](https://documenter.getpostman.com/view/2025350/RWaEzAiG)
* A Postman collection with all the new endpoints is available [here](https://app.getpostman.com/run-collection/3aeac01a548a87943749)
* Added link to community made apps/bots/clients [here](https://github.com/r-spacex/SpaceX-API/blob/master/clients.md)

**Endpoint Changes**
* `/v2/launches/all` ----> `/v3/launches`
* `/v2/launches` ----> `/v3/launches/past`
* `/v2/info/history` ----> `/v3/history`
* `/v2/info/roadster` ----> `/v3/roadster`
* `/v2/parts/cores` ----> `/v3/cores`
* `/v2/parts/caps` ----> `/v3/capsules`
* `/v2/capsules` ----> `/v3/dragons`

**Database Changes**
* Added `flickr_images`, `landing_intent`, `arg_of_pericenter`, `mean_anomaly`, `fairings`, `ships`, `static_fire_date_unix`, `is_tentative`, and `tentative_max_precision` to launches
* Added `reuse_count` to capsules
* Added `reuse_count` to cores
* Added Ships collection
* Added Missions collection
* Updated `rtls_attempts` and `asds_attempts` in cores to be an int instead of boolean
* In rockets, `id` is now `rocket_id`, `rocketid` is now `id`, and `type` is now `rocket_type` to bring the fields in line with the launch fields
* In launchpads, `id` is now `site_id`, `padid` is now `id`, and `full_name` is now `site_name_long` to bring the fields in line with the launch fields
* The `reuse` object is no longer included on v3 launches. Reuse information has been moved into each core, payload, and fairing object
* `capsules`, `cores`, and `ships` endpoints now have a new array format for the missions array. The new format provides more context, and allows the flight number to be passed in easily as a query param to quickly get launch data: `/launches/18`
    * Old:
        ```json
        "missions": [
            "CRS-4"
       ]
        ```
    * New:
        ```json
        "missions": [
              {
                "name": "CRS-4",
                "flight": 18
              }
        ]
        ```

## Version 2.8.0
**TLDR**
* Migrated from  east U.S. Heroku to  central U.S. Linode
* New orbital, distance, and speed data on FH roadster
* More background details added to Dragon 1/2
* Faster logging
* Docs moved from wiki to repo

**Features & Fixes**

* Changed `koa-logger` to `koa-pino-logger` for a **~20%** reduction in high volume response latency
* Fixed query builders where entire Koa request object was being passed to builders instead of just the object containing querystrings
* Fixed bug showing incorrect order for all launches when sorting in descending order #107
* Fixed bug preventing users from using the `flight_number` correctly with the all launches endpoint #109
* Fixed bug in invalid date tests where the dates tested weren't actually invalid
* Fixed bug that allowed caching in dev environments by default
* Added new mongo connection param to remove URL parser deprecation warnings
* Added new endpoint to house Falcon Heavy Roadster data `/info/roadster`
* Added script to update roadster orbital data every 10 min
* Added new PowerShell wrapper link to readme
* Moved docs from wiki to docs folder for portability & versioning

**Server Changes**
* The API has migrated to a central U.S. [Linode](https://www.linode.com/) server instead of the north Virginia  [Heroku](https://www.heroku.com/) server, now latency should be balanced from coast to coast.
* The same development pipeline will be used, and successful [Travis CI](https://travis-ci.org/) builds on master will automatically deploy changes and restart [PM2](http://pm2.keymetrics.io/)

**Database Changes**
* Added new info on the Falcon Heavy Tesla Roadster's orbital parameters, speed, and distance from earth/mars
* Combined `Dragon 2` and `Crew Dragon` into a single `Dragon 2` object
* Added `original_launch_unix` fields for all cores and capsules
* Added `rocketid` to rockets with an arbitrary number id, see #1 for discussion
* Added `padid` to launchpads with an arbitrary number id, see #1 for discussion
* Added `description` and `wikipedia` to capsules for Dragon 1 + 2
* Added `norad_id` to all launch payloads if available
* Added `nationality` to all launch payloads
* Added `manufacturer` to all launch payloads

## Version 2.7.0
**Features & Fixes**
* Mission patch PNG size reduced 70-80% using compression (thanks @garyjacobs)
* Added detailed orbital parameters for every payload
* Fixed typo preventing cores from being sorted by number of ASDS launches
* Added list of community made API clients to the readme
* Added `second_stage_block` querystring to allow launch sorting by second stage block number
* Fixed typo preventing travis ci from running tests sequentially, causing long build times
* Readme header updated to only use HTML instead of an HTML/Markdown mix that caused issues on certain viewing platforms
* Added gitlab mirrored repository as a backup
* Added `limit` querystring to limit number of documents returned
* Consolidated past, upcoming, and all launch tests into a single test (DRY)
* Increased jest timeout length from 5sec to 10sec for longer running tests

**Database Changes**
* Added `orbit_params` object to every payload of every past and upcoming launch
* Added `block` number to all second stage objects for hybrid launches
* Added `event_date_unix` to all history milestones for easier date parsing

## Version 2.6.0
**Features & Fixes**
* Added yarn caching for faster Travis builds
* Updated mongo connection syntax to use `async / await`
* Added endpoint for next upcoming launch (thanks @pascoemitch)
* Increased mongo driver connection pool size to prevent traffic surge bottlenecks
* Decreased caching time for launches to 30sec to reduce database query load
* All rocket data now sorted by original launch data instead of rocket id
* Added `/v2/info/history` endpoint with important company milestones
* Added tentative BFR data to rocket endpoints

**Database Changes**
* Added `mission_name` field for easier access to common mission names
* Added `wikipedia` field in `links` for easy access to Wikipedia summaries on launches
* History collection added
* BFR added to list of rockets

## Version 2.5.0
**Features & Fixes**
* Redis route caching times adjusted for quicker launch updates
* Added date format parsing in #80 to allow for any standardized date formats in query strings
* Tests now lint first, allowing for earlier syntax error checks
* Added sorting to rocket endpoints for consistent ordering
* Switched from NPM to Yarn for faster dependency management
* Removed jest cli option blocking multi worker testing pools
* Moved query logic out of routes and into controllers
* Made all query builders anonymous functions by default

**Database Changes**
* Added `mission_patch_small` filed with links to smaller image versions

## Version 2.4.0
**Features & Fixes**
* Migration from Express to Koa in #78
* Reduced Docker image size by **~30%** to **19MB**
* Added Redis route caching, reduced average response time from **>250ms** to **<90ms**
* Added Docker-Compose file for easy App + Redis deployment
* Updated all tests to use async/await
* Cap and Core sorting changed to launch date instead of serial in 89ac881
* Reduced npm dependencies by **~10%**

## Version 2.3.0
**Features & Fixes**
* Tests added for query builders in b0b0ad3, f09b3b1, 21c8425 which brings test coverage to 98%
* Abstraction added for fetching upcoming/past launches from a single function e75731e. (Rafael Ramalho)
* Added querystring option to show unique mongo document id's 93610a5
* Added querystring option to filter launches and cores by block number ddd24c7
* Added querystring option to pretty print JSON output for debugging 188cf22
* Added jsdoc for builders and helper functions 3a5d25d

## Version 2.2.0
**Features & Fixes**
* Added current flight number to launch core data
* Dragon data is now on its own endpoint `/v2/capsules`
* Vehicle endpoint is now Rocket endpoint `/v2/rockets` instead of `/v2/vehicles`
* All rocket data has identical schema for easy comparisons
* Added ordering support for past and upcoming launches in #65
* Updated style guide to Airbnb standards
* Removed needless variable assignments in 4bbe8115482f44dc5601134b15eb265506af5e92
* Some refactoring for mongo driver version 3 breaking changes
    - database url updated to new mongo standard
    - moved projection (used to hide document id from results) out of the find method
* Removed unnecessary files like app.json and single line config file

## Version 2.1.0
**Features & Fixes**
* V2 endpoints with improved filtering and schema added in #61
* Improved error handling and status code expectations in #51
* V1 endpoints are now deprecated, and V2 schema was forked from the old DB
* Data validation and custom assertions added in #55 & #58 for better DB consistency and earlier mistake catching thanks to @Srokap
* Removed double caching bug in #49
* Added `site_name_long` to all past and future launches in #60

## Version 2.0.2
**Features & Fixes**
* FlightClub.io links are now dynamic in d08fb4ed6a7225e487660daf08855d614f698476 from #43
* Content type header now shows ```application/json``` in 2a829eb43038fa005833d1c7b096bc36c350d50d from #44
* 30 minute server DB query caching added in 2f2b819dd7ea03d93a06b61bcbad315fc73cdf46
* Various data typo corrections from #45
* Added CRS data for mass returned, flight time, and cargo manifests from #46
* Added detailed reuse stats from #47
* Added endpoints to sort past launches by ASDS or RTLS landings

## Version 2.0.1
**Features & Fixes**
* Endpoint and no results errors now return JSON in lieu of strings
* 404 page removed for faster JSON error responses
* Added endpoint for sorting past launches by launchpad
* Set global content type to application/json for proper headers
* Added more ESlint rules for cleaner javascript

## Version 2.0.0
**Features & Fixes**
* 1:1 platform switch from Sinatra (Ruby) to Express (Node.js) in #42
* Added Codecov for test coverage monitoring & static code checking
* Test coverage is now 100% 👍
* Added a "Deploy to Heroku" button as an easy deployment option
* Various typo fixes and formatting errors

## Version 1.2.1
**Features & Fixes**
* Downgraded Puma version to 3.4 to fix issue that prevented docker from starting 1433a57d4a4c416925738b51220df419bf8b049e
* CORS (Cross Origin Resource Sharing) support added in 8d067ca0ef0266224a9eede212eb068ce9d03af6
* Read-Only database credentials are now hard coded to alleviate an issues with testing going forward.
* Various Rubocop fixes throughout
* Travis CI now used container based builds for faster build startup times
* API version support added in 82b2d00af704bf2ed4b148d48bdfd2be7094425f

## Version 1.2.0
**Features & Fixes**
* Falcon 1 data added in fe195477fb07139c23ab567c36d247267874c4cb
* Endpoints refactored for efficiency + better rest standards
* Switched to Puma web server for multiprocess/multithreaded support
* Switched from MySQL to MongoDB for increased data flexibility
* Added sorting filters to mongo queries for readability 535c72d25787bdc81987ffef62ca3afb030ab0cf
* All single object returns now appear without an array 6a892054bb32a4e642f699ccd4117df9b0afce2e & ea8049e5113ea56e776abf5572b3433b1a86a7ea
* Consolidated error messages ea8049e5113ea56e776abf5572b3433b1a86a7ea
* Added latest launches endpoint 598145bef8a52fde06d83df3af874bbca2a58268
* Launches now have links to reddit campaign, launch, recovery, and media threads, as well as official presskit PDF's put out by SpaceX

## Version 1.1.0
**Features & Fixes**
* UTC and Local dates/time are now expressed in ISO 8601 format
* API now has unit tests for Travis CI testing & integration
* Unit tests now have proper subdomain support
* Now using the modular version of Sinatra instead of classic
* Past and Upcoming launches are now in separate tables
* Fixed bug where dates weren't sorting correctly
* Added ability to view all vehicles on a single page
* API now uses routes in line with REST best practices
* Launch site in database is now consistent with launchpads.rb syntax
* Coordinates for launchpads have been corrected
* Various data fixes and corrections

## Version 1.0.4
**Features Added**
* All numerical and boolean data are now given in a primitive form, not as strings

## Version 1.0.3
**Features Added**
* Officially migrated from MySQL to MariaDB to keep with the open source theme
* Mission Patch image links are live
* Added endpoint for upcoming launches

## Version 1.0.2
**Features Added**
* Added data details about booster cores
* Added data details about Dragon capsules
* Added functionality to search launches by capsule and core serial numbers
* Added functionality to search capsule and core details by serial numbers
* Added local time field to launch data (in progress)
* Revised API routes to match up with REST best practices for queries

**Bugfixes**
* Removed strange characters from descriptions for each launch
* Changed array of objects to array of strings in sites.rb

## Version 1.0.1
* API is now live!
* HTTPS has been re-enabled for secure API goodness
* Searching by date is now enabled
* Searching a range of dates is enabled too

## Version 1.0.0
* spacexdata.com is the new domain name
* api endpoints will be api.spacexdata.com
* all static data is fully functional, still working on launch data

## Version 0.0.1
Pre-Release of the SpaceX API

* Still deciding on an appropriate domain name for the endpoints
* Deciding on the proper database for fetching the data
* Base web framework is laid out, but needs data