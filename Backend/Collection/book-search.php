<?php
require "../Role/role.php";
// require "../Collection/utils.php";
include_once "../../vendor/autoload.php";
use Firebase\JWT\JWT;

    header("Access-Control-Allow-Origin: * ");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    $headers = apache_request_headers();
    if(!isset($headers['Authorization'])) die;
    $token = $headers['Authorization'];
    $role = new role();
    if($token == NULL) die;
    $databaseServices = new ConnectionHandle();
    $conn = $databaseServices->setupConnection();
    $REQUEST_METHOD = $_SERVER['REQUEST_METHOD'];
    if($REQUEST_METHOD == "GET") {
        if(!$role->isUser($token)) {
            http_response_code(400);
            echo json_encode(array("message" => "Cannot add your comment!"));
            die;
        }
        $search_pattern = $_GET['search'];
        $query = "SELECT * FROM books WHERE TITLE LIKE '%".$search_pattern."%'";
        $stmt = $conn->query( $query);
        $num = $stmt->num_rows;
        $res = [];
        while($num > 0 ) {
            $row = $stmt->fetch_assoc();
            array_push($res,(object) array(
                "id"=> $row['ID'],
                "title"=> $row['TITLE'],
                "author"=> $row['AUTHOR'],
                "price"=> $row['PRICE'],
                "description"=> $row['DESCRIPTION'],
                "image"=>$row['IMAGE']
            ));
            --$num;
        }
        http_response_code(200);
        echo json_encode($res);
    }
?>