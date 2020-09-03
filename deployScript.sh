#!/bin/bash
source ../variables.sh
npm run build
scp -r build/* $SERVER/newtranscribe/