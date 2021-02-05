#!/usr/bin/python3

import urllib.request, requests
import json, os.path, time, math

# iterators, for purposes
count = 0

content = {
    'summary': {
        'totalPages': 0,
        'totalTranscount': 0,
        'percentTranscribed': 0,
    },
}

currTime = int(time.time())

itemsFile = './dataFiles/items.json'
urllib.request.urlretrieve('https://transcribe.newberry.org/api/items/', itemsFile)
itemsFile2 = 'items2.json'
urllib.request.urlretrieve('https://transcribe.newberry.org/api/items/?page=2', itemsFile2)
data = data2 = "" 
# Reading data from file1 
with open(itemsFile) as fp: 
    data = fp.read() 
# Reading data from file2 
with open(itemsFile2) as fp: 
    data2 = fp.read() 

data = data[:-1] + ','
data2 = data2[1:]
data += data2

with open ('dataFiles/itemsBothPages.json', 'w') as fp: 
    fp.write(data) 

with open('dataFiles/itemsBothPages.json') as json_file:
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

        content['summary']['totalPages'] += i['files']['count']
#        filesurl = 'http://publications.newberry.org/transcription/mms-transcribe/api/files?item=' + id
#        filesfilename = 'dataFiles/files' + id + '.json'
#        itemurl = 'http://publications.newberry.org/transcription/mms-transcribe/api/items/' + id
#        itemfilename = 'dataFiles/item' + id + '.json'
#        urllib.request.urlretrieve(filesurl, filesfilename)
#        urllib.request.urlretrieve(itemurl, itemfilename)

    # swap the above with this to check for file age; as this will be a cron job run daily, there's no need for it
    # mostly useful for testing
        filesurl = 'http://transcribe.newberry.org/api/files?item=' + id
        filesfilename = 'dataFiles/files' + id + '.json'
        itemurl = 'http://transcribe.newberry.org/api/items/' + id
        itemfilename = 'dataFiles/item' + id + '.json'
        if os.path.exists(filesfilename):
            fileModTime = os.path.getmtime(filesfilename)
            if currTime - fileModTime > 86400:
                urllib.request.urlretrieve(filesurl, filesfilename)
                urllib.request.urlretrieve(itemurl, itemfilename)
        else: 
            urllib.request.urlretrieve(filesurl, filesfilename)
            urllib.request.urlretrieve(itemurl, itemfilename)

    # iterate over files files and get transcription length; if length > 0, then its transcribed
        with open(filesfilename) as files:
            filesJson = json.load(files)
            for fi in filesJson:
                itemObj['pagecount'] += 1                
                for fe in fi['element_texts']:
                    if fe['element']['name'] == 'Transcription':
                        if len(fe['text']) > 0:
                            content['summary']['totalTranscount'] += 1
                            itemObj['transcount'] += 1
        itemObj['percentTranscribed'] = '%.1f' % round((itemObj['transcount'] / itemObj['pagecount']) * 100, 1)
    # find element text #38 and add percentTranscribed value, then put *all data* (not just data changes) to omeka
        query = {"key": '1fecb024c01dc30832731137491e644701626a10'}
        endpoint = 'http://transcribe.newberry.org/api/items/' + itemObj["id"] + '?' + urllib.parse.urlencode(query)
        with open(itemfilename) as jsonfile:
            itemJson = json.load(jsonfile)
            for et in itemJson["element_texts"]: 
                if et["element"]["name"] == "Coverage":
                    et["text"] = itemObj['percentTranscribed']
                    if itemObj['percentTranscribed'] != '100.0':
                        print(itemObj['id'] + ': ' + itemObj['percentTranscribed'])
        stringItemJson = json.dumps(itemJson)
        x = requests.put(endpoint, data=stringItemJson)
#         print(itemObj["id"] + ': ' + itemObj['percentTranscribed'])
# print('Done')
content['summary']['percentTranscribed'] = round(content['summary']['totalTranscount'] / content['summary']['totalPages'], 4) * 100

with open('data/summary.json', 'w') as dataFile:
    json.dump(content, dataFile)
