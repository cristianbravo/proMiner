/* 
 * Archivo de funciones comunes.
 */
var GLOBAL_LogoSRURL = "./img/sr_logo.png";
var GLOBAL_SRImageLogoWidth = "140";
var GLOBAL_SRImageLogoHeight = "45";

var GLOBAL_LogoURL = "./img/entrada.png";
var GLOBAL_ImageLogoWidth = "190";
var GLOBAL_ImageLogoHeight = "65";


var GLOBAL_urlBase = 'proMiner';

/*
Despues crear clases get para ids*
*/
var GLOBAL_UrlOff = './service/modUsuarios.php?accion=logOut';


//Roles
var GLOBAL_STRoles = new Ext.data.ArrayStore({
id : 0,
   fields : ['id','nombre'],
   data : [
           [1, 'Administrador'],
           [2, 'Supervisor'],
           [3, 'Chancado'],
           [4, 'Molienda'],
           [5, 'Flotacion']
   ]
});
//sexo
var GLOBAL_STSexo = new Ext.data.ArrayStore({
id : 0,
   fields : ['id','nombre'],
   data : [
           ['m', 'Masculino'],
           ['f', 'Femenino']
   ]
});


var renderBigText = function(t) {
    return t && t.length > 15 ? t.substring(0, 15) + " [...]" : t;
}

var GLOBAL_UserCookieId = new Ext.data.JsonStore({
    url: './service/modUsuarios.php?accion=getDatosSesion',
    root: 'results',
    totalProperty: 'totalCount',
    id: 'id',
    fields: ['nombre', 'rol','id','version']
});

GLOBAL_UserCookieId.on('load', function(str, recs, opt) {

    if (str.getCount() == 1) {
        if (!str.getAt(0).data.nombre) {
                var redirect = GLOBAL_UrlOff;
                window.location = redirect;
        } else {
            Ext.getCmp('userIdText').setValue(str.getAt(0).data.nombre);
            Ext.getCmp('perfilIdText').setValue(str.getAt(0).data.rol);
            Ext.getCmp('versionIdText').setValue(str.getAt(0).data.version);
            
        }
    }

});


var GLOBAL_meses = new Ext.data.ArrayStore({
    id: 0,
    fields: ['id', 'nombre'],
    data: [
           ['01', 'Enero'],
           ['02', 'Febrero'],
           ['03', 'Marzo'],
           ['04', 'Abril'],
           ['05', 'Mayo'],
           ['06', 'Junio'],
           ['07', 'Julio'],
           ['08', 'Agosto'],
           ['09', 'Septiembre'],
           ['10', 'Octubre'],
           ['11', 'Noviembre'],
           ['12', 'Diciembre']
   ]
});



function ltrim(str) {
    for (var k = 0; k < str.length && isWhitespace(str.charAt(k)); k++);
    return str.substring(k, str.length);
}
function rtrim(str) {
    for (var j = str.length - 1; j >= 0 && isWhitespace(str.charAt(j)); j--);
    return str.substring(0, j + 1);
}
function trim(str) {
    return ltrim(rtrim(str));
}
function isWhitespace(charToCheck) {
    var whitespaceChars = " \t\n\r\f";
    return (whitespaceChars.indexOf(charToCheck) != -1);
}


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}
