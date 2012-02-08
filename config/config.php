<?php

define('_DB_SERVER_', 'localhost');
define('_DB_NAME_', 'proMiner');
define('_DB_USER_', 'root');
define('_DB_PASSWD_', 'dadito');
define('_PM_VERSION_', '1.0112');


$link = mysql_connect(_DB_SERVER_,_DB_USER_,_DB_PASSWD_);
if  (!$link) {
    die('No pudo conectarse: ' . mysql_error());
}
mysql_select_db(_DB_NAME_);

?>