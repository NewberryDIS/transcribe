#!/bin/bash
wget -nc -i ../../../dataHandlers/imageList.txt
identify -format '%w %i\n' ./*.jpg |
awk '$1 > 500 {sub(/^[^ ]* [^ ]* /, ""); print}' |
tr '\n' '\0' |
xargs -0 mogrify -resize 500
