<?php
    $host = "localhost"; // MySQL server hostname
    $username = "root"; // MySQL username
    $database = "csc_415_calculator"; // MySQL database name
    
    $con = mysql_connect($host, $username) or die(mysql_error());
    mysql_select_db($database) or die("Cannot select db");
?>