<?php
/******************************************************************************************
File : ManageController.php
Author :  Mahaboob Basha Shaik
******************************************************************************************/

include_once("app/services/FivegData.php");

 class ManageController extends Controller {
    
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

    function addSubscriber(){

        $data = [];
        $data["ueId"] = $_REQUEST["supi"];
        $data["opc_value"] = $_REQUEST["operator_code_value"];
        $data["authtype"] = $_REQUEST["auth_method"];
        $data["optype"] = $_REQUEST["operation_code_type"];
        $data["k"] = $_REQUEST["k"];
        $apiResponse = $this->fivegService->getData("manage_ran/subscribers", $data, "post");

        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function getSubscribers(){

        $containerId = $_REQUEST["options"];
        $apiResponse = $this->fivegService->getData("manage_ran/subscribers", []);

        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function deleteSubscriber(){

        $data = [];
        $data["ueId"] = $_REQUEST["ueId"];
        $apiResponse = $this->fivegService->getData("manage_ran/subscribers", $data, "delete");

        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function modifySubscriber(){

        $data = [];
        $data["ueId"] = $_REQUEST["newUeId"];
        $apiResponse = $this->fivegService->getData("manage_ran/subscribers/".$_REQUEST["ueId"], $data, "put");

        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function getAccessPoints(){

        $apiResponse = $this->fivegService->getData("manage_ran/list_ran_nodes", []);

        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function buildADemo(){

        $apiResponse = $this->fivegService->getData("restart_demo", []);

        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function suggestedActionsCore(){

        $apiResponse = $this->fivegService->getData("suggested_actions_core", []);

        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function executeSugAction(){

        $apiResponse = $this->fivegService->getData("execute_sug_action", []);

        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function getAppStats(){

        $apiResponse = $this->fivegService->getData("get_AppStats/?Input1=oai-ue1&Input2=oai-ue1&Output1=oai-ue1&Output2=oai-ue1", []);


        $data = [];
        $latency = isset($apiResponse["Latency"]) ? $apiResponse["Latency"] : [];
        $packetLoss = isset($apiResponse["Packet Loss"]) ? $apiResponse["Packet Loss"] : [];

        $packetLossKey = array();
        foreach ($packetLoss as $key => $value) {
            $packetLossKey[$value["x"]] = $value;
        }

        $statsData = array();
        foreach ($latency as $key => $value) {
            $temp = $value;
            $temp["Latency"] = $value["y"];

            if(isset($packetLossKey[$value["x"]]))
                $temp["Packet Loss"] = $packetLossKey[$value["x"]]["y"];
            else
                $temp["Packet Loss"] = 0;

            array_push($statsData, $temp);
        }

        $results = Array("status" => true, "data" => $statsData);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function ueDetails(){

        $apiResponse = $this->fivegService->getData("ApplicationDetails/?URL=temp", []);

        $data = [];
        foreach ($apiResponse as $key => $value) {
            if(isset($value["status"])){
                $temp = $value;
                $temp["name"] = $value["Application Name"];
            }
            array_push($data, $temp);
        }


        $results = Array("status" => true, "data" => $data);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function getApplicationUeList(){

        $apiResponse = $this->fivegService->getData("ue_details/", []);
        
        $ueList = [];
        $ueList = isset($apiResponse["ue_list"]) ? $apiResponse["ue_list"] : [];

        $data = [];
        foreach ($ueList as $key => $value) {
            $temp = $value;
            $temp["value"] = $value["Name_of_UE"];
            $temp["label"] = strtoupper($value["Name_of_UE"]);
            array_push($data, $temp);
        }

        $results = Array("status" => true, "data" => $data);
        $this->setOutputType("json");
        $this->setOutput($results);

    }


 }
?>
