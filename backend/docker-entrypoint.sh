#!/bin/sh
set -eu

if [ -n "${DB_URL:-}" ] && [ -z "${SPRING_DATASOURCE_URL:-}" ]; then
  case "$DB_URL" in
    jdbc:postgresql://*)
      export SPRING_DATASOURCE_URL="$DB_URL"
      ;;
    postgresql://*)
      export SPRING_DATASOURCE_URL="jdbc:$DB_URL"
      ;;
  esac
fi

if [ -n "${PYTHON_AI_URL:-}" ] && [ -z "${APP_PYTHON_AI_BASE_URL:-}" ]; then
  case "$PYTHON_AI_URL" in
    http://*|https://*)
      export APP_PYTHON_AI_BASE_URL="$PYTHON_AI_URL"
      ;;
    *)
      export APP_PYTHON_AI_BASE_URL="http://$PYTHON_AI_URL"
      ;;
  esac
fi

exec java -jar /app/app.jar
