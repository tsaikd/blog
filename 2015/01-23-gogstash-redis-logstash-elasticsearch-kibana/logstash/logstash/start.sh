#!/bin/bash

logstash -f index-mongodb.conf &
logstash -f index-mongodb-status.conf &
logstash -f index-mongodb-sys.conf &
logstash -f index-mongodb-df.conf &

