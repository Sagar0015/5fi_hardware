<?php
/******************************************************************************************
File : MonitorController.php
Author :  Mahaboob Basha Shaik
******************************************************************************************/

include_once("app/services/FivegData.php");

 class MonitorController extends Controller {
    
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

    function getMonitorHome(){
        
        $apiResponse = $this->fivegService->getData("monitor_home", []);
        
        $listNFs = [];
        $gnbsUes = [];
        if($apiResponse && $apiResponse["List_NFs"]){
            foreach ($apiResponse["List_NFs"] as $key => $value) {

                $type = $value["type"];
                if(in_array($type, ["ue","gnb"])){

                    if(!$gnbsUes[$type]){
                        $gnbsUes[$type] = [];
                    }
                    array_push( $gnbsUes[$type], $value);

                } else {

                    if(!$listNFs[$type]){
                        $listNFs[$type] = [];
                    }
                    array_push( $listNFs[$type], $value);

                }

                
            }
        }
        $apiResponse["listNFs"] = $listNFs;
        $apiResponse["gnbsUes"] = $gnbsUes;
        
        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);
    }

    function getElementDetails(){

        $containerId = $_REQUEST["containerId"];
        $apiResponse = $this->fivegService->getData("monitor_nf/".$containerId, []);

        $apiResponse["NF_Logs"] = explode(PHP_EOL, $apiResponse["NF_Logs"]);

        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function getUEList(){

        $containerId = $_REQUEST["containerId"];
        $apiResponse = $this->fivegService->getData("uelist/".$containerId, []);

        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function prepareHanover(){

        $containerId = $_REQUEST["containerId"];
        $ueId = $_REQUEST["ueId"];
        $apiResponse = $this->fivegService->getData("handover_prepare/".$containerId.'?ueid='.$ueId, []);
        
        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function getPathSwitchList(){

        $apiResponse = $this->fivegService->getData("list_pathsw", []);
        
        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function submitPathSwitch(){

        $containerId = $_REQUEST["containerId"];
        $id = $_REQUEST["id"];
        $apiResponse = $this->fivegService->getData("pathsw/".$containerId.'?id='.$id, []);
        
        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function getNetworkStats(){
        
        $apiResponse = $this->fivegService->getData("get_NetworkStats/", []);
        $cnDetails = $this->fivegService->getData("cn_details/", []);
        $ranDetails = $this->fivegService->getData("ran_details/", []);
        
        $makeOfCN = ($cnDetails && $cnDetails["make_of_cn"]) ? $cnDetails["make_of_cn"] : [];
        $makeOfRAN = ($ranDetails && $ranDetails["make_of_ran"]) ? $ranDetails["make_of_ran"] : [];
        $cnStats = array_count_values($makeOfCN);
        $ranStats = array_count_values($makeOfRAN);

        $startsData = isset($apiResponse[1]) ? $apiResponse[1] : [];
        foreach ($startsData as $keyStat => $eachStat) {

            $dataProcessed = [];
            foreach ($eachStat as $key => $value) {
                $temp = $value;
                $temp["name"] = $value["x"];
                array_push($dataProcessed, $temp);
            }
            $startsData[$keyStat] = $dataProcessed;
        }


        $data = array(
            "stats" => isset($apiResponse[0]) ? $apiResponse[0] : [],
            "stats_data" => $startsData,
            "cn_details" => $cnDetails,
            "cn_stats" => $cnStats,
            "cn_count" => count($makeOfCN),
            "ran_details" => $ranDetails,
            "ran_stats" => $ranStats,
            "ran_count" => count($makeOfRAN),
        );

        $results = Array("status" => true, "data" => $data);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function getNetworkSummary(){
        
        $apiResponse = $this->fivegService->getData("get_NetworkSummary/", []);
       
        $response = array();
        $response["count_available_cells"] = $apiResponse["Number of Cells Available"];
        $response["count_active_cells"] = $apiResponse["Number of Cells Active"];
        $response["percentage"] = ($apiResponse["Number of Cells Active"]/$apiResponse["Number of Cells Available"])*100;
        $response["percentage_utilization"] = $apiResponse["Percentage Utilization"];


        $results = Array("status" => true, "data" => $response);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function getNetworkList(){
        
        $apiResponse = $this->fivegService->getData("Network_List", []);
       
        $response = array();
        $response["network_list"] = $apiResponse["Network_List"] ? $apiResponse["Network_List"] : [];

        $results = Array("status" => true, "data" => $response);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function inspectList(){
        
        $apiResponse = $this->fivegService->getData("Inspect_Details/", []);
       
        $response = array();

        $list = $apiResponse["Inspect_List"];
        $ids = $apiResponse["CID"];
        foreach ($list as $key => $value) {

            if($value != ""){
                $temp = array(
                    "content" => $value,
                    "id" => $ids[$key]
                );
                array_push($response, $temp);
            }
            
        }

        $results = Array("status" => true, "data" => $response);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function getLogs(){
        
        $id = $_REQUEST["id"];

        $apiResponse = $this->fivegService->getData("get_logs/<id>?id=".$id, []);

        $response = [];
        if(isset($apiResponse["nf_logs"][0])){
            $response = explode("\n", $apiResponse["nf_logs"][0]);
            $response = array_slice($response, 0, 500);
        }

        $results = Array("status" => true, "data" => $response);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function getConsole(){
        
        $id = $_REQUEST["id"];

        $apiResponse = $this->fivegService->getData("get_console/<id>?id=".$id, []);
        
        $response = [];
        if(isset($apiResponse["nf_console"][0])){
            $response = explode("\n", $apiResponse["nf_console"][0]);
            $response = array_slice($response, 0, 500);
        }

        $results = Array("status" => true, "data" => $response);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function getPackets(){
        
        $id = $_REQUEST["id"];

        $apiResponse = $this->fivegService->getData("get_packets/<id>?id=".$id, []);
        $response = [];
        
        if(isset($apiResponse[0]["packet data"])){
            $response = array_slice($apiResponse[0]["packet data"], 0, 500);
        }

        $results = Array("status" => true, "data" => $response);
        $this->setOutputType("json");
        $this->setOutput($results);

    }

    function getTerminals(){
        
        $id = $_REQUEST["id"];

        $apiResponse = $this->fivegService->getData("get_logs/<id>?id=".$id, []);
        
        $response = [];
        if(isset($apiResponse["nf_logs"][0])){
            $response = explode("\n", $apiResponse["nf_logs"][0]);
            $response = array_slice($response, 0, 500);
        }

        $results = Array("status" => true, "data" => $response);
        $this->setOutputType("json");
        $this->setOutput($results);

    }
    function demoLogin(){
        
        $username = $_REQUEST["username"];
        $password = $_REQUEST["password"];
        
        $apiResponse = $this->fivegService->getData("SignIn/".$username."?Password=".$password, []);

        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }
    function validateAp(){
 
        $apiResponse = $this->fivegService->getData("Validate_AP/", []);

        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }
  
    function getRanParameter(){
        $apiResponse = $this->fivegService->getData("GetRANParameters", []);

        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }
    function ranDeployment(){
        $Band = $_REQUEST["Band"];
        $AMF_IP = $_REQUEST["AMF_IP"];
        $MCC = $_REQUEST["MCC"];
        $MNC = $_REQUEST["MNC"];
        $TAC = $_REQUEST["TAC"];
        $SST = $_REQUEST["SST"];
        $SD = $_REQUEST["SD"];
        $Gain = $_REQUEST["Gain"];
        $apiResponse = $this->fivegService->getData("RAN_Deploy?Band=".$Band."&AMF_IP=".$AMF_IP."&MCC=".$MCC."&MNC=".$MNC."&TAC=".$TAC."&SST=".$SST."&SD=".$SD."&Gain=".$Gain, []);

        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }  function tuning(){
        $apiResponse = $this->fivegService->getData("Tuning/", []);

        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }


 }
?>
