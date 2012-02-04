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
    //FIXME : id_ctrl_general 

    $ct_me = $_REQUEST['ct_me'];
    $ct_p1 = $_REQUEST['ct_p1'];
    $ct_p2 = $_REQUEST['ct_p2'];
    $ct_p3 = $_REQUEST['ct_p3'];
    $ct_np = $_REQUEST['ct_np'];
    $ct_er = $_REQUEST['ct_er'];
    $ct_lae = $_REQUEST['ct_lae'];
    $ct_afo = $_REQUEST['ct_afo'];
    $ct_ioms = $_REQUEST['ct_ioms'];

    $derra = $_REQUEST['derra-1'];
    $deten = $_REQUEST['deten-1'];
    $inci = $_REQUEST['inci-1'];
    $obser = $_REQUEST['obser'];
    $obser = $_REQUEST['obser'];
    $turno = $_REQUEST['turno'];
    $fecha = $_REQUEST['fecha'];

    
   
    
    $query = mysql_query("INSERT INTO pm_flotacion (id_usuario,ct_me,ct_p1,ct_p2,ct_p3,ct_np,ct_er,ct_lae,ct_afo,ct_ioms,detencion,derrames,acc_inc,observaciones,id_turno ,fecha_real) 
    values(".$_SESSION["id"].",{$ct_me},'{$ct_p1}','{$ct_p2}','{$ct_p3}','{$ct_np}',{$ct_er},{$ct_lae},{$ct_afo},{$ct_ioms},{$deten},{$derra},{$inci},'{$obser}',{$turno},'{$fecha}')");

    $idFlot = mysql_insert_id();
    
    if(!$query)$error = true;


    $gridCOR = json_decode($_REQUEST['gridCOR']);
    foreach($gridCOR as $e){
        $query_cor = mysql_query("INSERT INTO pm_flot_cor_gr (id_control,hora,colector1,colector2,espumante,modificador,act_dep,ph) 
        VALUES (".$idFlot.",'".$e[0]."','".$e[1]."','".$e[2]."','".$e[3]."','".$e[4]."','".$e[5]."','".$e[6]."')");
        if(!$query_cor)$error = true;
    }


    $gridCORR = json_decode($_REQUEST['gridCORR']);
    foreach($gridCORR as $e){
        $query_corr = mysql_query("INSERT INTO pm_flot_corr_gr (id_control,hora,colector1,colector2,espumante,modificador,act_dep,cal_kg) 
        VALUES (".$idFlot.",'".$e[0]."','".$e[1]."','".$e[2]."','".$e[3]."','".$e[4]."','".$e[5]."','".$e[6]."')");
        if(!$query_corr)$error = true;
    }
    
    
    if($error == false)
        echo "{success:true,info:'Registro guardado exitosamente'}";
    else
        echo "{failure:true,info:'Error al ingresar los datos'}";
        
        
} 

?>