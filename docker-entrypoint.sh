#!/bin/sh
set -e

: "${PORT:=80}"

# Render nginx config with the runtime PORT (no extra packages)
sed "s/\${PORT}/${PORT}/g" /etc/nginx/conf.d/default.template.conf > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
