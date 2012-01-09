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
    
    if($limit)
        $query .= " LIMIT ".$start.",".$limit;
    
    
    $result = mysql_query($query) or die("SQL Error 1: " . mysql_error());
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    	$myClientes[] = array(
            'rut' => $row['rut'],
            'nombre' => $row['nombre'],
            'direccion' => $row['direccion'],
            'ncontacto' => $row['ncontacto'],
            'telefono' => $row['telefono'],
            'mail' => $row['mail'],
            'id' => $row['id']
       		);
    }

    $myData = array('results' => $myClientes, 'totalCount' => $count);
    echo json_encode($myData);
    mysql_free_result($result);
} 

/*
* Devuelve datos del usuario
*/
if($accion=='getDatosClientes') {
    // contador
    $count = 1;
    $id = $_REQUEST['id'];
    
    $query = "SELECT * FROM pm_clientes WHERE activo=1 AND id=".$id ;
    
    
    $result = mysql_query($query) or die("SQL Error 1: " . mysql_error());
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    	$myClientes[] = array(
            'rut' => $row['rut'],
            'nombre' => $row['nombre'],
            'direccion' => $row['direccion'],
            'ncontacto' => $row['ncontacto'],
            'telefono' => $row['telefono'],
            'mail' => $row['mail'],
            'id' => $row['id']
    		);
    }
    
    $myData = array('results' => $myClientes, 'totalCount' => $count);
    echo json_encode($myData);
    mysql_free_result($result);
} 

if($accion=='setSaveClient'){
    
    //si viene el id, editaremos el usuario
    $id         = $_REQUEST['id'];
    //datos normales
    $rut        = $_REQUEST['rut'];
    $nombre     = $_REQUEST['nombre'];
    $direccion  = $_REQUEST['direccion'];
    $ncontacto  = $_REQUEST['ncontacto'];
    $telefono   = $_REQUEST['telefono'];
    $mail       = $_REQUEST['mail'];
    
    if($id){
        $query = "UPDATE  pm_clientes SET ".
           "rut ='".$rut."',".
           "nombre  ='".$nombre."'," .
           "direccion='".$direccion."',".
           "ncontacto='".$ncontacto."',".
           "telefono='".$telefono."',".
           "mail='".$mail."'";
           $query.= " WHERE id=".$id;
    }else{
        if(veryClientExists($rut)){
            echo "{failure:true,info:\"Cliente ya existe en la BDD\"}";   
            exit;
        }else{
            $query = "INSERT INTO pm_clientes (rut,nombre,direccion,ncontacto,telefono,mail) VALUES ('{$rut}','{$nombre}','{$direccion}','{$ncontacto}','{$telefono}','{$mail}')"; 
        }
    }
    if(mysql_query($query))
        echo "{success:true,info:\"Registro guardado exitosamente\"}";
    else
        echo "{failure:true,info:'Error al ingresar los datos'}";
}

if($accion=='setDesactivateClient'){
    
    //si viene el id, editaremos el usuario
    $id         = $_REQUEST['id'];
    
    
    $query = "UPDATE pm_clientes SET activo = 0";
    $query.= " WHERE id=".$id;
    
    if(mysql_query($query))
        echo "{success:true,info:\"Registro desactivado correctamente\"}";
    else
        echo "{failure:true,info:\"Error al desactivar los datos\"}";
}

function veryClientExists($rut){
    $query = mysql_query("SELECT * FROM  pm_clientes where rut='".$rut."'") ;
    $rs = mysql_num_rows($query);
    if($rs>0){return 1;}
    return 0;
}
?>