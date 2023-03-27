<?php

require "../Database/connectionHandle.php";
require "../jwt/jwt.php";
include_once "../../vendor/autoload.php";
use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$databaseServices = new ConnectionHandle();
$conn = $databaseServices->setupConnection();
$jwtSlave = new jwtOBJ();


$data = json_decode(file_get_contents("php://input"));

$fullname = $data->username;
$password = $data->password;

$table_name = 'userlist';

$query = "SELECT * FROM ".$table_name . " WHERE username = '" . $fullname."'";

$stmt = $conn->query( $query);
$num = $stmt->num_rows;

if($num > 0) {

    $row = $stmt->fetch_assoc();
    $id = $row['ID'];
    $username = $row['USERNAME'];
    $email = $row['EMAIL'];
    $fullname = $row["FULLNAME"];
    $password2 = $row['PASSWORD'];
    $data = array(
        "id" => $id,
        "username" => $username,
        "password"=> $password
    );
    if(password_verify($password, $password2)) {
        $jwt = $jwtSlave->toJWT($data);
            http_response_code(200);
            echo json_encode(
                array(
                    "message" => "successful login.",
                    "jwt" => $jwt,
                    "email" => $email,
                    "username"=>$username
                )
            );
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Login failed", "password" => $password));
        }
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Login failed"));
    }

?>
