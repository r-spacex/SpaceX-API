#!/usr/bin/env bash
set -xe

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
  echo -e "Skipping publish; just doing a build.\n"
  exit 0
fi

if [$TRAVIS_BRANCH == 'master']; then
    # Import the SSH deployment key
    openssl aes-256-cbc -K $encrypted_32b6c04b6d48_key -iv $encrypted_32b6c04b6d48_iv -in deploy-key.enc -out ~/deploy-key -d
    chmod 600 ~/deploy-key
    eval "$(ssh-agent -s)"
    ssh-add ~/deploy-key 

    # SSH, pull, reinstall deps, and restart pm2 process
    ssh -t -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "bash --login -c 'cd /var/www/spacexdata.com/SpaceX-API && git checkout master && git pull --force && yarn --production && pm2 reload spacex-api'"
else
    echo "Not sending, since this branch isn't master."
fi