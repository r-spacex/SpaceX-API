### Without Docker

[Home](https://github.com/r-spacex/SpaceX-API/blob/master/docs/home.md) | [Launches](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches.md) | [Rockets](https://github.com/r-spacex/SpaceX-API/blob/master/docs/rocket.md) | [Capsules](https://github.com/r-spacex/SpaceX-API/blob/master/docs/capsule.md) | [Company Info](https://github.com/r-spacex/SpaceX-API/blob/master/docs/company_info.md) | [Roadster Info](https://github.com/r-spacex/SpaceX-API/blob/master/docs/roadster.md) | [Capsule Details](https://github.com/r-spacex/SpaceX-API/blob/master/docs/capsule_detail.md) | [Core Detail](https://github.com/r-spacex/SpaceX-API/blob/master/docs/core_detail.md) | [Launchpads](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launchpad.md)

1. Clone the repo
```bash
git clone https://github.com/r-spacex/SpaceX-API.git && cd SpaceX-API
```

2. Install dependencies
```bash
yarn install
```

3. Run ESlint and all tests
```bash
yarn test
```

4. Start the app
```bash
yarn start
```

### With Docker

* Make sure Docker is installed & running
```bash
git clone https://github.com/r-spacex/SpaceX-API.git && cd SpaceX-API
```
```docker
docker-compose build
```
```docker
docker-compose up
```