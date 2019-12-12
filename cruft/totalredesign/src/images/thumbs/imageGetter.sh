#!/bin/bash
wget -nc -i ../../../dataHandlers/imageList.txt
mogrify -resize 500 *.jpg
