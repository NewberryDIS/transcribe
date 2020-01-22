import urllib.request
import json, os.path, time, math, re

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
    'items': [],
    'languages': {},
    'dates': {}
}
yearlyModifiedCounter = 0

imageList = []
# if the all items file is older than 1 day, get master items file from omeka
itemsFile = 'dataFiles/items.json'
itemsFileModTime = os.path.getmtime(itemsFile)
if os.path.exists( itemsFile) and currTime - itemsFileModTime > 86400:
    urllib.request.urlretrieve('http://publications.newberry.org/transcription/mms-transcribe/api/items/', itemsFile)

def arrayCleaner(item):
    val = [x.strip() for x in item.split(';')]
    array = []
    for v in val: 
        if v not in array:
            array.append(v)
    return array

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
            'count': '',
            'lang': '', 
            'desc': '', 
            'image': '', 
            'pc': '', 
            'pnr': '', 
            'weight': '', 
            'transcription': '',
            'date': '',
            'category': '',
        }
        count += 1
        id = str(i['id'])
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
    # 2. create array of subjects with each corresponding id as a value
        for e in i['element_texts']: 
            if e['element']['name'] == 'Subject':
                tagCleaner(e['text'], content['subjects'], id)
                itemObj['category'] = e['text']
    # 3. iterate over files files and get completed status, then add transcripts to content.items.id, concatentated for ease of search
        with open(filesfilename) as files:
            filesJson = json.load(files)
            for fi in filesJson:
                content['summary']['total'] += 1
                transcription = ''
                for fe in fi['element_texts']:
                    if fe['element']['name'] == 'Status':
                        # content['summary']['total'] += 1
                        if fe['text'] == 'Needs Review': content['summary']['totalnr'] += 1
                        if fe['text'] == 'Incomplete': content['summary']['totalincomplete'] += 1
                        if fe['text'] == 'Completed' or  fe['text'] == 'Complete' : content['summary']['totalcomplete'] += 1
                    if fe['element']['name'] == 'Transcription': 
                        itemObj['transcription'] = fe['text']
                if '2019' in fi["modified"]:
                    yearlyModifiedCounter += 1
        with open(itemfilename) as item:
            itemJson = json.load(item)
            for ie in itemJson['element_texts']:
                lang = ''
                desc = ''
                image = ''
                pc = 0
                pnr = 0
                weight = ''
                itemObj['id'] = id
                if ie['element']['name'] == 'Language':
                    tagCleaner(ie['text'], content['languages'], id)
                    itemObj['lang'] = arrayCleaner(ie['text'])
                if ie['element']['name'] == 'Description':          itemObj['desc'] = ie['text']
                if ie['element']['name'] == 'Relation':             itemObj['desc'] = ie['text']
                if ie['element']['name'] == 'Source':               
                    itemObj['image'] = ie['text']
                    imageList.append(ie['text'])
                if ie['element']['name'] == 'Percent Completed':    itemObj['pc'] = int(ie['text'])
                if ie['element']['name'] == 'Percent Needs Review': itemObj['pnr'] = int(ie['text'])
                if ie['element']['name'] == 'Weight':               itemObj['weight'] = ie['text']
                if ie['element']['name'] == 'Title':
                    title = ie['text']
                    date = re.findall(r'[0-9]{4}', title)
                    for y in date:
                        decade = math.floor(int(y) / 10) * 10
                        tagCleaner(str(decade), content['dates'], id)
                    itemObj['title'] = title
                    for i in range(0, len(date)): 
                        date[i] = int(date[i])
                    itemObj['date'] = date
                if lang == '': lang = ['English']
        content['items'].append(itemObj)
        print(itemObj['id'])
cs = content['summary']
if cs['total'] > 0:
    content['summary']['percentComplete'] = round((cs['totalcomplete'] / cs['total']) * 100, 2)
    content['summary']['percentTouched'] = round(((cs['totalcomplete'] + cs['totalincomplete'] + cs['totalnr']) / cs['total']) * 100, 2)

with open('../src/data/content.json', 'w') as dataFile:
    json.dump(content, dataFile)
print('downloaded ' + str(downloadedFileCount) + ' files; did not download ' + str(skippedFileCount) + ' files.')
print('total: ' + str(content['summary']['total']) + '; percent completed: ' + str(content['summary']['percentComplete']) + '%; total touched: ' + str(content['summary']['percentTouched']) + '%;')
print('touched in 2019: ' + str(yearlyModifiedCounter))
with open('./imageList.txt', 'w') as listfile:
    for line in imageList:
        listfile.write(line + "\n")
