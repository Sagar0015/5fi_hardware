<?php
class Config {
       
    private $CONFIG = [
            "tool" => "pcs-prod",
            "apis" => [
                "server"=>""
            ],
        ];
    
    

    function getConfig()
    {
        return $this->CONFIG;
    }

}
?>