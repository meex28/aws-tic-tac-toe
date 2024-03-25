#!/bin/bash
private_key_path=$1
instance_address=$2
ssh -i "$private_key_path" "$instance_address" "mkdir tic-tac-toe"
scp -i "$private_key_path" ./docker-compose.yml "$instance_address":/home/ec2-user/tic-tac-toe
ssh -i "$private_key_path" "$instance_address" "docker-compose -f /home/ec2-user/tic-tac-toe/docker-compose.yml up -d"
