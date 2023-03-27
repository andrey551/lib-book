<?php
require "../Role/role.php";
    header("Access-Control-Allow-Origin: * ");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


    $databaseServices = new ConnectionHandle();
    $conn = $databaseServices->setupConnection();
    $table_name = "userlist";
    $REQUEST_METHOD = $_SERVER['REQUEST_METHOD'];
    $headers = apache_request_headers();
    if(!isset($headers['Authorization'])) die;
    $token = $headers['Authorization'];
    if($token == NULL) die;
    $role = new role();
    switch($REQUEST_METHOD) {
        case "POST":
            if(!$role->isAdmin($token)) {
                http_response_code(401);
                die;
            }
            $data = json_decode(file_get_contents("php://input"));
            $query = "INSERT INTO ".$table_name." (USERNAME, PASSWORD, FULLNAME, EMAIL, AVATAR) VALUES ('"
                    .$data->username."', '".password_hash($data->password, PASSWORD_BCRYPT)
                    ."', '".$data->fullname."', '".$data->email."', '".$data->avatar."')";
            $stmt = $conn->prepare($query);

            if($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "User was added registered!"));
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "unable to add the user!"));
            }
            break;
        case "GET":
            if(!$role->isUser($token) && !$role->isAdmin($token)) {
                http_response_code(401);
                echo json_encode(array("message" => "Cannot add your comment!"));
                die;
            }
            if(isset($_GET['name']))
                $data = $_GET['name'];
            else  $data = NULL;
            if($data != NULL) {
                $query = "SELECT * FROM ".$table_name." WHERE USERNAME = '".$data."';";
            } else {
                if(!$role->isAdmin($token)) {
                    http_response_code(401);
                    die;
                }
                $query = "SELECT * FROM ".$table_name.";";
            }
            $stmt = $conn->query( $query);
            $num = $stmt->num_rows;
            $res = [];
            while($num > 0 ) {
                $row = $stmt->fetch_assoc();
                array_push($res,(object) array(
                    "id"=> $row['ID'],
                    "username"=> $row['USERNAME'],
                    "fullname"=> $row['FULLNAME'],
                    "password"=> $row['PASSWORD'],
                    "email"=> $row['EMAIL'],
                    "avatar"=>$row['AVATAR']
                ));
                --$num;
            }
            http_response_code(200);
            echo json_encode($res);
            break;
        case "PUT":
            if($role->isAdmin($token)) {
                $data = json_decode(file_get_contents("php://input"));
                $query = "UPDATE ".$table_name." SET USERNAME ='".
                $data->username."', PASSWORD = '".password_hash($data->password, PASSWORD_BCRYPT).
                "', FULLNAME='".$data->fullname."', EMAIL = '"
                .$data->email."', AVATAR = '".$data->avatar."' "
                ."WHERE ID = 1";
    
                $stmt = $conn->prepare($query);
    
                if($stmt->execute()) {
                    http_response_code(200);
                    echo json_encode(array("message" => "User was updated information!"));
                } else {
                    http_response_code(400);
                    echo json_encode(array("message" => "unable to updated information!"));
                }
            } else if($role->isUser($token)) {
                $id = $role->isUser($token);
                $data = json_decode(file_get_contents("php://input"));
                $query = "UPDATE ".$table_name." SET USERNAME ='".
                $data->username."', PASSWORD = '".password_hash($data->password, PASSWORD_BCRYPT).
                "', FULLNAME='".$data->fullname."', EMAIL = '"
                .$data->email."', AVATAR = '".$data->avatar."' "
                ."WHERE ID = ".$id;
    
                $stmt = $conn->prepare($query);
    
                if($stmt->execute()) {
                    http_response_code(200);
                    echo json_encode(array("message" => "User was updated information!"));
                } else {
                    http_response_code(400);
                    echo json_encode(array("message" => "unable to updated information!"));
                }
            } else {
                http_response_code(401);
                    echo json_encode(array("message" => "unable to updated information!"));
            }

            break;
        case "DELETE":
            if(!$role->isAdmin($token)) {
                http_response_code(401);
                die;
            }
            $data = $_REQUEST['id'];
            $query = "DELETE FROM ".$table_name." WHERE ID = ".$data;
            
            $stmt = $conn->prepare($query);

            if($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "User was deleted!"));
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "unable to delete user!"));
            }
            break;
        default:
            http_response_code(401);
            echo "<3";
    }
?>