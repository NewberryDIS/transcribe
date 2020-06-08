#!/bin/python

import urllib.request
import json, os.path, time, math, re, operator

# current time, used for checking the age of the data files
currTime = int(time.time())

# iterators, for purposes
count = 0

# various variables
itemData = []
itemsFile = '/home/c2lknt/Documents/newberry/transcribe/dataHandlers/dataFiles/items.json'
with open(itemsFile) as json_file:
    items = json.load(json_file)
    for i in items:
        itemObj = {
            'id': str(i['id']),
            'pages': []
        }
        id = str(i['id'])
        filesurl = 'http://publications.newberry.org/transcription/mms-transcribe/api/files?item=' + id
        filesfilename = '/home/c2lknt/Documents/newberry/transcribe/dataHandlers/dataFiles/files' + id + '.json'
        itemurl = 'http://publications.newberry.org/transcription/mms-transcribe/api/items/' + id
        itemfilename = '/home/c2lknt/Documents/newberry/transcribe/dataHandlers/dataFiles/item' + id + '.json'
    # 2. create array of subjects with each corresponding id as a value
    # 3. iterate over files files and get completed status, then add transcripts to content.items.id, concatentated for ease of search
        with open(filesfilename) as files:
            filesJson = json.load(files)
            for fi in filesJson:
                itemObj['pages'].append(fi['id'])
                # itemObj[fi['id']] = fi['filename']
        # print( itemObj['count'])
        # content['items'].append(itemObj)
        itemData.append(itemObj)
        # wholeItem = itemObj
        # wholeItem.update(sitemTranscriptions)
        # newFileName = '../src/data/' + id + '.json'
        # with open(newFileName, 'w') as dataFile:
        #     json.dump(wholeItem, dataFile)
        print(itemObj['id'])

with open('./itempages.json', 'w') as dataFile:
    json.dump(itemData, dataFile)
print('done.')
# print('touched in 2019: ' + str(yearlyModifiedCounter))
