#!/bin/bash
cd dataHandlers
./dataprocessor.py
cd ../
sed -i '1 i\{"items":' src/data/items.json
# sed -i '1 i\{"summary":' src/data/summary.json
sed -i '1 i\{"transcriptions":' src/data/itemTranscriptions.json
echo } >> src/data/items.json
# echo } >> src/data/summary.json
echo } >> src/data/itemTranscriptions.json