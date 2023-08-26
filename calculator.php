<?php
session_start();    
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $session_id = session_id();

    // Database connection (modify with your actual database details)
    $servername = "localhost";
    $username = "favour";
    $password = "csc415calculator$";
    $dbname = "csc415calculator";
    $tablename = "history";
    $conn = connectDatabase($servername, $username, $password, $dbname);

    // Create table if it does not exist
    $sql = "CREATE TABLE IF NOT EXISTS $tablename (id INT AUTO_INCREMENT PRIMARY KEY, user_session_id VARCHAR(255) NOT NULL, num1 FLOAT, operator VARCHAR(10), num2 FLOAT, result FLOAT)";
    if ($conn->query($sql) === TRUE) {
        echo "Table found/created successfully\n";
    } else {
        echo "Error: " . $sql . "\n" . $conn->error . "\n";
    }

    // Process the POST data
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true); // true to decode as associative array

    $pNum1 = $data['pNum1'];
    $pNum2 = $data['pNum2'];
    $pOperator = $data['pOperator'];
    $pResult = $data['pResult'];

    // Insert data into a table (modify with your actual table name)
    $sql = "INSERT INTO history (user_session_id, num1, operator, num2, result) VALUES ('$session_id', '$pNum1', '$pOperator', '$pNum2', '$pResult')";
    if ($conn->query($sql) === TRUE) {
        echo "Data inserted successfully\n";
    } else {
        echo "Error: " . $sql . "\n" . $conn->error . "\n";
    }

    // Success message
    $response = array(
        "status" => "success",
        "message" => "Calculation performed successfully",
        "result" => $pNum1 . " " . $pOperator . " " . $pNum2 . " = " . $pResult
    );

    // Encode the response as JSON
    echo json_encode($response);

    // Close connection
    $conn->close();

} else {
    // Return a response indicating that the method is not allowed
    http_response_code(405);
    echo 'Method Not Allowed';
}

/**
 * connectDatabase - Opens a connection to a database
 * @servername: MySQL servername
 * @username: MySQL username
 * @password: MySQL password
 * @dbname: The database to connect to
 * 
 * returns: Returns a connection object
 */
function connectDatabase(string $servername, string $username, string $password, string $dbname) {
    // Create connection
    $conn = new mysqli($servername, $username, $password);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if the database exists
    $checkDbQuery = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$dbname'";
    $result = $conn->query($checkDbQuery);

    if ($result->num_rows === 0) {
        // The database does not exist, so create it
        $createDbQuery = "CREATE DATABASE $dbname";
        if ($conn->query($createDbQuery) === TRUE) {
            echo "Database created successfully\n";
            // Create a New Connection for the Created Database
            $conn = new mysqli($servername, $username, $password, $dbname);
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error . "\n");
            }
            return $conn;
        } else {
            echo "Error creating database: " . $conn->error . "\n";
        }
    } else {
        echo "Database already exists\n";
        // Create a New Connection for the Existing Database
        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error . "\n");
        }
        return $conn;
    }
}
?>
