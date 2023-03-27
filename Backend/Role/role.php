<?php
require "../jwt/jwt.php";
require "../Database/connectionHandle.php";
class role {
    static function isAdmin($token) {
        $databaseServices = new ConnectionHandle();
        $conn = $databaseServices->setupConnection();
        $jwtSlave = new jwtOBJ();
        $temp = $jwtSlave->toArray($token);
        $user = $temp;
        if($user['data'] != NULL) {
            $data = $user['data'];
            $username = $data->username;
            $password = $data->password;
            $query = "SELECT * FROM adminlist WHERE USERNAME = '".$username."' AND PASSWORD = '".$password."'";
            $stmt = $conn->query( $query);
            $num = $stmt->num_rows;
            if($num == 0) return NULL;
            else {
                $row = $stmt->fetch_assoc();
                return $row['ID'];
            };
        } else return NULL;
    }

    static function isUser($token) {
        $databaseServices = new ConnectionHandle();
        $conn = $databaseServices->setupConnection();
        $jwtSlave = new jwtOBJ();
        $temp = $jwtSlave->toArray($token);
        $user = $temp;
        if($user['data'] != NULL) {
            $data = $user['data'];
            $username = $data->username;
            $password = $data->password;
            $query = "SELECT * FROM userlist WHERE USERNAME = '".$username."'";
            $stmt = $conn->query( $query);
            $num = $stmt->num_rows;
            if($num == 0) return NULL;
            else {
                $row = $stmt->fetch_assoc();
                if(password_verify($password, $row['PASSWORD']))
                    return $row['ID'];
                else return NULL;
            };
        } else return NULL;
    }
}
?>