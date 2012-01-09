<?php
session_start();
ini_set('error_reporting',E_ALL^E_NOTICE);
include 'config/config.php';
include 'login.php';
?>
<html>
<head>
<link href="./css/login-box.css" rel="stylesheet" type="text/css" />
<!--Fuentes ext js-->	
<link rel="stylesheet" type="text/css" href="./lib/ext/resources/css/ext-all.css" />
<script type="text/javascript" src="./lib/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="./lib/ext/ext-all.js"></script>

<!--extensiones js-->	
<script type="text/javascript" src="./lib/com/prominer/common/ext_adds.js"></script>

<!--comm js-->	
<script type="text/javascript" src="./lib/com/prominer/common/common.js"></script>


<!-- Administracion -->
<script type="text/javascript" src="./lib/com/prominer/administracion/home/panelModUsuarios.js"></script>
<script type="text/javascript" src="./lib/com/prominer/administracion/home/panelModClientes.js"></script>

<!-- Index -->
<script type="text/javascript" src="./lib/com/prominer/index/panelBodyBar.js"></script>
<script type="text/javascript" src="./lib/com/prominer/index/panelToolBar.js"></script>
<script type="text/javascript" src="./lib/com/prominer/index/panelFootBar.js"></script>

<script type="text/javascript">Ext.BLANK_IMAGE_URL = "./lib/ext/resources/images/default/s.gif";</script> 
<title>ProMiner BlackColt</title>
</head>
<body  style="background-color:#515e66" >
<?php 
if($_SESSION["log_ok"]=='ok'){
echo <<<EOT
<table align="center" cellspacing=0 cellpadding=0>
	<tr><td><script type="text/javascript" src="./lib/com/prominer/index/homeToolBarApp.js"></script><div id="contentExtTbar" align="center"></div></td></tr>
	<tr><td><script type="text/javascript" src="./lib/com/prominer/index/homeBodyBarApp.js"></script><div id="contentExtBody" align="center"></div></td></tr>
	<tr><td><script type="text/javascript" src="./lib/com/prominer/index/homeFootBarApp.js"></script><div id="contentExtFoot" align="center"></div></td></tr>
</table>
EOT;

}else{
	include 'tmpLogin.php';	
}
?>
</body>
</html>