#!/bin/bash
sh /usr/share/nginx/replace_env_placeholders.sh
echo "Run nginx"
exec nginx -g "daemon off;"
