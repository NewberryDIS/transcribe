#!/bin/bash
npm run build
# cp src/data/summary.json public/data/ 
# scp -r build/* $SRVR\:/var/www/transcribe/
rsync -avz build/* $SRVR\:/var/www/transcribe/