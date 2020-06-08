#!/bin/bash
i="0"
while [ $i -lt 115 ]
do
filename=$[$i*50].json
touch $filename
i=$[$i+1]
done