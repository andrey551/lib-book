<?php
require "jwt.php";

$jwtSlave = new jwtOBJ();
$data = $_GET['token'];
echo json_encode(array($jwtSlave->toArray($data)['data']));
?>