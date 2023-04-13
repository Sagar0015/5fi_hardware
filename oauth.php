<?php

    session_start();
    error_reporting(E_ALL ^ E_WARNING ^ E_NOTICE);
    ini_set('memory_limit', '6144M');
    ini_set('max_execution_time', 5000);
    ini_set('post_max_size', '6144M');

    require_once "api/server.php";
    $rootPath = '.';

    $param1 = isset($_REQUEST['param1']) ? $_REQUEST['param1'] : "none";
    $param2 = isset($_REQUEST['param2']) ? $_REQUEST['param2'] : "none";
    $param3 = isset($_REQUEST['param3']) ? $_REQUEST['param3'] : "none";
    
    $call = 'Api';
    $type = $param2;
    $param1 = strtolower($param1);

    switch($param1){
        case "auth":
            if($param2 == "dolcera_auth"){
                $type = "access_token";
                break;
            } else if($param2 == "login"){
                $call = "Auth";
                $type = "login";
                break;
            }
             else
                break;
        case "monitor":
            if($param2 == "home"){
                $call = "Monitor";
                $type = "getMonitorHome";
                break;
            } else if($param2 == "element"){
                $call = "Monitor";
                $type = "getElementDetails";
                break;
            } else if($param2 == "uelist"){
                $call = "Monitor";
                $type = "getUEList";
                break;
            } else if($param2 == "prepare_handover"){
                $call = "Monitor";
                $type = "prepareHanover";
                break;
            } else if($param2 == "path_switch_list"){
                $call = "Monitor";
                $type = "getPathSwitchList";
                break;
            } else if($param2 == "submit_path_switch"){
                $call = "Monitor";
                $type = "submitPathSwitch";
                break;
            } else if($param2 == "get_network_stats"){
                $call = "Monitor";
                $type = "getNetworkStats";
                break;
            } else if($param2 == "get_network_summary"){
                $call = "Monitor";
                $type = "getNetworkSummary";
                break;
            } else if($param2 == "get_network_list"){
                $call = "Monitor";
                $type = "getNetworkList";
                break;
            } else if($param2 == "inspect_list"){
                $call = "Monitor";
                $type = "inspectList";
                break;
            } else if($param2 == "get_logs"){
                $call = "Monitor";
                $type = "getLogs";
                break;
            } else if($param2 == "get_packets"){
                $call = "Monitor";
                $type = "getPackets";
                break;
            } else if($param2 == "get_console"){
                $call = "Monitor";
                $type = "getConsole";
                break;
            } else if($param2 == "get_terminals"){
                $call = "Monitor";
                $type = "getTerminals";
                break;
            } else if($param2 == "demo_login"){
                $call = "Monitor";
                $type = "demoLogin";
                break;
            }
            else if($param2 == "validate_ap"){
                $call = "Monitor";
                $type = "validateAp";
                break;
            }
            else if($param2 == "tuning"){
                $call = "Monitor";
                $type = "tuning";
                break;
            }
            else if($param2 === 'get_ran_parameter'){
                $call = "Monitor";
                $type = "getRanParameter";
                
                break;
            }
            else if($param2 === 'ran_deployment'){
                $call = "Monitor";
                $type = "ranDeployment";
                
                break;
            }
             else 
                break;

        case "manage":
            if($param2 == "addsubscriber"){
                $call = "Manage";
                $type = "addSubscriber";
                break;
            } else if($param2 == "subscribers"){
                $call = "Manage";
                $type = "getSubscribers";
                break;
            } else if($param2 == "delete_subscriber"){
                $call = "Manage";
                $type = "deleteSubscriber";
                break;
            } else if($param2 == "modify_subscriber"){
                $call = "Manage";
                $type = "modifySubscriber";
                break;
            } else if($param2 == "access_points"){
                $call = "Manage";
                $type = "getAccessPoints";
                break;
            } else if($param2 == "build_a_demo"){
                $call = "Manage";
                $type = "buildADemo";
                break;
            } else if($param2 == "suggested_actions_core"){
                $call = "Manage";
                $type = "suggestedActionsCore";
                break;
            } else if($param2 == "execute_sug_action"){
                $call = "Manage";
                $type = "executeSugAction";
                break;
            } else if($param2 == "get_app_stats"){
                $call = "Manage";
                $type = "getAppStats";
                break;
            } else if($param2 == "ue_details"){
                $call = "Manage";
                $type = "ueDetails";
                break;
            } else if($param2 == "app_ue_list"){
                $call = "Manage";
                $type = "getApplicationUeList";
                break;
            } else 
                break;
        case "deploy":
            if($param2 == "cn_list"){
                $call = "Deploy";
                $type = "getCNList";
                break;
            } else if($param2 == "ran_list"){
                $call = "Deploy";
                $type = "getRANList";
                break;
            } else if($param2 == "deploy_network"){
                $call = "Deploy";
                $type = "deplayNetwork";
                break;
            } else 
                break;
    }

    if($type == "access_token"){
        $_SERVER['PHP_AUTH_USER'] = $_REQUEST['client_id'];
        $_SERVER['PHP_AUTH_PW'] = $_REQUEST['client_secret'];
        $_POST['grant_type'] = 'client_credentials';
        // Handle a request for an OAuth2.0 Access Token and send the response to the client
        // $oauthServer->handleTokenRequest(OAuth2\Request::createFromGlobals())->send();
    }
    else{
        $_POST['access_token'] = $_REQUEST['access_token'];
        
        // if (!$oauthServer->verifyResourceRequest(OAuth2\Request::createFromGlobals())) {
        //     $oauthServer->getResponse()->send();
        //     die;
        // }


        $_REQUEST['call'] = $call;
        $_REQUEST['type'] = $type;
        $_REQUEST['apiService'] = 'api';
        
        /** Loading dependancy classes */
        require "app/include/Router.php";
        require "app/include/GlobalVariables.php";
        require "app/include/Session.php";

        /** Loading MVC Classes */
        require "app/include/Controller.php";
        require "app/include/View.php";

        $globalVariables = new GlobalVariables($rootPath, 'api');
        $session = new Session($globalVariables);

        $router = new Router($globalVariables,$session);
    }

?>