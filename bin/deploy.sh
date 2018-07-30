#!/usr/bin/env bash

# Import the SSH deployment key
openssl aes-256-cbc -K $encrypted_32b6c04b6d48_key -iv $encrypted_32b6c04b6d48_iv -in deploy-key.enc -out ~/.ssh/deploy-key -d
eval "$(ssh-agent -s)" # Start ssh-agent cache
ssh-add .travis/deploy-key # Add the private key to SSH

ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "cd SpaceX-API && git checkout master && git pull && yarn --production && pm2 reload spacex-api"