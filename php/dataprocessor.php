<style>* {font-family: monospace;}</style>

<?php 
// http://publications.newberry.org/transcription/mms-transcribe/api/items/
$allItems = file_get_contents('http://publications.newberry.org/transcription/mms-transcribe/api/items/');
file_put_contents('items.json', $allItems);
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
        $fileitemcount++;
    }
    $itemFilename = "items" . $itemid . ".json";
    $items = file_get_contents($itemFilename);
    $itemsdata = json_decode($items, true);
    foreach ($itemsdata["element_texts"] as $el){
		if ($el["element"]["name"] === "Language") $lang     = $el["text"];
		if ($el["element"]["name"] === "Description") $desc  = $el["text"];
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
    $totalincomplete += $incomplete;
    $totaltotal += $review + $incomplete + $complete;
}

echo 'item count: ' . $itemcount . '<br />' . 'fileitem counts: ' . $fileitemcount . '<br />';
echo "total complete : " . $totalcomplete . '<br />';
echo "total nr : " . $totalnr . '<br />';
echo "total incomplete : " . $totalincomplete . '<br />';
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
file_put_contents('../src/data/content.json', $contentjson);

// $perct = ;

$summary = [
    total => $total,
    totalnr => $totalnr,
    totalcomplete => $totalcomplete,
    totalincomplete => $totalincomplete,
    totaltotal => $totaltotal,
    percentComplete => round(((($totalcomplete + $totalincomplete + $totalnr) / $total) * 100),2)
];
$summaryJson = json_encode($summary);
file_put_contents('../src/data/summary.json', $summaryJson);

echo "{\"needsreview\":" . $totalnr . ",\"total\":" . $total . ",\"percentdone\":" . round(((($totalcomplete + $totalincomplete + $totalnr) / $total) * 100),2) . "}";
    
?>
<pre>
search [name, date (, keyword?)]
subjects
years
</pre>
<?php 
$jsonFileContents = file_get_contents("../src/data/content.json");
$allData = json_decode($jsonFileContents, true);

$dates = array();
$decades = array();
$decadeSearcher = array();

$allItems = file_get_contents('items.json');
$allItemsData = json_decode($allItems, true);
$collections = array(
    7 => array(
        "id"=> 7,  
        "name"=> "Transcribing Modern Manuscripts",
        "items"=> array()
    ),
    14 => array(
        "id"=> 14, 
        "name"=> "Diaries",
        "items"=> array()
    ),
    15 => array(
        "id"=> 15, 
        "name"=> "Letters",
        "items"=> array()
    ),
    16 => array(
        "id"=> 16, 
        "name"=> "Everett D. Graff Collection of Western Americana",
        "items"=> array()
    ),
    17 => array(
        "id"=> 17, 
        "name"=> "Edward E. Ayer Collection",
        "items"=> array()
    ),
);
foreach ($allData as $a) {
    $coll = $a["coll"][0];
    array_push($collections[$coll]["items"], $a["id"]);
    array_push($dates, $a["startDate"], $a["endDate"]);

}
foreach ($dates as $d) {
    $startDec = floor($d / 10) * 10;
    $startDec != 0 ? array_push($decades, $startDec) : '';
    // echo $startDec . ' - ' . $d . ' - ' . $endDec . '<br />';
    // echo $d[0] . ' - ' . $d[1] . '<br />';
}
$decades = array_unique($decades);
sort($decades);
foreach ($decades as $dec) {
    $tempDec = [
        "date" => $dec,
        "items" => []
    ];
    foreach ($allData as $a) {
        
        if ($a["startDate"] <= $dec + 9 and $a["endDate"] >= $dec) {
            array_push($tempDec["items"], $a["id"]);
        }
    }
    array_push($decadeSearcher, $tempDec);
    // startDate) <= maxDate && parseInt(endDate) >= minDate)
    // echo $dec . '<br />';
}
foreach ($decadeSearcher as $dS){
    echo '<dl style="border: 1px solid black; margin: 15px;"><dt>' . $dS["date"] . '</dt>';
    foreach ($dS["items"] as $i){
        echo '<dd>' . $i . '</dd>';
    }
    echo '</dl>';
}
// foreach ($collections as $c) {
//     echo '<div style="border: 1px solid black; margin: 10px">' . $c["name"] . ': ' . '<br/>';
//     foreach ($c["items"] as $i) {
//         echo $i . '<br>';
//     }
//     echo '</div>';
// }


$collectionsJson = json_encode($collections);
$decadesJson = json_encode($decadeSearcher);
file_put_contents('../src/data/collections.json', $collectionsJson);
file_put_contents('../src/data/decades.json', $decadesJson);


?>
ok!