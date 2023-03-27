<?php
include_once "../../vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\BeforeValidException;
use Firebase\JWT\ExpiredException;

class jwtOBJ {
    private static $jwt;
    private static $arr;
        static function toJWT($data) {
            $secret_key = "hello mother fucker";
            $issuer_claim = "localhost"; //this can be  the server name
            $audience_claim = "THE_AUDIENCE";
            $issuedat_claim = time();
            $notbefore_claim = $issuedat_claim - 10;
            $expire_claim = $issuedat_claim + 23600;
            $token = array(
                "iss" => $issuer_claim,
                "aud" => $audience_claim,
                "iat" => $issuedat_claim,
                "nbf" => $notbefore_claim,
                "exp" => $expire_claim,
                "data" => $data
                );
            $jwt = JWT::encode($token, $secret_key, 'HS256');
            return $jwt;
        }

        static function toArray($jwtStr) {
            try{
                $secret_key = "hello mother fucker";
                $arr = JWT::decode($jwtStr, new Key($secret_key, 'HS256'));
                return (array)$arr;
            } catch (ExpiredException $e) {
                return NULL;
            } catch (InvalidArgumentException $e) {
                return NULL;
            }

        }
    }
?>