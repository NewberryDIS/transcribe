<?php 
$items = file_get_contents('content.json');
$itemdata = json_decode($items, true);
$images = array();
$imgstring  = '';
foreach ($itemdata as $i){
    $image = $i["image"];
    $image != '' ? $imgstring .= $image . PHP_EOL : '';
}
file_put_contents('imagesfile.txt', $imgstring);
?>