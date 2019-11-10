<style>* {font-family: monospace;}</style>

<?php 
$allItems = file_get_contents('items.json');
$allItemsData = json_decode($allItems, true);
$counts = $urls = $contentArray = $subject = array();
$total = $totalnr = $totalcomplete = $totalincomplete = $itemcount = $fileitemcount = 0;
$collArray = array(
    7 => "Transcribing Modern Manuscripts",
    14 => "Diaries",
    15 => "Letters",
    16 => "Everett D. Graff Collection of Western Americana",
    17 => "Edward E. Ayer Collection"
);
foreach ($allItemsData as $i) {
	$count = (int)$i["files"]["count"];
	$fileurl = 'files' . $i["id"] . '.json';
	array_push($counts,$count);
	array_push($urls,$fileurl);
    foreach ($i["element_texts"] as $e) {
        if ($e["element"]["name"] === "Subject" ) {
            if (!in_array($e["text"], $subject)) array_push($subject, $e["text"]);
        }
    }
    $itemcount++;
}
echo 'item count: ' . $itemcount . '<br />';
foreach ($urls as $u) {
	$itemid = str_replace("files","",$u);
	$itemid = str_replace(".json","",$itemid);
    $files = file_get_contents($u);
    $filesdata = json_decode($files, true);
    $count = count($filesdata);
    $image = '';
    $itemFilename = "items" . $itemid . ".json";
    $items = file_get_contents($itemFilename);
    $itemsdata = json_decode($items, true);
    foreach ($itemsdata["element_texts"] as $el){
        if ($el["element"]["name"] === "Source"  ){ 
            $image    = $el["text"];
            echo $el["text"] . "<br />";
        }
    }
}
?>
ok!