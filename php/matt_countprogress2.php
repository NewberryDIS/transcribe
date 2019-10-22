<?php
$bothcounts = array();
function get_percentage($total, $number)
{
  if ( $total > 0 ) {
   return round($number / ($total / 100),2);
  } else {
    return 0;
  }
}
$colls = array("http://publications.newberry.org/transcription");
foreach ($colls as $c) {
$needsReview = 0;
$totals = array();
$totalsforboth = array();
$url = $c;
$items = file_get_contents($url . '/api/items?collection=3');
$itemdata = json_decode($items, true);
$counts = array();
$urls = array();
foreach ($itemdata as $i) {
	$count = (int)$i["files"]["count"];	
	$fileurl = $i["files"]["url"];
	print $count . '<br />';
	array_push($counts,$count);
	array_push($urls,$fileurl);
}	
array_push($totals, array_sum($counts));
$texts = 0;
// echo array_sum($totals) . '<br />';
array_push($totalsforboth,array_sum($totals));
foreach ($urls as $u) {
	$itemid = str_replace($c . "/api/files?item=","",$u);
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
		}
		
	}
		
	}
}
echo $needsReview . "\r\n";
echo array_sum($totalsforboth);



$pct = get_percentage(array_sum($totalsforboth),$needsReview);

$countjson = array(
'needsreview' => $needsReview,
'total' => array_sum($totalsforboth),
'percentdone' => $pct
);
array_push($bothcounts,$countjson);
};
$bjson = json_encode($bothcounts);
file_put_contents('/home/newberry/webapps/scalar2/mms-transcribe/countdata2.json', $bjson);

?>