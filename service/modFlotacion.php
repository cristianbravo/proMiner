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
if($accion=='setSaveFlotacion') {
    $ct_me = $_REQUEST['ct_me'];
    $ct_p1 = $_REQUEST['ct_p1'];
    $ct_p2 = $_REQUEST['ct_p2'];
    $ct_p3 = $_REQUEST['ct_p3'];
    $ct_np = $_REQUEST['ct_np'];
    $ct_er = $_REQUEST['ct_er'];
    $ct_lae = $_REQUEST['ct_lae'];
    $ct_afo = $_REQUEST['ct_afo'];
    $ct_ioms = $_REQUEST['ct_ioms'];
    
    
    $query = mysql_query("INSERT INTO pm_flotacion (id_usuario,ct_me,ct_p1,ct_p2,ct_p3,ct_np,ct_er,ct_lae,ct_afo,ct_ioms,detencion,derrames,acc_inc) 
    values(".$_SESSION["id"].",{$ct_me},{$ct_p1},{$ct_p2},{$ct_p3},{$ct_np},{$ct_er},{$ct_lae},{$ct_afo},{$ct_ioms})");
    $idFlot = mysql_insert_id();
    
    if(!$query)$error = true;


    $gridCOR = json_decode($_REQUEST['gridCOR']);
    
    foreach($gridCOR as $e){
        $query_cor = mysql_query("INSERT INTO pm_flot_cor_gr (id_control,hora) VALUES (".$idFlot.",'".$e[0]."')");
        if(!$query_cor)$error = true;
    }
    
    
    
    if($error == false)
        echo "{success:true,info:\"Registro guardado exitosamente\"}";
    else
        echo "{failure:true,info:'Error al ingresar los datos'}";
        
        
} 

?>