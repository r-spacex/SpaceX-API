### Without Docker

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