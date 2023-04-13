<?php

class FivegData {

    private $CONFIG;
    function __construct() {
        $filepath = "config/config.php";
        if(file_exists($filepath))
        {
            require_once($filepath);
            $conf = new Config();
            $CONFIG=$conf->getConfig();
        }
        //$CONFIG = parse_ini_file('config/config.ini', true) OR die('Missing or unreadable config/config.ini');
        $this->api_base_url = $CONFIG['apis']['server'];
    }

    function getData($endPoint, $data=[], $type="") {
        

        $url = $this->api_base_url.$endPoint;
        // if($endPoint === "restart_demo"){
        //     $url = 'http://99.76.230.51:5001/restart_demo';
        // }
        $response = $this->fetchDataFromAPI($url, $data, $type);
        return $response;

    }

    function fetchDataFromAPI($url, $data, $type){

        // print_r($url);
        // print_r($data);
        // print_r($type); exit();

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_USERAGENT, "MozillaXYZ/1.0");
        
        if($type == "post"){
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        } else if($type == "delete"){
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        } else if($type === "put"){
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        }
        
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        //curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2); 
        //curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        
        $headers = array();
        // $headers[] = 'Content-Type: application/json';
        $headers[] = 'mimeType: multipart/form-data';
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $response = curl_exec($ch);
        // print_r($response);
        if ($response === false) {
            curl_close($ch);
            print_r($data);
            throw new Exception("Five-G API has Error", 404);
        }
        else{
            curl_close($ch);
            return json_decode($response, true);
        }
    }
}

?>