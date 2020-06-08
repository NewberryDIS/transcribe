#!/bin/python

import urllib.request
import json, os.path, time, math, re, operator

# current time, used for checking the age of the data files
currTime = int(time.time())

# iterators, for purposes
count = 0

# various variables
itemData = []
# if the all items file is older than 1 day, get master items file from omeka
itemsFile = 'dataFiles/items.json'
itemsFileModTime = os.path.getmtime(itemsFile)
if os.path.exists( itemsFile) and currTime - itemsFileModTime > 86400:
    urllib.request.urlretrieve('http://publications.newberry.org/transcription/mms-transcribe/api/items/', itemsFile)
# slices semicolon-separated values into standard array values; does not dedupe
def arrayCleaner(item):
    val = [x.strip() for x in item.split(';')]
    array = []
    for v in val:
        if v not in array:
            array.append(v)
    return array

# slices semicolon-separated values into standard array values; also dedupes
def tagCleaner(item, array, id):
    if item.find(';') > -1:
        val = [x.strip() for x in item.split(';')]
        for v in val:
            if v in array:
                array[v].append(id)
            else:
                array.update({v: [id]})
    else:
        if item in array:
            array[item].append(id)
        else:
            array.update({item: [id]})

# adds key/value pair to array of objects whose parent key is the id
def stuffer(array, key, value, id):
    for x in array:
        if id in x:
            array[id].append({key: value})
        else:
            array.update({id: {key: value}})
# go through all items in items.json and
#     1. get file___.json and item___.json (if they are older than 1 day)
#         (we don't bother checking age of both files, if files___.json is older than a day, we get them both - low impact inefficiency (aka who cares))
with open(itemsFile) as json_file:
    items = json.load(json_file)
    downloadedFileCount = 0
    skippedFileCount = 0
    for i in items:
        itemObj = {
            'id': '',
            'count': 0,
            'lang': '',
            'desc': '',
            'cataloglink': '',
            'image': '',
            'category': '',
        }
        id = str(i['id'])
        itemObj['count'] = i['files']['count']
        # content['summary']['totalPages'] += i['files']['count']
        filesurl = 'http://publications.newberry.org/transcription/mms-transcribe/api/files?item=' + id
        filesfilename = 'dataFiles/files' + id + '.json'
        itemurl = 'http://publications.newberry.org/transcription/mms-transcribe/api/items/' + id
        itemfilename = 'dataFiles/item' + id + '.json'
        if os.path.exists(filesfilename):
            fileModTime = os.path.getmtime(filesfilename)
            if currTime - fileModTime > 86400:
                downloadedFileCount += 1
                urllib.request.urlretrieve(filesurl, filesfilename)
                urllib.request.urlretrieve(itemurl, itemfilename)
            else:
                skippedFileCount += 1
        else: 
            downloadedFileCount += 1
            urllib.request.urlretrieve(filesurl, filesfilename)
            urllib.request.urlretrieve(itemurl, itemfilename)
    # 2. create array of subjects with each corresponding id as a value
        for e in i['element_texts']:
            if e['element']['name'] == 'Subject':
                itemObj['category'] = e['text']
    # 3. iterate over files files and get completed status, then add transcripts to content.items.id, concatentated for ease of search
        with open(itemfilename) as item:
            itemJson = json.load(item)
            for ie in itemJson['element_texts']:
                lang = []
                desc = ''
                image = ''
                weight = ''
                itemObj['id'] = id
                if ie['element']['name'] == 'Language':
                    # tagCleaner(ie['text'], content['languages'], id)
                    itemObj['lang'] = arrayCleaner(ie['text'])
                if ie['element']['name'] == 'Relation': itemObj['desc'] = ie['text']
                if ie['element']['name'] == 'Description':
                    pattern = "(?P<url>https?://[^\s]+)\" (.*?)>View c"
                    if re.search(pattern, ie['text']) is not None:
                        substring = re.search(pattern, ie['text']).group("url").replace('&amp;','&')
                        itemObj['cataloglink'] = substring
                if ie['element']['name'] == 'Source':
                    itemObj['image'] = ie['text']
                    # imageList.append(ie['text'])
                if ie['element']['name'] == 'Weight': itemObj['weight'] = ie['text']
                if ie['element']['name'] == 'Title':
                    title = ie['text']
                    itemObj['title'] = title
                if lang == [] : lang = ['English']
        # # print( itemObj['count'])
        # if id != '1182':
        #     itemObj['percentTranscribed'] = round(itemObj['transcount'] / itemObj['count'],2) * 100
        # content['items'].append(itemObj)
        itemData.append(itemObj)
        # wholeItem = itemObj
        # wholeItem.update(sitemTranscriptions)
        # itemTranscriptions.append(sitemTranscriptions)
        # newFileName = '../src/data/' + id + '.json'
        # with open(newFileName, 'w') as dataFile:
        #     json.dump(wholeItem, dataFile)
        print(itemObj['id'])
# itemData.sort(key=operator.itemgetter('transcount'))

with open('./items.json', 'w') as dataFile:
    json.dump(itemData, dataFile)
print('downloaded ' + str(downloadedFileCount) + ' files; did not download ' + str(skippedFileCount) + ' files.')
