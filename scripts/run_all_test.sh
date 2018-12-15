#! /bin/bash
set -e
./scripts/run_test.sh head.js ./app_test_data/input ./app_test_data/output 
mocha --reporter min
