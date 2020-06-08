<?php
$json = file_get_contents('https://cors-anywhere.herokuapp.com/http://publications.newberry.org/transcription/mms-transcribe/api/items');
$array = json_decode($json);
foreach ($array as $value) {
  echo "<li id='" . $value[id] . "'>" . $value[id] . "</li>";
}
?>
asdf
b 