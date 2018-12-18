#! /bin/bash
set -e
./scripts/run_test.sh head.js ./app_test_data/headInput ./app_test_data/headOutput 
./scripts/run_test.sh tail.js ./app_test_data/tailInput ./app_test_data/tailOutput 
mocha --reporter min
