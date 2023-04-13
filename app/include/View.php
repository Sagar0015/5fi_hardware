<?php
/******************************************************************************************
File : View.php
Author :  Mahaboob Basha Shaik
******************************************************************************************/

Class View{
    
    public $outputtype = "";  //output type value
    public $output;           //output from controller
    public $countryCode = "en";
    public $languagePath;
    /**
     * Constructor
     * @param object $outputtype type of output format for the view
     */
    public function __construct($outputtype, $countryCode){
        $this->outputtype =  $outputtype;
        $this->countryCode = $countryCode;
        $this->initCountryParse();
    }
    
    public function initCountryParse(){
        if(!file_exists("app/languages/".trim($this->countryCode).".php")){
            $this->countryCode = "en";
        }
        $this->languagePath = "app/languages/".$this->countryCode.".php";
    }
    /**
     * Set Output Type : Setting the type of response 
     * @param object $outputtype response type value
     */
    public function setOutputType($outputtype){
        $this->outputtype = $outputtype;
    }

    /**
     * setGlobalVariables
     * Insert description here
     *
     * @param $globalVariables
     *
     * @return
     */
    public function setGlobalVariables($globalVariables)
    {
        $this->globalVariables = $globalVariables;
    }
    
    /**
     * Render View : Setting the right header type then call to respeictive view based on class,method for response to client
     * @param object $classname Class name
     * @param object $method Method name
     * @param object $results response from its controller
     * @return object  Description
     */
    public function renderView($classname,$method,$results){
        $rootPath = $this->globalVariables->getRootPath();
        $this->initCountryParse();
        if(file_exists($this->languagePath)){
            require $this->languagePath;
        }
        if($this->outputtype == "json"){
            require("app/views/Include/header_json.php");
        } else if($this->outputtype == "csv") {
            require("app/views/Include/header_csv.php");
        }
        
        if(file_exists("$rootPath/app/views/$classname/$method"."_view.php")) {
            include "$rootPath/app/views/$classname/$method"."_view.php";
        }
        else{
            if($results != null) {
                echo json_encode($results);
            }
            else{
                echo json_encode(array("message"=>"Results can't be null or create view file at $rootPath/app/views/$classname/$method"."_view.php"));
            }
        }

        if($this->outputtype == "json"){
            require("app/views/Include/footer_json.php");
        } else if($this->outputtype == "csv") {
             require("app/views/Include/footer_csv.php");
        }
        
    }


    
}
?>
