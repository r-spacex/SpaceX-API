#!/usr/bin/env bash

# Import the SSH deployment key
openssl aes-256-cbc -K $encrypted_32b6c04b6d48_key -iv $encrypted_32b6c04b6d48_iv -in deploy-key.enc -out ~/.ssh/deploy-key -d
rm deploy-key.enc
chmod 600 deploy-key
mv deploy-key ~/.ssh/id_rsa

ssh $SERVER_USER@$SERVER_IP "rm -rf SpaceX-API && git clone https://github.com/r-spacex/SpaceX-API.git && cd SpaceX-API && yarn --production && pm2 reload spacex-api"