<?php
session_start();
ini_set('error_reporting',E_ALL^E_NOTICE);
include '../config/config.php';
include '../login.php';


$accion = $_REQUEST['accion'];

/*
* Devuelve usuarios del sistema
*/
if($accion=='getTurnos') {

    $query = "SELECT id,tipo_turno FROM pm_turno " ;
    
    
    
    $result = mysql_query($query) or die("SQL Error 1: " . mysql_error());
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    	$myClientes[] = array(
            'id' => $row['id'],
            'tipo_turno' => htmlentities($row['tipo_turno'])
       		);
    }

    $myData = array('results' => $myClientes);
    echo json_encode($myData);
    mysql_free_result($result);
} 

        
        

?>