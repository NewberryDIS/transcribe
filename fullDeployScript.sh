#!/bin/bash
cd python && python3 update_transcribe.py && cd ../
npm run build
cp src/data/summary.json public/data/ 
rsync -avz build/* $SRVR\:/var/www/transcribe/