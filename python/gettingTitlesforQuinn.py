import os, json
directory = 'dataFiles'
 
outputArr = []

imlsList = ["38",
    "215",
    "226",
    "227",
    "1167",
    "1373",
    "1374",
    "1375",
    "1376",
    "1378",
    "1380",
    "1381",
    "1382",
    "1383",
    "1386",
    "1387",
    "1388",
    "1389",
    "1390",
    "1391",
    "1393",
    "1394",
    "1402",
    "1403",
    "1404",
    "1405",
    "1406",
    "1407"]

for file in os.listdir(directory):
    if file.startswith('item'):
        full_filename = "%s/%s" % (directory, file)

        with open(full_filename,'r') as fi:
            item = json.load(fi)
            if str(item["id"]) in imlsList:
                print(item["id"])
                for et in item["element_texts"]:
                    if et["element"]["name"] == 'Title':
                        outputObj = {
                            "id": item["id"],
                            "title": et["text"]
                        }
                        outputArr.append(outputObj)

outputArr.sort(key=lambda x: x["id"])

with open('titlesForQuinn.json', 'w') as dataFile:
    json.dump(outputArr, dataFile, indent=4)
