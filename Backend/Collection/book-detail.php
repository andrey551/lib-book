<?php
require "../Role/role.php";
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

    $databaseServices = new ConnectionHandle();
    $conn = $databaseServices->setupConnection();
    $REQUEST_METHOD = $_SERVER['REQUEST_METHOD'];
    switch($REQUEST_METHOD) {
        case "GET":
            if($role->isUser($token) == NULL) {
                http_response_code(400);
                die;
            }
            $table_name = "books";
            $name = $_GET["name"];
            $query = "SELECT * FROM ".$table_name." WHERE TITLE = '".$name."'";
            $stmt = $conn->query( $query);
            $num = $stmt->num_rows;
            $res = [];
            if($num > 0 ) {
                $row = $stmt->fetch_assoc();
                array_push($res,(object) array(
                    "id"=> $row['ID'],
                    "title"=> $row['TITLE'],
                    "author"=> $row['AUTHOR'],
                    "price"=> $row['PRICE'],
                    "description"=> $row['DESCRIPTION'],
                    "image"=>$row['IMAGE']
                ));
            }
            $comments = [];
            $query = "SELECT * FROM COMMENT WHERE BOOK_NAME = '".$name."'";
            $stmt = $conn->query( $query);
            $num = $stmt->num_rows;
            while($num > 0 ) {
                $row = $stmt->fetch_assoc();
                array_push($comments,(object) array(
                    "user_name"=> $row['USERNAME'],
                    "comment"=> $row['COMMENT']

                ));
                --$num;
            }

            array_push($res, $comments);
            echo json_encode(array($res));
            break;
        case "POST":
            if(!$role->isUser($token)) {
                http_response_code(400);
                echo json_encode(array("message" => "Cannot add your comment!"));
                die;
            }
            $data = json_decode(file_get_contents("php://input"));
            $book_name = $data->bookname;
            $username = $data->username;
            $comment = $data->comment;
            $query = "INSERT INTO COMMENT(BOOK_NAME, USERNAME, COMMENT) VALUES ('"
            .$book_name."', '".$username."', '".$comment."')";
            $stmt = $conn->prepare($query);

            if($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "Added your comment"));
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "Cannot add your comment!"));
            }
            break;
    }


?>