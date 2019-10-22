<?php 
$needsReview = 0;
$totals = array();
$totalsforboth = array();
$url = "http://publications.newberry.org/transcription/mms-transcribe";
$items = file_get_contents($url . '/api/items/');
$itemdata = json_decode($items, true);
$counts = array();
$urls = array();
$contentArray = array();
foreach ($itemdata as $k=>$i) {
	$count = (int)$i["files"]["count"];
	$fileurl = $i["files"]["url"];
	array_push($counts,$count);
	array_push($urls,$fileurl);
	$subjects = $array();
	$desc = '';
	$image = '';
	foreach ($i[element_texts] as $e){
		if ($e["element"]["name"] === 'Subject') {$subjects.push($e["text"])}
		if ($e["element"]["name"] === 'Relation') {$desc = $e["text"]}
		if ($e["element"]["name"] === 'Source') {$image = $e["text"]}
	};
	$[$i.id] = array(
		id: $i["id"],
		subject: $subject,
		desc: $desc,
		image: $image
	);
	$contentArray.array_push($[$i[id]]);
}	
array_push($totals, array_sum($counts));

// echo array_sum($totals) . '<br />';
array_push($totalsforboth,array_sum($totals));
foreach ($urls as $u) {
	$itemid = str_replace("http://publications.newberry.org/transcription/mms-transcribe/api/files?item=","",$u);
	// echo $u . '<br />';
	$files = file_get_contents($u);
	$filesdata = json_decode($files, true);
	foreach ($filesdata as $f) {
	$et = $f["element_texts"];
	// echo '<br />' . $et . '<br />' ;
	// echo $et[0]["text"] . '<br />';
	foreach ($et as $e) {
		if ($e["element"]["name"] == "Status" and $e["text"] == ("Needs Review" or "Incomplete" or "Complete")) {
				$needsReview++;
				$contentArray[$f["id"]].push(Status=>$e["text"])
		}
		
	}
		
	}
}
echo $needsReview;


function get_percentage($total, $number)
{
  if ( $total > 0 ) {
   return round($number / ($total / 100),2);
  } else {
    return 0;
  }
}

$pct = get_percentage(array_sum($totalsforboth),$needsReview);

$countjson = array(
'needsreview' => $needsReview,
'total' => array_sum($totalsforboth),
'percentdone' => $pct
);
$bothArray = array($countjson, $contentArray)
$countjson = json_encode($countjson);
file_put_contents('/home/newberry/webapps/scalar2/mms-transcribe/countdata.json', $bothArray);

?>