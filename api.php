<?php

error_reporting(E_ALL ^ E_WARNING ^ E_NOTICE ^ E_USER_DEPRECATED ^ E_DEPRECATED);
ini_set('memory_limit', '6144M');
ini_set('max_execution_time', 5000);
ini_set('post_max_size', '6144M');

$rootPath = '.';//realpath($_SERVER["DOCUMENT_ROOT"]);


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

require 'vendor/autoload.php';

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
?>
