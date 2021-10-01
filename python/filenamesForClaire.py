import urllib.request
import json, os, time, math, re, operator, csv

masterArray = []

directory = r'dataFiles'
for filename in os.listdir(directory):
    if filename.startswith("files"):
        with open("dataFiles/" + filename) as file:
            pages = json.load(file)
            for page in pages:
                print(page['original_filename'])
                tempObj = {
                    'origfilename': page['original_filename'],
                    'transcription': ''
                }
                for e in page['element_texts']:
                    if e['element']['name'] == 'Transcription':
                        # print(e['text'])
                        tempObj['transcription'] = e['text']
                # print(tempObj)
                masterArray.append(tempObj)

# f = open('mycsvfile.csv','wb')
# w = csv.DictWriter(f,masterArray.keys())
# w.writerows(masterArray)
# f.close()

keys = masterArray[0].keys()
with open('filenamecsv.csv', 'w', newline='')  as output_file:
    dict_writer = csv.DictWriter(output_file, keys)
    dict_writer.writeheader()
    dict_writer.writerows(masterArray)