#!/bin/python

import urllib.request
import json, os.path, time, math, re, operator

# current time, used for checking the age of the data files
imageList = []
# if the all items file is older than 1 day, get master items file from omeka
itemsFile = 'dataFiles/items.json'
itemsFileModTime = os.path.getmtime(itemsFile)
with open(itemsFile) as json_file:
    items = json.load(json_file)
        filesfilename = 'dataFiles/files' + id + '.json'
    # 2. create array of subjects with each corresponding id as a value
    # 3. iterate over files files and get completed status, then add transcripts to content.items.id, concatentated for ease of search
        with open(filesfilename) as files:
            filesJson = json.load(files)
            for fi in filesJson:
                fileObj = {
                    'pageid': fi['id'],
                    'pagefilename': fi['filename'],
                }
                transcription = ''
                for fe in fi['element_texts']:
                    if fe['element']['name'] == 'Transcription':
                        fileObj['transcription'] = fe['text']
                        if len(fileObj['transcription']) > 0:
                            content['summary']['totalTranscount'] += 1
                            itemObj['transcount'] += 1
                if '2019' in fi["modified"]:
                    yearlyModifiedCounter += 1
                sitemTranscriptions['pages'].append(fileObj)
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
                    imageList.append(ie['text'])
                if ie['element']['name'] == 'Weight': itemObj['weight'] = ie['text']
                if ie['element']['name'] == 'Title':
                    title = ie['text']
                    date = re.findall(r'[0-9]{4}', title)
                    for y in date:
                        decade = math.floor(int(y) / 10) * 10
                        # tagCleaner(str(decade), content['dates'], id)
                    itemObj['title'] = title
                    for i in range(0, len(date)):
                        date[i] = int(date[i])
                    itemObj['date'] = date
                if lang == [] : lang = ['English']
        # print( itemObj['count'])
        if id != '1182':
            itemObj['percentTranscribed'] = round(itemObj['transcount'] / itemObj['count'],2) * 100
        # content['items'].append(itemObj)
        itemData.append(itemObj)
        # wholeItem = itemObj
        # wholeItem.update(sitemTranscriptions)
        itemTranscriptions.append(sitemTranscriptions)
        # newFileName = '../src/data/' + id + '.json'
        # with open(newFileName, 'w') as dataFile:
        #     json.dump(wholeItem, dataFile)
        print(itemObj['id'])
itemData.sort(key=operator.itemgetter('transcount'))
content['summary']['percentTranscribed'] = round(content['summary']['totalTranscount'] / content['summary']['totalPages'], 4) * 100

with open('../src/data/items.json', 'w') as dataFile:
    json.dump(itemData, dataFile)
with open('../src/data/itemTranscriptions.json', 'w') as dataFile:
    json.dump(itemTranscriptions, dataFile)
with open('../src/data/summary.json', 'w') as dataFile:
    json.dump(content, dataFile)
print('downloaded ' + str(downloadedFileCount) + ' files; did not download ' + str(skippedFileCount) + ' files.')
# print('touched in 2019: ' + str(yearlyModifiedCounter))
with open('./imageList.txt', 'w') as listfile:
    for line in imageList:
        listfile.write(line + "\n")
