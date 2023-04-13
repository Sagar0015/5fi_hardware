<?php
/******************************************************************************************
File : ApiController.php
Author :  Mahaboob Basha Shaik
******************************************************************************************/


 class ApiController extends Controller {
    
    /**
     * Constructor
     * @param object $globalVariables : Having all the global variables and functions
     * @param object $session : To store all session related set and get from session variables.
     * @param object $database : Database instance to have all database methods
     * @return object  Description
     */
    function __construct($globalVariables, $session){
        parent::__construct($globalVariables,$session);
    }

    function getFirstPage(){

        $pubnum = $_REQUEST['pubnum'];
        $solrfields = ["ucid","fam"];
        
        $results = Array("status" => true, "data" => "success");

        $this->setOutputType("json");
        $this->setOutput($results);
    }

 }
?>
