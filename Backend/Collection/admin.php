<?php

require "../Database/connectionHandle.php";
include_once "../../vendor/autoload.php";
use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$databaseServices = new ConnectionHandle();
$conn = $databaseServices->setupConnection();

$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$password = $data->password;

$table_name = 'adminlist';

$query = "SELECT * FROM adminlist WHERE USERNAME = '" . $username."' AND PASSWORD = '".$password."'";

$stmt = $conn->query( $query);
$num = $stmt->num_rows;
if($num > 0) {
    $row = $stmt->fetch_assoc();
    $id = $row['ID'];
    $username = $row['USERNAME'];
    $password2 = $row['PASSWORD'];
    if($password == $password2) {
        $secret_key = "hello mother fucker";
        $issuer_claim = "localhost"; //this can be  the server name
        $audience_claim = "THE_AUDIENCE";
        $issuedat_claim = time();
        $notbefore_claim = $issuedat_claim - 10;
        $expire_claim = $issuedat_claim + 3600;
        $token = array(
            "iss" => $issuer_claim,
            "aud" => $audience_claim,
            "iat" => $issuedat_claim,
            "nbf" => $notbefore_claim,
            "exp" => $expire_claim,
            "data" => array(
                "id" => $id,
                "username" => $username,
                "password" =>$password
            )
            );
            $jwt = JWT::encode($token, $secret_key, 'HS256');
            http_response_code(200);

            echo json_encode(
                array(
                    "message" => "successful login.",
                    "jwt" => $jwt,
                    "expireAt" => $expire_claim
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
