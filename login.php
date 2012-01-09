<?php

if ($_REQUEST["loginGo"]){
	$usuario = addslashes($_REQUEST['usuario']);
	$passw = md5(addslashes($_REQUEST['password']));
	$query = mysql_query("SELECT * FROM pm_usuarios WHERE usuario='".$usuario."'  AND passw='".$passw ."'");
	if($f = @mysql_fetch_array($query)){
		$_SESSION["log_ok"] = "ok";
		$_SESSION["usuario"] = $f['usuario'];
        $_SESSION["id"] = $f['id'];
	}else{
		$_SESSION["log_ok"] = "";
		$_SESSION["usuario"] = "";
        $_SESSION["id"] = "";
	}
}


?>
