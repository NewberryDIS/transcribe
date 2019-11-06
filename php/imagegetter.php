<?php 
$items = file_get_contents('content.json');
$itemdata = json_decode($items, true);
$images = array();
$imgstring  = '';
foreach ($itemdata as $i){
    $image = $i["image"];
    $imgstring .= $image . '\n';
    // array_push($images, $image);
    // echo $image . '<br />';
}
file_put_contents('imagesfile.txt', $imgstring);
// var_export($images);
?>