<?php
session_start();
ini_set('error_reporting',E_ALL^E_NOTICE);
include '../config/config.php';
include '../login.php';
$start = $_REQUEST['start'];
$limit = $_REQUEST['limit'];


$accion = $_REQUEST['accion'];

/*
* Devuelve usuarios del sistema
*/
if($accion=='getClientes') {
    // contador
    $result = mysql_query("SELECT COUNT(id) AS count FROM pm_clientes WHERE activo=1")
    or die ('Could not do count on table: ' . mysql_error());
    $row = mysql_fetch_assoc($result);
    $count = $row['count'];
    
    
    $query = "SELECT * FROM pm_clientes WHERE activo=1 " ;
    
    
    
    $result = mysql_query($query) or die("SQL Error 1: " . mysql_error());
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
        $myClientes[] = array(
            'nombre' => $row['nombre'].' '.$row['rut'],
            'id' => $row['id']
            );
    }

    $myData = array('results' => $myClientes, 'totalCount' => $count);
    echo json_encode($myData);
    mysql_free_result($result);
} 

if($accion=='getPtsExtraccion') {

    $idCliente = $_REQUEST['idCliente'];

    if(!empty($idCliente)){
        // contador
        $result = mysql_query("SELECT COUNT(id) AS count FROM pm_pto_extraccion WHERE activo=1 AND id_cliente =".$idCliente)
        or die ('Could not do count on table: ' . mysql_error());
        $row = mysql_fetch_assoc($result);
        $count = $row['count'];
        
        
        $query = "SELECT * FROM pm_pto_extraccion WHERE activo=1 AND id_cliente =".$idCliente ;
        
        
        
        $result = mysql_query($query) or die("SQL Error 1: " . mysql_error());
        while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
            $myClientes[] = array(
                'nombre' => $row['nombre'],
                'id' => $row['id']
                );
        }

        $myData = array('results' => $myClientes, 'totalCount' => $count);
        echo json_encode($myData);
        mysql_free_result($result);
    }else{
        echo json_encode(array('results' => array(), 'totalCount' => 0));
    }
} 





?>