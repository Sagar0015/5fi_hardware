<?php
/******************************************************************************************
File : AuthController.php
Author :  Mahaboob Basha Shaik
******************************************************************************************/

include_once("app/services/FivegData.php");

 class AuthController extends Controller {
    
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

    function login(){
        
        $username = $_REQUEST["username"];
        $password = $_REQUEST["password"];
        
        $apiResponse = $this->fivegService->getData("SignIn/".$username."?Password=".$password, []);

        $results = Array("status" => true, "data" => $apiResponse);
        $this->setOutputType("json");
        $this->setOutput($results);

    }
   


 }
?>
