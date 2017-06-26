<?php
// Check if the correct get request has been recieved to process a new message
if(isset($_GET["newMessage"]))
{
	// Create a variable that holds the INSERT query
	$insertQuery = "INSERT INTO messages (`message_id`, `message_text`, `time_stamp`) VALUES (\"" . $_GET["getMessagesAfterLine"] . "\", \"" . $_GET["newMessage"] . "\", NOW())";
	// Create PDO login credentials for host, db name, user name, and user password
	$db_host = "localhost";
    $db_name = "midterm";
    $db_user = "root";
    $db_password = "root";
	// Connect to mySQL DB with a PDO connection
	$pdo_link = new PDO("mysql:host=$db_host;dbname=$db_name",$db_user,$db_password);
	// Execute the INSERT query
	$pdo_link->query($insertQuery);
	// Close link to PDO connection
	$pdo_link = NULL;
}

?>








