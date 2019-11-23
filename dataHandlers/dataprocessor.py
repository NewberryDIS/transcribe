import urllib.request as request
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
    downloadedFileCount = 0
    skippedFileCount = 0
    itemObj = {
        'id': '',
        'lang': '', 
        'desc': '', 
        'image': '', 
        'pc': '', 
        'pnr': '', 
        'weight': '', 
        'transcription': '', 
        'date': ''
    }
    for i in items:
        count += 1
        id = str(i['id'])
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
                tagCleaner(e['text'], content['subjects'], id)
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
                        stuffer(content['items'], 'transcription', fe['text'], id)
        with open(itemfilename) as item:
            itemJson = json.load(item)
            for ie in itemJson['element_texts']:
                lang = ''
                desc = ''
                image = ''
                pc = ''
                pnr = ''
                weight = ''
                stuffer(content['items'], 'id', id, id)
                if ie['element']['name'] == 'Language':
                    tagCleaner(ie['text'], content['languages'], id)
                    stuffer(content['items'], 'lang', ie['text'], id)
                if ie['element']['name'] == 'Description':          stuffer(content['items'], 'desc', ie['text'], id)
                if ie['element']['name'] == 'Relation':             stuffer(content['items'], 'desc', ie['text'], id)
                if ie['element']['name'] == 'Source':               
                    stuffer(content['items'], 'image', ie['text'], id)
                    imageList.append(ie['text'])
                if ie['element']['name'] == 'Percent Completed':    stuffer(content['items'], 'pc', ie['text'], id)
                if ie['element']['name'] == 'Percent Needs Review': stuffer(content['items'], 'pnr', ie['text'], id)
                if ie['element']['name'] == 'Weight':               stuffer(content['items'], 'weight', ie['text'], id)
                if ie['element']['name'] == 'Title':
                    title = ie['text']
                    date = re.findall(r'[0-9]{4}', title)
                    for y in date:
                        decade = math.floor(int(y) / 10) * 10
                        tagCleaner(str(decade), content['dates'], id)
                    stuffer(content['items'], 'title', title, id)
                    stuffer(content['items'], 'date', date, id)
                if lang == '': tagCleaner('English', content['languages'], id)
cs = content['summary']
content['summary']['percentComplete'] = round((cs['totalcomplete'] / cs['total']) * 100, 2)
content['summary']['percentTouched'] = round(((cs['totalcomplete'] + cs['totalincomplete'] + cs['totalnr']) / cs['total']) * 100, 2)

with open('../src/data/content.json', 'w') as dataFile:
    json.dump(content, dataFile)
print('downloaded ' + str(downloadedFileCount) + ' files; did not download ' + str(skippedFileCount) + ' files.')
print('total: ' + str(content['summary']['total']) + '; percent completed: ' + str(content['summary']['percentComplete']) + '%; total touched: ' + str(content['summary']['percentTouched']) + '%;')
with open('./imageList.txt', 'w') as listfile:
    for line in imageList:
        listfile.write(line + "\n")
# image handling: 
#     chop off beggining of url
#     look for filename in /src/images/thumbs/
#     if not present
#         push filename to list
#     wget list
#     mogrify: 
#         if file width > 500
#             resize to 500