<style>* {font-family: monospace;}</style>

<?php 
$url = "http://publications.newberry.org/transcription/mms-transcribe";
$items = file_get_contents($url . '/api/items/');
$itemdata = json_decode($items, true);
$urls = array();
foreach ($itemdata as $i) {
	$fileurl = $i["files"]["url"];
	array_push($urls,$fileurl);
}
foreach ($urls as $u) {
	$itemid = str_replace("http://publications.newberry.org/transcription/mms-transcribe/api/files?item=","",$u);
    $files = file_get_contents($u);
    $filesdata = json_decode($files, true);
    $filesFilename = 'files' . $itemid . '.json';
    $items = file_get_contents("http://publications.newberry.org/transcription/mms-transcribe/api/items/" . $itemid);
    $itemsdata = json_decode($items, true);
    $itemsFilename = 'items' . $itemid . '.json';
    file_put_contents($itemsFilename, $items);
    file_put_contents($filesFilename, $files);
}
  
?>