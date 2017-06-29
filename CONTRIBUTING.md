## Contribution Steps (New Contributors)

1. Fork the repo, make changes, commit, and submit a Pull Request

2. New Pull Requests will automatically trigger a Travis CI Build

3. If the build fails, look at the [Build Logs](https://travis-ci.org/r-spacex/SpaceX-API).
Changes will not be merged unless the build passes.

4. If the build succeeds, the pull request will be merged, and automatically
pushed to the staging server at [http://api.spacexdev.com](http://api.spacexdev.com) for a
final check before promoting changes to production at [https://api.spacexdata.com](https://api.spacexdata.com).

## Contribution Steps (Org Members)

1. Make changes, create a commit, and push to master

2. New pushes will trigger a Travis CI build automatically

3. If the build fails, look at the [Build Logs](https://travis-ci.org/r-spacex/SpaceX-API).
Heroku will not accept a failing build onto the staging server.

4. If the build succeeds, Heroku will automatically deploy to
the staging server at [http://api.spacexdev.com](http://api.spacexdev.com)

5. After a final check, the changes can be promoted to the Heroku production server at [https://api.spacexdata.com](https://api.spacexdata.com)
