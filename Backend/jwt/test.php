<?php
require "../Role/role.php";

$roleSlave = new role();
$data = $_GET['token'];
$res = $roleSlave->isUser($data) == NULL ? "yes" : "no";
echo $res;
?>