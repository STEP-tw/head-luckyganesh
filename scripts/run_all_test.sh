#! /bin/bash
./scripts/run_test.sh head.js ./app_test_data/input ./app_test_data/output 
mocha --reporter min
