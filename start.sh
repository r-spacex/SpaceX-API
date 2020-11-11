#!/usr/bin/env sh

if [ "$SPACEX_WORKER" = "true" ]; then
  node ./jobs/worker.js
else
  node ./server.js
fi
