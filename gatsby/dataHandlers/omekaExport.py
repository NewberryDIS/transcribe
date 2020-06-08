import urllib.request as request
import json, os.path, time, math, re, csv

jenCsv = []

# current time, used for checking the age of the data files
currTime = int(time.time())

# iterators, for purposes
count = 0

# various variables
content = {
    'summary': {
        'total': 0,
        'totalnr': 0,
        'totalcomplete': 0,
        'totalincomplete': 0,
        'percentComplete': 0,
        'percentTouched': 0
    },
    'subjects': {},
    'items': {},
    'languages': {},
    'dates': {}
}
imageList = []
# if the all items file is older than 1 day, get master items file from omeka
itemsFile = 'dataFiles/items.json'
itemsFileModTime = os.path.getmtime(itemsFile)
if os.path.exists( itemsFile) and currTime - itemsFileModTime > 86400:
    request.urlretrieve('http://publications.newberry.org/transcription/mms-transcribe/api/items/', itemsFile)

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

def stuffer(array, key, value, id):
    if id in array:
        array[id].update({key: value})
    else:
        array.update({id: {key: value}})
# go through all items in items.json and
#     1. get file___.json and item___.json (if they are older than 1 day)
#         (we don't bother checking age of both files, if files___.json is older than a day, we get them both - low impact inefficiency (aka who cares))
with open(itemsFile) as json_file:
    items = json.load(json_file)
    for i in items:
    # 2. create array of subjects with each corresponding id as a value
        for e in i['element_texts']: 
            if e['element']['name'] == 'Subject':
                tagCleaner(e['text'], content['subjects'], id)
    # 3. iterate over files files and get completed status, then add transcripts to content.items.id, concatentated for ease of search
        with open(itemfilename) as item:
            itemJson = json.load(item)
            jenTemp = {
                'id': '',
                'subject': '',
                'source': '',
                'relation': '',
                'language': '',
                'description': '',
                'collection': ''
            }
            jenTemp.update({'id': id})
            if itemJson['collection']: 
                jenTemp.update({'collection': itemJson['collection']['id']})
            for ie in itemJson['element_texts']:
                if ie['element']['name'] == 'Title':              jenTemp.update({'title': ie['text']})
                if ie['element']['name'] == 'Subject':            jenTemp.update({'subject': ie['text']})
                if ie['element']['name'] == 'Source':             jenTemp.update({'source': ie['text']})
                if ie['element']['name'] == 'Language':           jenTemp.update({'language': ie['text']})
                if ie['element']['name'] == 'Relation':           jenTemp.update({'relation': ie['text']})
                if ie['element']['name'] == 'Description':        jenTemp.update({'description': ie['text']})
        jenCsv.append(jenTemp)

# r['id'],r['title'],r['subject'],r['source'],r['language'],r['relation'],r['description'],
# <td>'ID'</td><td>'Title'</td><td>'Subject'</td><td>'Source'</td><td>'Language'</td><td>'Relation'</td><td>'Description'</td>

with open('jenFile.json', 'w') as dataFile:
    json.dump(jenCsv, dataFile)
print('All done!')
# image handling: 
#     chop off beggining of url
#     look for filename in /src/images/thumbs/
#     if not present
#         push filename to list
#     wget list
#     mogrify: 
#         if file width > 500
#             resize to 500