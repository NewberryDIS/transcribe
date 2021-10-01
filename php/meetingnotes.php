<?php
$servername = "localhost";
$databaseO = "nt_omeka_210527";
$databaseW = "nt_wiki_210527";
$username = "nt_user";
$password = "asdf";
// Create connection
$connO = mysqli_connect($servername, $username, $password, $databaseO);
$connW = mysqli_connect($servername, $username, $password, $databaseW);
// Check connection

if (!$connO || !$connW) {
  die("Connection failed: " . mysqli_connect_error());
}
$cardArray = array();
    // echo var_dump($returnArray);
$itemArray = array();

if (isset($_GET['itemid'])){
    $sqlquery = 'SELECT id, item_id, filename FROM omeka_files WHERE item_id = ' . $_GET['itemid'] . ';';

    $result = mysqli_query($connO, $sqlquery);
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
        $itemArray[] = $row;
        $transcribeQuery = 'SELECT text FROM omeka_element_texts WHERE element_id = 52'
        $transcriptResult = mysqli_query($connO, $transcribeQuery);
        if ($transcriptResult.length > 0) {
            $itemArray['complete']  = true
        }
    }
    echo json_encode($itemArray);
  } else {
    // echo "<script>console.log('" . $sqlquery . "')</script>";
    // echo "<script>console.log('No results.')</script>";
  }
} else {

$lang = $_GET['lang'];
$code = $_GET['code'];
$date1 = $_GET['date1'];
$date2 = $_GET['date2'];
$text = $_GET['text'];
// echo "<script>console.log('" . $lang . "')</script>";

if (isset($_GET['lang']) && !empty($_GET['lang'])) {
  $langQuery='ID IN (SELECT item_id FROM langlink WHERE lang_id IN (SELECT lang_id FROM Langs WHERE lang LIKE "%' . $lang . '%"))';
} else {
  $langQuery='ID LIKE "%"';
}

if (isset($_GET['code']) && !empty($_GET['code'])) {
  $codeQuery='ID IN (SELECT item_id FROM codelink WHERE code_id IN (SELECT code_id FROM Codes WHERE code = "' . $code . '"))';
} else {
  $codeQuery='ID LIKE "%"';
}

$sqlquery = 'SELECT * FROM Items WHERE ' . $langQuery . ' AND ' . $codeQuery . ' AND Content LIKE "%' . $text . '%" AND DateYear BETWEEN ' . $date1 . ' AND ' . $date2 . ' LIMIT 0,100;';

$result = mysqli_query($conn, $sqlquery);
$returnArray = array();
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
      $row["ID"] = utf8_encode($row["ID"]);
      $row["Content"] = utf8_encode($row["Content"]);
      $row["DateFull"] = utf8_encode($row["DateFull"]);
      $row["DateText"] = utf8_encode($row["DateText"]);
      $row["DateYear"] = utf8_encode($row["DateYear"]);
      $row["Title"] = utf8_encode($row["Title"]);
      $row["TopTitle"] = utf8_encode($row["TopTitle"]);
      $row["languages"] = utf8_encode($row["languages"]);
      $row["Codes"] = utf8_encode($row["Codes"]);
      $row["ContentArray"] = utf8_encode($row["ContentArray"]);
      $returnArray[] = $row;
    }

    // echo var_dump($returnArray);
    echo json_encode($returnArray);
  } else {
    // echo "<script>console.log('" . $sqlquery . "')</script>";
    // echo "<script>console.log('No results.')</script>";
  }
}
mysqli_close($conn);

?>

