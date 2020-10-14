#!/bin/bash
source ../variables.sh
cd python
python3 get_summary.py
cd ../
npm run build
scp -r build/* $SERVER/newtranscribe/