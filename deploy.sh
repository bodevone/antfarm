#!/bin/bash
set -x

eval "$(ssh-agent -s)"
chmod 600 ./deploy_rsa
echo -e "Host $SERVER_IP_ADDRESS\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
ssh-add ./deploy_rsa
ssh -i ./deploy_rsa root@$SERVER_IP_ADDRESS <<EOF
    cd antfarm
    git pull
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
EOF