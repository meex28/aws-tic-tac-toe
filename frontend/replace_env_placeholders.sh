#!/bin/bash

for file in /usr/share/nginx/html/assets/*.js; do
  sed -i'' -e "s/__VITE_AWS_REGION__/$VITE_AWS_REGION/g" \
             -e "s/__VITE_COGNITO_CLIENT_ID__/$VITE_COGNITO_CLIENT_ID/g" \
             -e "s/__VITE_COGNITO_USER_POOL_ID__/$VITE_COGNITO_USER_POOL_ID/g" \
             "$file"
done

echo "Inject environmental variables into static files!"
