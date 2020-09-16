#!/bin/python

import urllib.request, requests
import json, os.path, time, math

# iterators, for purposes
count = 0

itemsFile = './dataFiles/items.json'
urllib.request.urlretrieve('http://publications.newberry.org/transcription/mms-transcribe/api/items/', itemsFile)

# currTime = int(time.time())
# itemsFileModTime = os.path.getmtime(itemsFile)
# if not os.path.exists( itemsFile) or currTime - itemsFileModTime > 86400:
#     urllib.request.urlretrieve('http://publications.newberry.org/transcription/mms-transcribe/api/items/', itemsFile)

with open(itemsFile) as json_file:
    items = json.load(json_file)
    downloadedFileCount = 0
    skippedFileCount = 0
    for i in items:
        id = str(i['id'])
        itemObj = {
            'id': id,
            'transcount': 0,
            'pagecount': 0,
            'percentTranscribed': 0,
        }

        filesurl = 'http://publications.newberry.org/transcription/mms-transcribe/api/files?item=' + id
        filesfilename = 'dataFiles/files' + id + '.json'
        itemurl = 'http://publications.newberry.org/transcription/mms-transcribe/api/items/' + id
        itemfilename = 'dataFiles/item' + id + '.json'
        urllib.request.urlretrieve(filesurl, filesfilename)
        urllib.request.urlretrieve(itemurl, itemfilename)

    # swap the above with this to check for file age; as this will be a cron job run daily, there's no need for it
    # mostly useful for testing
        # filesurl = 'http://publications.newberry.org/transcription/mms-transcribe/api/files?item=' + id
        # filesfilename = 'dataFiles/files' + id + '.json'
        # itemurl = 'http://publications.newberry.org/transcription/mms-transcribe/api/items/' + id
        # itemfilename = 'dataFiles/item' + id + '.json'
        # if os.path.exists(filesfilename):
        #     fileModTime = os.path.getmtime(filesfilename)
        #     if currTime - fileModTime > 86400:
        #         urllib.request.urlretrieve(filesurl, filesfilename)
        #         urllib.request.urlretrieve(itemurl, itemfilename)
        # else: 
        #     urllib.request.urlretrieve(filesurl, filesfilename)
        #     urllib.request.urlretrieve(itemurl, itemfilename)

    # iterate over files files and get transcription length; if length > 0, then its transcribed
        with open(filesfilename) as files:
            filesJson = json.load(files)
            for fi in filesJson:
                itemObj['pagecount'] += 1                
                for fe in fi['element_texts']:
                    if fe['element']['name'] == 'Transcription':
                        if len(fe['text']) > 0:
                            itemObj['transcount'] += 1
        itemObj['percentTranscribed'] = '%.1f' % round((itemObj['transcount'] / itemObj['pagecount']) * 100, 1)
    # find element text #38 and add percentTranscribed value, then put *all data* (not just data changes) to omeka
        query = {"key": '1fecb024c01dc30832731137491e644701626a10'}
        endpoint = 'https://publications.newberry.org/transcription/mms-transcribe/api/items/' + itemObj["id"] + '?' + urllib.parse.urlencode(query)
        with open(itemfilename) as jsonfile:
            itemJson = json.load(jsonfile)
            for et in itemJson["element_texts"]: 
                if et["element"]["name"] == "Coverage":
                    et["text"] = itemObj['percentTranscribed']
        stringItemJson = json.dumps(itemJson)
        # x = requests.put(endpoint, data=stringItemJson)
        # print(itemObj["id"] + ': ' + itemObj['percentTranscribed'])
# print('Done')
