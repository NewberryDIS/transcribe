<style>* {font-family: monospace;}</style>

<?php 
$needsReview = 0;
$totals = array();
$totalsforboth = array();
$allItems = file_get_contents('items.json');
$allItemsData = json_decode($allItems, true);
$counts = array();
$urls = array();
$contentArray = array();
$subject = array();
$total = 0;
$totalnr = 0;
$totalcomplete = 0;
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
}

foreach ($urls as $u) {
	$itemid = str_replace("files","",$u);
	$itemid = str_replace(".json","",$itemid);
    $files = file_get_contents($u);
    $filesdata = json_decode($files, true);
    $count = count($filesdata);
    $startDate = $endDate = $lang = $desc = $image = $pc = $pnr = $weight = $name = '';
    $review = 0;
    $incomplete = 0;
    $complete = 0;
    $coll = [];
	foreach ($filesdata as $f) {
        foreach ($f["element_texts"] as $e) {
            if ($e["element"]["name"] === "Subject" ) array_push($subject, $e["text"]);
            if ($e["element"]["name"] == "Status"){
                if ($e["text"] === "Needs Review") $review++;
                if ($e["text"] === "Incomplete"  ) $incomplete++;
                if ($e["text"] === "Completed"   ) $complete++;
            }  
        }
    }
    $itemFilename = "items" . $itemid . ".json";
    $items = file_get_contents($itemFilename);
    $itemsdata = json_decode($items, true);
    foreach ($itemsdata["element_texts"] as $el){
		if ($el["element"]["name"] === "Language") $lang     = $el["text"];
		if ($el["element"]["name"] === "Description") $desc     = $el["text"];
		if ($el["element"]["name"] === "Relation") $desc     = $el["text"];
		if ($el["element"]["name"] === "Source"  ) $image    = $el["text"];
        if ($el["element"]["name"] === "Percent Completed") $pc = $el["text"];
        if ($el["element"]["name"] === "Percent Needs Review") $pnr = $el["text"];
        if ($el["element"]["name"] === "Weight") $weight = $el["text"];
		if ($el["element"]["name"] === "Title"   ) {
            $name = $el["text"];
            $dateRange = [];
            $dateYear = [];
            preg_match('/[0-9]{4}-[0-9]{4}/', $name, $dateRange);
            if ($dateRange === array()) {
                preg_match('/[0-9]{4}/', $name, $dateYear );
                $startDate = $dateYear[0];
                $endDate = $startDate;
            } else {
                $startDate = substr($dateRange[0], 0, 4);
                $endDate = substr($dateRange[0], 5, 8);
            };
        }
        // $coll = $collArray[$i["collection"]["id"]];
    }
    $tempcoll = $itemsdata["collection"]["id"];
    array_push($coll, $tempcoll, $collArray[$tempcoll]);
    $thisone = [
		"id" => $itemid,
        "name" => $name,
        "startDate" => $startDate,
        "endDate" => $endDate,
        "subjects" => $subject,
        "coll" => $coll,
        "desc" => $desc,
        "lang" => $lang,
		"image" => $image,
		// "status" => $status,
		"pc" => $pc,
		"pnr" => $pnr,
        "weight" => $weight,
        "needsreview" => $review,
        "incomplete" => $incomplete,
        "complete" => $complete,
        "count" => $count,
        "calc_needsrev"  => ($review / $count) * 100,
        "calc_incomplete"  => ($incomplete / $count) * 100,
        "calc_complete" => ($complete / $count) * 100
	];
	array_push($contentArray, $thisone);
    $total += $count;
    $totalnr += $review;
    $totalcomplete += $complete;
}
// echo $needsReview;

// function get_percentage($total, $number)
// {
//   if ( $total > 0 ) {
//    return round($number / ($total / 100),2);
//   } else {
//     return 0;
//   }
// }

// $pct = get_percentage(array_sum($totalsforboth),$needsReview);

// $countjson = array(
// 'needsreview' => $needsReview,
// 'total' => array_sum($totalsforboth),
// 'percentdone' => $pct
// );
// $bothArray = array($countjson, $contentArray);
$contentjson = json_encode($contentArray);
file_put_contents('content.json', $contentjson);

echo "{\"needsreview\":" . $totalnr . ",\"total\":" . $total . ",\"percentdone\":" . round((($totalcomplete / $total) * 100),2) . "}";
    
?>