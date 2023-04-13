<?php
/******************************************************************************************
File : Controller.php
Author :  Mahaboob Basha Shaik
******************************************************************************************/

Class Controller{
    
    public $session;            // Session instance to access session values
    public $globalVariables;    // Global variables to access all global variables and global functions library
    public $database;           // Database instance to have all database methods
    public $outputtype;         // Output type for response i.e either json or html
    public $output;             // Output results is stored in this variable
    private $search;            // Internal Search service 
    public $sysuser_id;
    public $login;

    /**
     * Constructor
     * @param object $globalVariables : Having all the global variables and functions
     * @param object $session : To store all session related set and get from session variables.
     * @param object $database : Database instance to have all database methods
     * @return object  Description
     */
    function __construct($globalVariables, $session){
        $this->session = $session;
        $this->globalVariables = $globalVariables;
        $CONFIG = $globalVariables->getConfig();
        $this->sysuser_id = $this->session->get("sysuser_id") ? $this->session->get("sysuser_id") : ((isset($CONFIG['user_details']) && $CONFIG['user_details']['id']) ? $CONFIG['user_details']['id'] : 1);
        $this->login = $this->session->get("login") ? $this->session->get("login"): ((isset($CONFIG['user_details']) && $CONFIG['user_details']['email']) ? $CONFIG['user_details']['email'] : "admin@dolcera.com");
    }

    
    /**
     * Get Model : Getting the model
     * @param $classname Model group name
     * return object  model instance
     */
    public function getModel($classname){
        $model = null;
        $model_path = "app/models/$classname" . "Model.php";
            if (file_exists($model_path)) {
            // Created the Model, for handling database methods for respective $class
            require_once ($model_path);
            $modelClass = $classname . "Model";
            $model = new $modelClass($this->database, $this->ifidatabase, $this->anadatabase, $this->globalVariables);
        }
        return $model;
    }
    
    /**
     * Get Controller : Getting the Controller
     * @param $classname Controller group name
     * return object  Controller instance
     */
    public function getController($classname)
    {
        $database = $this->database;
        $globalVariables = $this->globalVariables;
        $session = $this->session;
        $controller_path = "app/controllers/$classname" . "Controller.php";
        if (file_exists($controller_path)) {
            // Created the Controller, for handling bussiness logic for respective $class
            include_once ($controller_path);
            $controllerClass = $classname . "Controller";
            $controller = new $controllerClass($this->globalVariables, $this->session, $this->database, $this->ifidatabase, $this->anadatabase, $this->fieldMappings);
            return $controller;
        }
        else {
            return null; 
        }
    }

    /**
     * Getting Library 
     * @param object $libraryname Library Name
     * @return object  library instance
     */
    public function getLibrary($libraryname){
        $library = null;
        $library_path = "app/library/$libraryname".".php";
            if (file_exists($library_path)) {
            // Created the library for handling respective class methods
            require_once ($library_path);
            if($libraryname == "IFI")
                $library = new $libraryname($this->globalVariables,$this->session,$this->fieldMappings);
            else
                $library = new $libraryname($this->globalVariables,$this->session);
        }
        return $library;
    }
    
    /**
     * Getting csv from Library 
     * @param object $libraryname Library Name
     * @return object  library instance
     */
    public function getcsvFromLibrary($libraryname){
        $library = null;
        $library_path = "app/library/$libraryname".".csv";
            if (file_exists($library_path)) {
            // Created the library for handling respective class methods
            require ($library_path);
            $library = new $libraryname($this->globalVariables,$this->session);
        }
        return $library;
    }
    
    /**
     * Set Output Type : setting the output type
     * @param object $outputtype output type value
     * return object  non-return function
     */
    public function setOutputType($outputtype){
        $this->outputtype = $outputtype;
    }
    
    /**
     * Get Output Type : getting the output type 
     * return object  output type value
     */
    public function getOutputType(){
        return isset($this->outputtype) ? $this->outputtype : "html";
    }
    
    /**
     * Set Output : setting the Output
     * @param object $output response result from controller
     * return object non-return function
     */
    public function setOutput($output){
        $this->output = $output;
    }
    
    /**
     * Get Output : getting response result from controller
     * return object  response result
     */
    public function getOutput(){
        return isset($this->output) ? $this->output : "";
    }

    public function setVisitorLanguage($countryCode = null){
        if($countryCode == null)
            $countryCode  = strtolower(trim(substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2)));
         session_start();
         $this->session->set("visitor_country", $countryCode);
    }

    public function getVisitorLanguage(){
        if($this->session->get("visitor_country") == null){
            $this->setVisitorLanguage();
        }
        return $this->session->get("visitor_country");
    }
    
    public function setQueryId($query_id = 0){
         session_start();
         $this->session->set("last_query_id", $query_id);
    }
}
?>
