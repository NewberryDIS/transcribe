# import urllib2

import urllib.request
import json

content = {
    'summary': {
        'totalPages': 0,
        'totalTranscount': 0,
        'percentTranscribed': 0,
    },
}

itemsurl = "http://transcribe.newberry.org/api/items"
itemresponse = urllib.request.urlopen(itemsurl).read()
itemjson = json.loads(itemresponse)
alltranscriptions = []
total = 0
for i in itemjson:
	colltranscripts = []	
	filesurl = i["files"]["url"]
	filesresponse = urllib.request.urlopen(filesurl).read()
	filesjson = json.loads(filesresponse)
	print(filesurl)
	itemid = str(i["id"])
	content['summary']['totalPages'] += i['files']['count']
	collectionurl = "http://publications.newberry.org/transcribe/item/"+itemid
	# collectionurl = "http://publications.newberry.org/transcription/mms-transcribe/items/show/"+itemid
	iet = i["element_texts"]
	collectiontitle = "[No collection title available]"	
	for ie in iet:
		if ie["element"]["name"] == "Title":
			collectiontitle = ie["text"]	
	for f in filesjson:
		fileid = str(f["id"])
		# dlink = "http://publications.newberry.org/transcription/mms-transcribe/scripto/transcribe/"+itemid+"/"+fileid
		dlink = "http://publications.newberry.org/transcribe/item/" + itemid + "/page/" + fileid
		file_data = f["file_urls"]
		filename = file_data["original"]
		element_texts = f["element_texts"]
		text = ""
		for et in element_texts:
			element = et["element"]
			if element["name"] == "Transcription":
				text = et["text"].replace('\n',' ')
				colltranscripts.append({"url":dlink,"text":text,"img":filename})
				total += 1
				if len(text) > 0:
					content['summary']['totalTranscount'] += 1
	objects = {"transcriptions": colltranscripts, "item_url":collectionurl, "item":collectiontitle}
	alltranscriptions.append(objects)
print( "Successfully exported "+str(total)+" transcriptions")
with open("alltranscripts.json", 'w') as f:
# with open("alltranscripts.json", 'w') as f:
   json.dump(alltranscriptions, f,indent=4, sort_keys=True)

content['summary']['percentTranscribed'] = round(content['summary']['totalTranscount'] / content['summary']['totalPages'], 4) * 100

with open('summary.json', 'w') as dataFile:
    json.dump(content, dataFile, indent=4, sort_keys=True)
# with open('data/summary.json', 'w') as dataFile:
#     json.dump(content, dataFile, indent=4, sort_keys=True)