#!/bin/bash
set -x

eval "$(ssh-agent -s)"
chmod 600 ./deploy_key
echo -e "Host $SERVER_IP_ADDRESS\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
ssh-add ./deploy_key
ssh -i ./deploy_key root@$SERVER_IP_ADDRESS <<EOF
    cd antfarm
    git pull
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
EOF