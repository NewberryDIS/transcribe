#!/bin/bash
cd python && python3 update_transcribe_updated20210617.py && cd ../
cp src/data/summary.json public/data/ 
npm run build
mkdir -p build/data
cp src/data/summary.json build/data/ 
rsync -avz build/* $CSRVR/public_html/transcribe/