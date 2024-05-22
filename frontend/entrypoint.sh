#!/bin/bash
sh /usr/share/nginx/replace_env_placeholders.sh
exec nginx -g "daemon off;"
