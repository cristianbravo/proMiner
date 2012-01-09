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
if($accion=='getUsuarios') {
    // contador
    $result = mysql_query("SELECT COUNT(id) AS count FROM pm_usuarios WHERE activo=1")
    or die ('Could not do count on table: ' . mysql_error());
    $row = mysql_fetch_assoc($result);
    $count = $row['count'];
    
    
    $query = "SELECT us.id, us.usuario, us.passw, us.nombre, us.apellido, us.sexo, rl.nombre as rol FROM  pm_usuarios us INNER JOIN pm_roles rl ON us.rol = rl.id WHERE us.activo=1 " ;
    
    if($limit)
        $query .= " LIMIT ".$start.",".$limit;
    
    
    $result = mysql_query($query) or die("SQL Error 1: " . mysql_error());
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    	$myUsuarios[] = array(
            'usuario' => $row['usuario'],
            'passw' => $row['passw'],
            'nombre' => $row['nombre'],
            'apellido' => $row['apellido'],
            'sexo' => $row['sexo'],
            'rol' => $row['rol'],
            'id' => $row['id']
    		);
    }

    $myData = array('results' => $myUsuarios, 'totalCount' => $count);
    echo json_encode($myData);
    mysql_free_result($result);
} 

/*
* Devuelve datos del usuario
*/
if($accion=='getDatosUsuario') {
    // contador
    $count = 1;
    $id = $_REQUEST['id'];
    
    $query = "SELECT us.id, us.usuario, us.passw, us.nombre, us.apellido, us.sexo, rl.nombre as rol FROM  pm_usuarios us INNER JOIN pm_roles rl ON us.rol = rl.id WHERE us.activo=1 AND us.id=".$id ;
    
    
    $result = mysql_query($query) or die("SQL Error 1: " . mysql_error());
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    	$myUsuarios[] = array(
            'usuario' => $row['usuario'],
            'passw' => $row['passw'],
            'nombre' => $row['nombre'],
            'apellido' => $row['apellido'],
            'sexo' => $row['sexo'],
            'rol' => $row['rol'],
            'id' => $row['id']
    		);
    }
    
    $myData = array('results' => $myUsuarios, 'totalCount' => $count);
    echo json_encode($myData);
    mysql_free_result($result);
} 

if($accion=='setSaveUser'){
    
    //si viene el id, editaremos el usuario
    $id         = $_REQUEST['id'];
    //datos normales
    $usuario    = $_REQUEST['usuario'];
    $passw      = $_REQUEST['passw'];
    $nombre     = $_REQUEST['nombre'];
    $apellido   = $_REQUEST['apellido'];
    $sexo       = $_REQUEST['sexo'];
    $rol        = $_REQUEST['rol'];
    
    if($id){
        $query = "UPDATE  pm_usuarios SET ".
           "usuario ='".$usuario."',";
           if(veryPassword($id,$passw)==1){$query.="passw='".md5($passw)."',";}
           $query.="nombre  ='".$nombre."'," .
           "apellido='".$apellido."'";
           if((int)$rol!=0){$query.=",rol     =".$rol;}
           $query.= " WHERE id=".$id;
    }else{
        if(veryUserExists($usuario)){
            echo "{failure:true,info:\"Usuario ya existe en la BDD\"}";   
            exit;
        }else{
            $query = "INSERT INTO pm_usuarios (usuario,passw,nombre,apellido,sexo,rol) VALUES ('{$usuario}','".md5($passw)."','{$nombre}','{$apellido}','{$sexo}',{$rol})"; 
        }
    }
    if(mysql_query($query))
        echo "{success:true,info:\"Registro guardado exitosamente\"}";
    else
        echo "{failure:true,info:'Error al ingresar los datos'}";
}

if($accion=='setDesactivateUser'){
    
    //si viene el id, editaremos el usuario
    $id         = $_REQUEST['id'];
    
    
    $query = "UPDATE  pm_usuarios SET activo = 0";
    $query.= " WHERE id=".$id;
    
    if(mysql_query($query))
        echo "{success:true,info:\"Registro desactivado correctamente\"}";
    else
        echo "{failure:true,info:\"Error al desactivar los datos\"}";
}
//Datos de la sesion
if($accion=='getDatosSesion') {
    // contador
    $count = 1;
    $id = $_SESSION["id"];
    
    $query = "SELECT us.id, us.nombre, us.apellido,rl.nombre as rol FROM  pm_usuarios us INNER JOIN pm_roles rl ON us.rol = rl.id WHERE us.activo=1 AND us.id=".$id ;
    
    
    $result = mysql_query($query) or die("SQL Error 1: " . mysql_error());
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    	$myUsuarios[] = array(
            'nombre' => $row['nombre']." ".$row['apellido'],
            'rol' => $row['rol'],
            'id' => $row['id'],
            'version' => _PM_VERSION_
    		);
    }
    
    $myData = array('results' => $myUsuarios, 'totalCount' => $count);
    echo json_encode($myData);
    mysql_free_result($result);
} 
if($accion=='logOut') {
    logOut();
}
/*
*Funciones
*/
function logOut(){    
    $_SESSION["log_ok"] = "";
    $_SESSION["usuario"] = "";
    $_SESSION["id"] = "";
    unset($_SESSION);
    session_destroy();
    header("location: ../index.php");
}
function veryPassword($id,$pass){
    $query = mysql_query("SELECT us.passw FROM  pm_usuarios us where us.id=".$id) ;
    $r = mysql_fetch_array($query);
    if($r['passw']==$pass){return 0;}
    return 1;
}
function veryUserExists($user){
    $query = mysql_query("SELECT * FROM  pm_usuarios us where us.usuario='".$user."'") ;
    $rs = mysql_num_rows($query);
    if($rs>0){return 1;}
    return 0;
}
?>