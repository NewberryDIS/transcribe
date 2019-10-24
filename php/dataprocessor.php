<style>* {font-family: monospace;}</style>
<pre>
search [name, date (, keyword?)]
subjects
years
</pre>
<?php 
$jsonFileContents = file_get_contents("content.json");
$allData = json_decode($jsonFileContents, true);

$subjects = array();
$decades = array();

foreach ($allData as $a) {
    foreach ( $a["subjects"] as $s) {
        if (array_key_exists($s, $subjects)) {
            array_push($subjects[$s], $a["name"]);
        } else {
            $subjects[$s] = $a["name"];
        }
    }
}
foreach ($subjects as $s){
    echo $s["subj"] . ': <br />';
    foreach ($s["items"] as $i){
        echo $i . '<br />';
    }
}
?>
ok!