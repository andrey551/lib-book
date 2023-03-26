<?php
class ConnectionHandle{
    private static $conn ;
    // Create connection

    public static function setupConnection() {
        self::$conn = mysqli_connect("localhost", "root", "05052001", "book-db");
        if (self::$conn->connect_error) {
            die("Connection failed: " . self::$conn->connect_error);
        }
        return self::$conn;
    }

    public static function getConnection () {
        return self::$conn;
    }

}


?>