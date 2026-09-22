#!/bin/bash
set -e

PORT="${PORT:-80}"

if [ -f /etc/apache2/ports.conf ]; then
  if grep -q "Listen 80" /etc/apache2/ports.conf; then
    sed -i "s/^Listen .*$/Listen ${PORT}/" /etc/apache2/ports.conf
  else
    echo "Listen ${PORT}" >> /etc/apache2/ports.conf
  fi
fi

if [ -f /etc/apache2/sites-available/000-default.conf ]; then
  sed -i "s/:80\b/:${PORT}/g" /etc/apache2/sites-available/000-default.conf
fi

exec apache2-foreground
