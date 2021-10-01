import urllib.request
import json, xmltodict

records = []

listOfIds = [
    # '912320',
    '844723',
    '160179',
    '872583',
    '874907',
    '315454',
    '182897',
    '84720',
    '819475'
]
# listOfIds = ['912320']
# 999123208805867
apikey = 'l8xx1a3af9fadca94b11b092e8b53962974d'

for i in listOfIds:
    # itemUrl = 'https://i-share-nby.primo.exlibrisgroup.com/almaws/v1/bibs?mms_id=99' + i + '8805867&view=full&expand=None&apikey=' + apikey 
    # itemUrl = 'https://api-na.hosted.exlibrisgroup.com/almaws/v1/bibs?mms_id=99' + i + '8805867&view=full&expand=None&apikey=' + apikey + '&format=json'
    itemUrl = 'https://api-na.hosted.exlibrisgroup.com/almaws/v1/bibs?mms_id=99' + i + '8805867&view=full&expand=None&apikey=' + apikey 
    itemData = urllib.request.urlopen(itemUrl)
    print(itemData)
    # itemJson = xmltodict.parse(itemData)
    # records = records + itemData.response
    
    # encodingHaeder = itemData.headers
    # print(encodingHaeder)

    # records.append(itemJson)

# with open('./marcrecords.json', 'w') as dataFile:
#     print(records, dataFile)

    # UniversitaÌa di Firenze. Dipartimento di storia dell'architettura e restauro delle strutture architettoniche.