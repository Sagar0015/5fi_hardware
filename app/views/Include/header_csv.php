<?php
header("Content-type: text/csv");
//header("Content-type: application/zip"); 
header("Content-Disposition: attachment; filename=file.csv");
header("Pragma: no-cache");
header("Expires: 0");
?>