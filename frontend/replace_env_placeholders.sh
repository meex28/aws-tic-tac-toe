#!/bin/bash

ESCAPED_VITE_BACKEND_API_URL=$(printf '%s\n' "$VITE_BACKEND_API_URL" | sed -e 's/[\/&]/\\&/g')
ESCAPED_VITE_BACKEND_WS_URL=$(printf '%s\n' "$VITE_BACKEND_WS_URL" | sed -e 's/[\/&]/\\&/g')

for file in /usr/share/nginx/html/assets/*.js; do
  sed -i'' -e "s/__VITE_AWS_REGION__/$VITE_AWS_REGION/g" \
             -e "s/__VITE_COGNITO_CLIENT_ID__/$VITE_COGNITO_CLIENT_ID/g" \
             -e "s/__VITE_COGNITO_USER_POOL_ID__/$VITE_COGNITO_USER_POOL_ID/g" \
             -e "s/__VITE_BACKEND_API_URL__/$ESCAPED_VITE_BACKEND_API_URL/g" \
             -e "s/__VITE_BACKEND_WS_URL__/$ESCAPED_VITE_BACKEND_WS_URL/g" \
             "$file"
done

echo "Inject environmental variables into static files!"
