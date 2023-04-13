<?php
/******************************************************************************************
File : Session.php
Author :  Mahaboob Basha Shaik
******************************************************************************************/

Class Session {
    /**
     * Constructor
     * @param object $globalVariables : Having all the global variables and functions
     */
    public function __construct($globalVariables) {
      $this->init();
    }
    
    /**
     * Initializing the session
     */
    public function init() {
      session_start();
    }
    
    /**
     * Set : Storing the $key, $value pair in Session
     * @param object $key Key name
     * @param object $value Key value
     */

    public function set($key, $value) {
        $_SESSION[$key] = $value;
    }
    /**
     * Get : Getting the value from session for the specific $key
     * @param object $key Key name
     */

    public function get($key) {
        return isset($_SESSION[$key]) ? $_SESSION[$key] : null;
    }

    /**
     * Destroy : destroy the session.
     */
    public function destroy() {
        unset($_SESSION);
        session_destroy();
    }



}
?>
