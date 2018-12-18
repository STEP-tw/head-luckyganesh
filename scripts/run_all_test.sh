#! /bin/bash
set -e
echo "------- head tests are running -------"
./scripts/run_test.sh head.js ./app_test_data/headInput ./app_test_data/headOutput 
echo "------- head tests are passed -------"
echo "------- tail tests are running -------"
./scripts/run_test.sh tail.js ./app_test_data/tailInput ./app_test_data/tailOutput 
echo "------- tail tests are passed -------"
mocha --reporter min
if [ $? -eq 0 ];then
    echo "------ all tests passed -------"
    fi