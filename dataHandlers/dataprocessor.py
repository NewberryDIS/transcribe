import urllib.request as request
import json
import os.path
import time

# current time, used for checking the age of the data files
currTime = int(time.time())

# iterators, for purposes
count = 0
class Item: 
    def __init__(lang, desc, image, pc, pnr, weight, transcription ):
        self.lang = lang 
        self.desc = desc 
        self.desc = desc 
        self.image = image 
        self.pc = pc 
        self.pnr = pnr 
        self.weight = weight 
        self.transcription = transcription

# various variables
content = {
    'subjects': {},
    'items': {},
    'completion': {
        'total': 0,
        'needsReview': 0,
        'incomplete': 0,
        'complete': 0
    }
}

# if the all items file is older than 1 day, get master items file from omeka
itemsFile = 'dataFiles/items.json'
itemsFileModTime = os.path.getmtime(itemsFile)
if os.path.exists( itemsFile) and currTime - itemsFileModTime > 86400:
    request.urlretrieve('http://publications.newberry.org/transcription/mms-transcribe/api/items/', itemsFile)

# go through all items in items.json and
#     1. get file___.json and item___.json (if they are older than 1 day)
#         (we don't bother checking age of both files, if files___.json is older than a day, we get them both - low impact inefficiency (aka who cares))
with open(itemsFile) as json_file:
    items = json.load(json_file)
    downloadedFileCount = 0
    skippedFileCount = 0
    for i in items:
        count += 1
        id = str(i['id'])
        lang = desc = image = pc = pnr = weight = transcription = ''
        filesurl = 'http://publications.newberry.org/transcription/mms-transcribe/api/files?item=' + id
        filesfilename = 'dataFiles/files' + id + '.json'
        itemurl = 'http://publications.newberry.org/transcription/mms-transcribe/api/items/' + id
        itemfilename = 'dataFiles/item' + id + '.json'
        fileModTime = os.path.getmtime(filesfilename)
        if os.path.exists(filesfilename) and currTime - fileModTime > 86400:
            downloadedFileCount += 1
            request.urlretrieve(filesurl, filesfilename)
            request.urlretrieve(itemurl, itemfilename)
        else:
            skippedFileCount += 1
    # 2. create array of subjects with each corresponding id as a value
        for e in i['element_texts']: 
            if e['element']['name'] == 'Subject':
                val = [x.strip() for x in e['text'].split(';')]
                for v in val:
                    if v in content['subjects']:
                        content['subjects'][v].append(id)
                    else:
                        content['subjects'].update({v: [id]})
    # 3. iterate over files files and get completed status, then add transcripts to content.items.id, concatentated for ease of search
        with open(filesfilename) as files:
            filesJson = json.load(files)
            for fi in filesJson:
                transcription = ''
                for fe in fi['element_texts']:
                    if fe['element']['name'] == 'Status':
                        content['completion']['total'] += 1
                        if fe['text'] == 'Needs Review': content['completion']['needsReview'] += 1
                        if fe['text'] == 'Incomplete': content['completion']['incomplete'] += 1
                        if fe['text'] == 'Completed' or  fe['text'] == 'Complete' : content['completion']['complete'] += 1
                    if fe['element']['name'] == 'Transcription': 
                        transcription += fe['text']
        with open(itemfilename) as item:
            itemJson = json.load(item)
            for ie in itemJson['element_texts']:
                if ie['element']['name'] == 'Language':             lang = ie['text']
                if ie['element']['name'] == 'Description':          desc = ie['text']
                if ie['element']['name'] == 'Relation':             desc = ie['text']
                if ie['element']['name'] == 'Source':               image = ie['text']
                if ie['element']['name'] == 'Percent Completed':    pc = ie['text']
                if ie['element']['name'] == 'Percent Needs Review': pnr = ie['text']
                if ie['element']['name'] == 'Weight':               weight = ie['text']
        itemObj = Item(lang, desc, image, pc, pnr, weight, transcription)

print('total: ' + str(content['completion']['total']) + '; complete: ' + str(content['completion']['complete']) + '; incomplete: ' + str(content['completion']['incomplete']) + '; nr: ' + str(content['completion']['needsReview']))
print('downloaded ' + str(downloadedFileCount) + ' files; did not download ' + str(skippedFileCount) + ' files.')
print('item 1010: ' + content['items']['1010']['transcription'])
# 1. get items.json 
#     save items.json
# 2. from items.json get item_id.json and files_id.json
# 3. from items.json get:  
#     Subject: $e["element"]["name"] === "Subject" ? push $e[text]
# 4. from file_id.json get: 
#     Subject (Subject)
#     Review Count ("Needs Review")
#     Incomplete Count ("Incomplete")
#     Complete Count ("Completed")
# 5. from item_id.json get:
#     Language ("Language")
#     Description ("Description")
#     Relation ("Relation")
#     Source ("Source")
#     Percent ("Percent )
#     Percent ("Percent )
#     Weight ("Weight")
#     Date (Range or Year based on Title)