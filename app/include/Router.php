<?php
/******************************************************************************************
File : Router.php
Author :  Mahaboob Basha Shaik
******************************************************************************************/

Class Router {
    /**
     * Constructor
     * @param object $database It is Database instance to have all database methods
     * @param object $globalVariables : Having all the global variables and functions
     * @param object $session : To store all session related set and get from session variables.
     * return object  non-return function
     */

    private $fieldMappings = array();
     
    public function __construct($globalVariables, $session) {
        $this->init($globalVariables, $session);
    }
    
    /**
     * Init function of Router
     * @param object $database It is Database instance to have all database methods
     * @param object $globalVariables : Having all the global variables and functions
     * @param object $session : To store all session related set and get from session variables.
     * return object  non-return function
     */
    public function init($globalVariables, $session) {
       
        // Request call and type @parameters from Request
        $class = isset($_REQUEST['call']) ? $_REQUEST['call'] : "Auth";
        $method = isset($_REQUEST['type']) ? strtolower($_REQUEST['type']) : "validate_credentials";
        // Load SAML Configuration
        //$CONFIG=parse_ini_file("config/config.ini",true) OR die("Missing or unreadable config/config.ini file");
        $CONFIG = $globalVariables->getConfig();
        if($CONFIG["saml"]["enabled"]==true)
        {
            require_once($CONFIG["saml"]["path"]);
            // Check for pcs-sp SAML session
            $as = new SimpleSAML_Auth_Simple($CONFIG["saml"]["source"]);
            $attributes=$as->getAttributes();
            $sysuser_id=$attributes['user_id'][0];
            // Check for Linkedin SAML session when pcs-sp session is empty
            if(!$sysuser_id && !$session->get("sysuser_id")){
                $as_linkedin = new SimpleSAML_Auth_Simple("linkedin");
                $attributes = $as_linkedin->getAttributes();
                $sysuser_id=$attributes["linkedin.id"][0];
                if($sysuser_id || $session->get("sysuser_id"))
                {
                    $source = "linkedin";
                }
            }

            // Check for Qualcomm SAML session when pcs-sp and linkedin sessions are empty.
            if(!$sysuser_id && !$session->get("sysuser_id")){
                $as_qcom = new SimpleSAML_Auth_Simple($CONFIG['saml']['qcom_source']);
                $qcom_session = SimpleSAML_Session::getInstance();
                $nameid = $qcom_session->getNameID();
                if(isset($nameid['Value']) && $nameid['Value'][0] != '_')
                {
                    $source = "qualpass";
                }
                else
                {
                    $as_alibaba = new SimpleSAML_Auth_Simple($CONFIG['saml']['dolcera-alibaba-sp']);
                    $alibaba_session = SimpleSAML_Session::getInstance();
                    $nameid = $alibaba_session->getNameID();   
                    if($nameid['Value']){
                        $source = "alibabasso";
                    } else {
                        $url = $_SERVER['HTTP_REFERER'];
                        $redirectUrl = $as->getLoginURL();
                        echo json_encode(array("redirectUrl"=>$redirectUrl, "url"=>$url)); exit();
                        $as->requireAuth();
                    }
                }
            }
            
            // Check for sysuser_id. For pcs-sp & linkedin, we will get sysuser_id but for Qualcomm SAML we wont get any sysuser_id, because the user may not exist in our DB.
            $sysuser_id=$session->get("sysuser_id");
            $isAccountExpired = $session->get("isUserAccountExpired");
            
            // Set method to validate qualpass credentials when source is qualpass
            if(!$sysuser_id && $source == "qualpass"){
                $class="Auth";
                $method="validate_credentials_qualpass";
            }
            else if(!$sysuser_id && $source == "alibabasso"){
                $class="Auth";
                $method="validate_credentials_alibabasso";
            }
            // Set method to validate pcs-sp credentials in all the other cases.
            else if(!$sysuser_id && ($source!="linkedin" && $source!="qualpass" && $source!="alibabasso")){
                $class="Auth";
                $method="validate_credentials";
            }
            // Set method to validate linkedin credentials when source is linkedin
            else if(!$sysuser_id && $source=="linkedin"){
                $class="Auth";
                $method="validate_credentials_linkedin";
            }
            
            // We are using dummy check for account expired or not as we do not want to restrict for now.
            if($session->get("sysuser_id")){
                if($isAccountExpired){
                    header("Location: error.php");
                    exit();
                }
                else{
                    session_write_close();
                }
                
            }
        }
        else
        {
            session_regenerate_id(true);
        }

        // paths of controller and model for the requestive request call
        $controller_path = "app/controllers/$class" . "Controller.php";
        if (file_exists($controller_path)) {
            // Created the Controller, for handling bussiness logic for respective $class
            require ($controller_path);
            $controllerClass = $class . "Controller";
            $controller = new $controllerClass($globalVariables, $session);
            try {
                $controller->$method();
            }
            catch(Exception $e) {
                $this->genError($e,$controller->getVisitorLanguage());
            }
            
            // Created the View with output from the respective controller instance
            $view = new View($controller->getOutputType(),$controller->getVisitorLanguage());
            $view->setGlobalVariables($globalVariables);
            $view->renderView($class, $method, $controller->getOutput());
        } else {
            // Special case when we don't have Model Class
            $view = new View("html");
            $view->setGlobalVariables($globalVariables);
            $view->renderView($class, $method, "");
        }
    }

    private function genError($e, $lang) {
        $error = [];
        $error['msg'] = $e->getMessage();
        $error['code'] = $e->getCode();

        require "config/Error.php";
        // print_r($errorList); 
        // print_r($errorList["404"][$lang]); exit();
        if($errorList[$error['code']])
            print_r($error); exit();
            $error['msg'] = $errorList[$error['code']][$lang];
        
        header("HTTP/1.1 {$error['code']}");
        header('Content-Type: application/json; charset=UTF-8');
        die(json_encode(array('msg' => $error['msg'])));
    }
}
?>
