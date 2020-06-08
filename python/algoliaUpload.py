import json, os
from algoliasearch.search_client import SearchClient

client = SearchClient.create('IAK05KHZWJ', '5da665731fedd91e4826df0f1e1e701c')
index = client.init_index('transcribe')


for filename in os.listdir('clumps'):
    print(filename)
    with open('clumps/' + filename) as f:
        record = json.load(f)
        index.save_objects(record, {'autoGenerateObjectIDIfNotExist': True});



# # single file verison: 
# import json
# from algoliasearch.search_client import SearchClient

# client = SearchClient.create('IAK05KHZWJ', '5da665731fedd91e4826df0f1e1e701c')
# index = client.init_index('transcribe')

# with open('clumps/1500.json') as f:
#     records = json.load(f)

# index.save_objects(records, {'autoGenerateObjectIDIfNotExist': True});