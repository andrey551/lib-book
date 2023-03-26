<?php
include_once "../../vendor/autoload.php";
require "../Role/role.php";
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
    $table_name = "books";
    $REQUEST_METHOD = $_SERVER['REQUEST_METHOD'];
    switch($REQUEST_METHOD) {
        case "POST":
            if(!$role->isAdmin($token)) {
                http_response_code(400);
                die;
            }
            $data = json_decode(file_get_contents("php://input"));
            $query = "INSERT INTO ".$table_name." (TITLE, AUTHOR, PRICE, DESCRIPTION,IMAGE) VALUES ('"
                    .$data->title."', '".$data->author
                    ."', '".$data->price."', '".$data->description."', '".$data->image."')";
            $stmt = $conn->prepare($query);

            if($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "Book added successfully!"));
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "unable to add the book!"));
            }
            break;
        case "GET":
            if(!$role->isUser($token) && !$role->isAdmin($token)) {
                http_response_code(400);
                echo json_encode(array("message" => "Cannot add your comment!"));
                die;
            }
            if(isset($_GET['name']))  $data = $_GET['name'];
            else $data = NULL;
            if($data != NULL) {
                $query = "SELECT * FROM ".$table_name." WHERE TITLE = '".$data."';";
            } else {
                $query = "SELECT * FROM ".$table_name.";";
            }
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
            break;
        case "PUT":
            if(!$role->isAdmin($token)) {
                http_response_code(400);
                die;
            }
            $data = json_decode(file_get_contents("php://input"));
            $query = "UPDATE ".$table_name." SET TITLE ='".
            $data->title."', AUTHOR = '".$data->author.
            "', PRICE='".$data->price."', DESCRIPTION = '"
            .$data->description."', IMAGE = '".$data->image."' "
            ."WHERE ID = ".$data->id.";";

            $stmt = $conn->prepare($query);

            if($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "Book was update successfully!"));
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "unable to update book!"));
            }
            break;
        case "DELETE":
            if(!$role->isAdmin($token)) {
                http_response_code(400);
                die;
            }
            $data = $_GET['id'];
            $query = "DELETE FROM ".$table_name." WHERE ID = ".$data;
            
            $stmt = $conn->prepare($query);

            if($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "book was deleted!"));
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "unable to delete book!"));
            }
            break;
        default:
            http_response_code(200);
            echo "<3";
    }
?>