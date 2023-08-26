<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $session_id = session_id();

    // Database connection (modify with your actual database details)
    $servername = "localhost";
    $username = "favour";
    $password = "csc415calculator$";
    $dbname = "csc415calculator";
    $tablename = "history";
    $conn = new mysqli($servername, $username, $password, $dbname);
    $error = "";
    $message = "";
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error . "\n");
    }

    // Query to check if the table exists
    $query = "SHOW TABLES LIKE '$tablename'";

    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        // Query to retrieve all rows and columns from the table
        $query = "SELECT * FROM $tablename WHERE user_session_id = '$session_id' ORDER BY id DESC LIMIT 10";

        $result = $conn->query($query);

        if ($result) {
            if ($result->num_rows > 0) {
                // Loop through each row
                while ($row = $result->fetch_assoc()) {
                    $id = $row["id"];
                    $pNum1 = $row["num1"];
                    $pOperator = $row["operator"];
                    $pNum2 = $row["num2"];
                    $pResult = $row["result"];
                    
                    // Do something with the data
                    $message .= "<div class='flex items-center gap-6'><div class='flex flex-col'>$pNum1</div><span>$pOperator</span><div>$pNum2</div><span>=</span><div>$pResult</div></div>";
                }
            } else {
                $message = "<div class='mt-4'>There is no calculation record yet.</div>"; // Table is empty
            }
        } else {
            $error = "Query failed: $conn->error";
        }
    } else {
        $message = "<div class='mt-4'>There is no calculation record yet.</div>"; // Table does not exist
    }

    // Success message
    $response = array(
        "status" => "success",
        "message" => $message,
        "error" => $error
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
?>