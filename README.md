# Newberry Transcribe Front End

Built in React.  

Data is pulled from the Omeka/Scripto API.  This repo starts with the **get_summary.py** script in /python/, which downloads all the item and file data from the Omeka API and assmembles page lists for each item as well as other basic metadata.  The files in /src/data (esp items.json) power the filtering.  Search is handled by Mediawiki's built in search & API.  Percentages and fill rate are controlled by a server-side script that runs periodically, driven by php.

