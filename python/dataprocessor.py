#!/bin/python

import urllib.request
import json, os.path, time, math, re, operator



# current time, used for checking the age of the data files
currTime = int(time.time())

# iterators, for purposes
count = 0

# various variables
jsoncontent = []
itemData = []
itemTranscriptions = []
imageList = []
# if the all items file is older than 1 day, get master items file from omeka
itemsFile = './items.json'
itemsFileModTime = os.path.getmtime(itemsFile)
if not os.path.exists( itemsFile) or currTime - itemsFileModTime > 86400:
    urllib.request.urlretrieve('http://publications.newberry.org/transcription/mms-transcribe/api/items/', itemsFile)
# go through all items in items.json and
#     1. get file___.json and item___.json (if they are older than 1 day)
#         (we don't bother checking age of both files, if files___.json is older than a day, we get them both - low impact inefficiency (aka who cares))
with open(itemsFile) as json_file:
    items = json.load(json_file)
    downloadedFileCount = 0
    skippedFileCount = 0
    for i in items:
        id = str(i['id'])
        itemObj = {
            'id': id,
            'count': 0,
            'lang': '',
            'desc': '',
            'cataloglink': '',
            'image': '',
            'transcount': 0,
            'percentTranscribed': 0,
            'date': '',
            'category': '',
            'pages': [],
        }
        itemObj['count'] = i['files']['count']
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
        with open(filesfilename) as files:
            filesJson = json.load(files)
            for fi in filesJson:
                fileObj = {
                    'pageid': fi['id'],
                    'pagefilename': fi['filename'],
                    'transcription': '',
                }
                transcription = ''
                for fe in fi['element_texts']:
                    if fe['element']['name'] == 'Transcription':
                        fileObj['transcription'] = fe['text']
                        if len(fileObj['transcription']) > 0:
                            itemObj['transcount'] += 1
                itemObj['pages'].append(fileObj)
        with open(itemfilename) as item:
            itemJson = json.load(item)
            for ie in itemJson['element_texts']:
                lang = ''
                desc = ''
                image = ''
                weight = ''
                itemObj['id'] = id
                if ie['element']['name'] == 'Language':
                    itemObj['lang'] = ie['text']
                if ie['element']['name'] == 'Relation': itemObj['desc'] = ie['text']
                if ie['element']['name'] == 'Description':
                    pattern = "(?P<url>https?://[^\s]+)\" target=\"_blank\" rel=\"noreferrer\">View catalog record<"
                    if re.search(pattern, ie['text']) is not None:
                        substring = re.search(pattern, ie['text']).group("url").replace('&amp;','&')
                        itemObj['cataloglink'] = substring
                if ie['element']['name'] == 'Source':
                    itemObj['image'] = ie['text']
                if ie['element']['name'] == 'Title':
                    title = ie['text']
                    itemObj['title'] = title
                    date = re.findall(r'[0-9]{4}', title)
                    for i in range(0, len(date)):
                        date[i] = int(date[i])
                    itemObj['date'] = date
                if lang == '': lang = ['English']
        # print( itemObj['count'])
        # if id != '1182':
        #     itemObj['percentTranscribed'] = round(itemObj['transcount'] / itemObj['count'],2) * 100
        newFileName = './records/' + id + '.json'
        jsoncontent.append(itemObj)

        print(itemObj['id'])
with open ('./jsonData.json', 'w') as recordFile:
    json.dump(jsoncontent, recordFile)
print('downloaded ' + str(downloadedFileCount) + ' files; did not download ' + str(skippedFileCount) + ' files.')
