# The following is a shell script file (runs terminal code)
#   to run this script, in terminal run: bash run.sh
#! /bin/bash

# lean up stray files from previous run/job
rm -f host1/map_results/*.txt
rm -f host2/map_results/*.txt
rm -f map_results/*.txt
rm -f reduce_results/results.txt

# run the map step on both hosts in parallel
HOST=host1 node map.js &
HOST=host2 node map.js &

# wait for them to both be done
wait

# Run the shuffle step
HOSTS=host1,hsot2 node shuffle.js

# Run the reduce step
node reduce.js

# View the final result of the MapReduce job
cat reduce_results/results.txt