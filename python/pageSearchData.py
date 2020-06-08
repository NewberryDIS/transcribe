#!/bin/python
import urllib.request
import json, os.path, time, math, re, operator
count = 0
allItems = []
itemsFile = './items.json'
with open(itemsFile) as json_file:
    items = json.load(json_file)
    for i in items:
        id = str(i['id'])
        pageObj = {
            'id': '',
            'pagefilename': '',
            'transcription': '',
            'itemid': id,
            'category': '',
            'date': '',
            'lang': '',
            'title': ''
        }
        # filesurl = 'http://publications.newberry.org/transcription/mms-transcribe/api/files?item=' + id
        filesfilename = 'dataFiles/files' + id + '.json'
        # itemurl = 'http://publications.newberry.org/transcription/mms-transcribe/api/items/' + id
        itemfilename = 'dataFiles/item' + id + '.json'
        # urllib.request.urlretrieve(filesurl, filesfilename)
        # urllib.request.urlretrieve(itemurl, itemfilename)
        for e in i['element_texts']:
            if e['element']['name'] == 'Subject':
                pageObj['category'] = e['text']
    # 3. iterate over files files and get completed status, then add transcripts to content.items.id, concatentated for ease of search
        with open(filesfilename) as files:
            filesJson = json.load(files)
            for fi in filesJson:
                pageObj['id'] = str(fi['id'])
                pageObj['pagefilename'] = fi['filename']
                for fe in fi['element_texts']:
                    if fe['element']['name'] == 'Transcription':
                        pageObj['transcription'] = fe['text']
        with open(itemfilename) as item:
            itemJson = json.load(item)
            for ie in itemJson['element_texts']:
                if ie['element']['name'] == 'Language':
                    pageObj['lang'] = ie['text']
                if ie['element']['name'] == 'Title':
                    title = ie['text']
                    pageObj['title'] = title
                    date = re.findall(r'[0-9]{4}', title)
                    for i in range(0, len(date)):
                        date[i] = int(date[i])
                    pageObj['date'] = date
                if pageObj['lang'] == '': pageObj['lang'] = ['English']
        allItems.append(pageObj)
        count = count + 1
        # print(itemObj['id'])
with open ('./pageSearchData.json', 'w') as recordFile:
    json.dump(allItems, recordFile)
print(count)
