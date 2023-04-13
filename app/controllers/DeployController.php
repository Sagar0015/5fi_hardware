<?php
/******************************************************************************************
File : DeployController.php
Author :  Mahaboob Basha Shaik
******************************************************************************************/

include_once("app/services/FivegData.php");

 class DeployController extends Controller {
    
    /**
     * Constructor
     * @param object $globalVariables : Having all the global variables and functions
     * @param object $session : To store all session related set and get from session variables.
     * @param object $database : Database instance to have all database methods
     * @return object  Description
     */
    function __construct($globalVariables, $session){
        parent::__construct($globalVariables,$session);

        $this->fivegService = new FivegData();
    }

    function getCNList(){

        $apiResponse = $this->fivegService->getData("CN_list", []);

        $response = [];
        if($apiResponse && $apiResponse["CN_List"]){
            $response = $apiResponse["CN_List"];
        }

        foreach ($response as $key => $value) {

            $temp = $value;
            if($value["name"] == "OAI"){
                $temp["logo"] = "OAI.png";
            } else if($value["name"] === "free5GC"){
                $temp["logo"] = "free5GC.png";
            } else if($value["name"] === "Azure Private 5G Core"){
                $temp["logo"] = "Azure Private 5G Core.svg";
            } else if($value["name"] === "Nokia"){
                $temp["logo"] = "nokia.svg";
            } else if($value["name"] === "Open5GS"){
                $temp["logo"] = "Open5GS.png";
            }
            $response[$key] = $temp;
        }

        $results = Array("status" => true, "data" => $response);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function getRANList(){

        $apiResponse = $this->fivegService->getData("RAN_list", []);
        
        $response = [];
        if($apiResponse && $apiResponse["RAN_List"]){
            $response = $apiResponse["RAN_List"];
        }
        
        foreach ($response as $key => $value) {

            $temp = $value;
            if($value["name"] == "OAI"){
                $temp["logo"] = "OAI.png";
            } else if($value["name"] === "UERANSIM"){
                $temp["logo"] = "UERANSIM.png";
            } else if($value["name"] === "Baicells"){
                $temp["logo"] = "baicells.svg";
            } else if($value["name"] === "Nokia"){
                $temp["logo"] = "nokia.svg";
            }
            $response[$key] = $temp;
        }
        
        $results = Array("status" => true, "data" => $response);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function deplayNetwork(){

        $data = array(
            "CN_Make" => $_REQUEST["cn_make"],
            "CN_Quantity" => $_REQUEST["cn_quantity"],
            "RAN_Make" =>  $_REQUEST["ran_make"],
            "RAN_Quantity" =>  $_REQUEST["ran_quantity"],
            "name" => $_REQUEST["name"],
            "company" => $_REQUEST["company"],
            "Cameras_Make" => "OAI",
            "Cameras_Quantity" => 0,
            "Sensors_Make" => "OAI",
            "Sensors_Quantity" => 0,
            "AGVs_Make" => "OAI",
            "AGVs_Quantity" => 0,
            "Actuators_Make" => "OAI",
            "Actuators_Quantity" => 0,
            "Others_Make" => "OAI",
            "Other_Quantity" => 0
        );

        // $devices_info = json_decode($_REQUEST["devices_info"], true);
        // foreach ($devices_info as $key => $value) {
        //     $data[$value["name"]."_Make"] = isset($value["selectedMake"]["value"]) ? $value["selectedMake"]["value"] : 0;
        //     $data[$value["name"]."_Quantity"] = isset($value["numberOfDevices"]) ? $value["numberOfDevices"] : 0;
        // }        
        $url_params = http_build_query($data);
        $apiResponse = $this->fivegService->getData("deploy_scenario/?".$url_params, []);
        
        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

 }
?>
