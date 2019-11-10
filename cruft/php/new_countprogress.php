<style>td {border: 1px solid black;}</style><?php 
$url = "http://publications.newberry.org/transcription/mms-transcribe/api/items/";
// $url = "../src/data/items.json";
$items = file_get_contents($url);
$itemdata = json_decode($items, true);
$contentArray = array();
$counts = array();
$urls = array();
foreach ($itemdata as $i) {
	$fileurl = $i["url"];
	array_push($urls,$fileurl);
}
// echo array_sum($totals) . '<br />';
// array_push($totalsforboth,array_sum($totals));
$iterator = 0;
foreach ($urls as $u) {
	$iterator++;
	// echo $iterator . '. ' . $u . "<br />";
	$itemid = str_replace("http://publications.newberry.org/transcription/mms-transcribe/api/items/","",$u);
	$files = file_get_contents($u);
	$filesdata = json_decode($files, true);
	// echo  $iterator . '. ' . $filesdata["id"] . ': ' . $filesdata["files"]["count"] . '<br />';
	$count = (int)$filesdata["files"]["count"];
	array_push($counts,$count);
	// 	$et = $f["element_texts"];
	$id = $filesdata["id"];
	$subject = '';
	$desc = '';
	$image = '';
	$name = '';
	$status = '';
	$pc = '';
	$pnr = '';
	$weight = '';
	foreach ($filesdata["element_texts"] as $e) {
		if ($e["element"]["name"] == "Status" and $e["text"] == ("Needs Review" or "Incomplete" or "Complete")) $status =  $e["text"];
		if ($e["element"]["name"] === "Subject") {$subject .= $e["text"]; echo $e["text"];}
		if ($e["element"]["name"] === "Relation") {$desc = $e["text"]; echo $e["text"];}
		if ($e["element"]["name"] === "Source") {$image = $e["text"]; echo $e["text"];}
		if ($e["element"]["name"] === "Title") {$name = $e["text"]; echo $e["text"];}
		if ($e["element"]["name"] === "Percent Complete") {$pc = $e["text"]; echo $e["text"];}
		if ($e["element"]["name"] === "Percent Needs Review") {$pnr = $e["text"]; echo $e["text"];}
		if ($e["element"]["name"] === "Weight") {$weight = $e["text"]; echo $e["text"];}
	}
	$thisone = [
		"id" => $itemid,
		"subjects" => $subject,
		"desc" => $desc,
		"image" => $image,
		"name" => $name,
		"apiurl" => $fileurl,
		"status" => $status,
		"pc" => $pc,
		"pnr" => $pnr,
		"weight" => $weight
	];
	array_push($contentArray, $thisone);
}



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
// $countjson = json_encode($countjson);
// file_put_contents('/home/newberry/webapps/scalar2/mms-transcribe/countdata.json', $bothArray);
// var_dump($bothArray)
?>
<table>
<?php 
foreach ($contentArray as $c){
	echo '<tr><td>' . $c["id"] . '</td>' .
		'<td>' . $c["subjects"] . '</td>' .
		'<td>' . $c["desc"] . '</td>' .
		'<td>' . $c["image"] . '</td>' .
		'<td>' . $c["name"] . '</td>' .
		'<td>' . $c["apiurl"] . '</td>' .
		'<td>' . $c["status"] . '</td>' .
		'<td>' . $c["pc"] . '</td>' .
		'<td>' . $c["pnr"] . '</td>' .
		'<td>' . $c["weight"] . '</td></tr>';}
	?>
		</table>