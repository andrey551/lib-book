<?php
require "../Database/connectionHandle.php";

    header("Access-Control-Allow-Origin: * ");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $username = '';
    $email = '';
    $password = '';
    $conn = null;

    $databaseServices = new ConnectionHandle();
    $conn = $databaseServices->setupConnection();

    $data = json_decode(file_get_contents("php://input"));

    $username = $data->username;
    $email = $data->email;
    $password= $data->password;
    $fullname=$data->fullname;

    $table_name = 'userlist';

    $query = "INSERT INTO " . $table_name . " (username, email, fullname, password) VALUES ('".$username."', '".$email."', '".$fullname."', '". password_hash($password, PASSWORD_BCRYPT)."')";

    $stmt = $conn->prepare($query);

    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("message" => "User was successfully registered!"));
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "unable to register the user!"));
    }
?>