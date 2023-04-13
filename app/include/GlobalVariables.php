<?php
/******************************************************************************************
File : GlobalVariables.php
Author :  Mahaboob Basha Shaik
******************************************************************************************/
Class GlobalVariables {
    private $CONFIG; // Configuration details variable
    
    /**
     * Constructor
     * return object  non-return method
     */
    function __construct($rootPath, $service='tool') {
        $this->xyz = "ravi";
        $this->CONFIG = [];
        $this->service = $service;
        $this->init();
        $this->RootPath = $rootPath;
    }
    /**
     * Init initialization of Global Variables
     * return object  non-return method
     */
    public function init() {
        //$value = parse_ini_file('config/config.ini', true) OR die('Missing or unreadable config/config.ini');
        $filepath = "config/config.php";
        if(file_exists($filepath))
        {
            require_once($filepath);
            //$this->CONFIG = Config::getConfig();
            $conf = new Config();
            $this->CONFIG=$conf->getConfig();
            // $this->CONFIG["saml"]["enabled"] = true;
            if($this->service == "api")
                $this->CONFIG["saml"]["enabled"] = false;
            // print_r($this->CONFIG);
            // exit();
        }
       
    }
    /**
     * Getting configuration details
     * return object  CONFIG configuration details
     */
     function getConfig() {
        // print_r($this->CONFIG);
        // exit();
        return $this->CONFIG;
    }

    /**
     * Getting root path
     * return root path
     */
    public function getRootPath() {
        return $this->RootPath;
    }

}
?>
