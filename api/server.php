<?php

    error_reporting(E_ALL ^ E_WARNING ^ E_NOTICE ^ E_USER_DEPRECATED ^ E_DEPRECATED);
    ini_set('memory_limit', '6144M');
    ini_set('max_execution_time', 5000);
    ini_set('post_max_size', '6144M');

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    // require_once "vendor/autoload.php";
    $configFile = "config/config.php";
    $CONFIG = [];
    if(file_exists($configFile))
    {
        require_once($configFile);
        $conf = new Config();
        $CONFIG=$conf->getConfig();
    }

    // $database = $CONFIG["dbconn"]["database"];
    // $host = $CONFIG["dbconn"]["host"];
    // $driver = $CONFIG["dbconn"]["driver"];
    
    // $dsn = "$driver:dbname=$database;host=$host";
    // $username = $CONFIG["dbuser"]["user"];
    // $password = $CONFIG["dbuser"]["pwd"];

    // OAuth2\Autoloader::register();

    // // $dsn is the Data Source Name for your database, for exmaple "mysql:dbname=my_oauth2_db;host=localhost"
    // $storage = new OAuth2\Storage\Pdo(array('dsn' => $dsn, 'username' => $username, 'password' => $password));

    // // Pass a storage object or array of storage objects to the OAuth2 server class
    // $oauthServer = new OAuth2\Server($storage);

    // // Add the "Client Credentials" grant type (it is the simplest of the grant types)
    // $oauthServer->addGrantType(new OAuth2\GrantType\ClientCredentials($storage));

    // // Add the "Authorization Code" grant type (this is where the oauth magic happens)
    // $oauthServer->addGrantType(new OAuth2\GrantType\AuthorizationCode($storage));
?>