#!/bin/bash

redis-server /redis/redis.conf &
redis-sentinel /redis/sentinel.conf &

