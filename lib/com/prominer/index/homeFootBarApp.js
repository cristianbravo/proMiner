/**
*
* homeToolBarApp.js - Inicializa index tool bar
*
*/

Ext.onReady(function() {
    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';
    var p = new com.prominer.index.PanelFootBar({});
    p.render('contentExtFoot');

});

