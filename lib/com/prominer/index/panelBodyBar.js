﻿/**
* Modulo 
*
* Panel principal del módulo
*/
Ext.ns('com.prominer.index');

com.prominer.index.PanelBodyBar = new Ext.extend(Ext.Panel, {
    actions : {
        mUsuarios:null,
        mClientes:null,
        mReportes:null,
        mChancado:null
    },
    
    constructor : function(config){
        this.initStores();
        this.initActions();
        
        com.prominer.index.PanelBodyBar.superclass.constructor.call(this, Ext.apply({
            title : 'Menu Principal Usuario',
            width : 1080,
            height: 300,
            id: 'PanelBodyBarId',
            tbar : [this.getMainForm()]
        },config));
    },
    
    initActions : function(){
        this.actions.mUsuarios = new Ext.Action({
            xtype : 'tbbutton',
            text: 'Mantenedor Usuarios',
            tooltip: 'Ingresar y Editar Usuarios',
            iconCls : 'admin_users_32',
            scale : 'large',
            iconAlign : 'top',
            cls : 'x-btn-as-arrow',
            id : 'mUsuariosId',
            width : 120,
            handler : this.handleActions.createDelegate(this, ['mUsuarios'])
        });
        
        this.actions.mClientes = new Ext.Action({
            xtype : 'tbbutton',
            text: 'Mantenedor Clientes',
            iconCls : 'admin_client_32',
            scale : 'large',
            iconAlign : 'top',
            cls : 'x-btn-as-arrow',
            id : 'mClientesId',
            width : 120,
            handler : this.handleActions.createDelegate(this, ['mClientes'])
        });
        
        this.actions.mReportes = new Ext.Action({
            xtype : 'tbbutton',
            text: 'Reportes',
            iconCls : 'admin_report_32',
            scale : 'large',
            iconAlign : 'top',
            cls : 'x-btn-as-arrow',
            id : 'mReportesId',
            width : 120,
            handler : this.handleActions.createDelegate(this, ['mReportes'])
        });
        
        this.actions.mChancado = new Ext.Action({
            xtype : 'tbbutton',
            text: 'Chancado',
            iconCls : 'user_chanc_32',
            scale : 'large',
            iconAlign : 'top',
            cls : 'x-btn-as-arrow',
            id : 'mChancadoId',
            width : 120,
            handler : this.handleActions.createDelegate(this, ['mChancado'])
        });
    },
    initStores: function(){

    },
    handleActions : function(a){
        switch (a){
            case 'mUsuarios':
                    var p = new com.prominer.administracion.home.PanelModUsuarios({});
                    var b = Ext.getDom('contentExtBody');
                    b.innerHTML='';
                    p.render('contentExtBody');
            break;
            case 'mClientes':
                    var p = new com.prominer.administracion.home.PanelModClientes({});
                    var b = Ext.getDom('contentExtBody');
                    b.innerHTML='';
                    p.render('contentExtBody');
            break;
        }
    },

    getFootbarButtons : function(){
        return [{
            xtype : 'buttongroup',
            id : 'botonesInicioId',
            height:300,
            width : 750,
            columns : 3,
            buttonAlign : 'center',
            items : [
                this.actions.mUsuarios,
                this.actions.mClientes,
                this.actions.mReportes,
                this.actions.mChancado
            ]
        }];
    },
    getMainForm : function(){
        return new Ext.form.FormPanel({
            id : 'formPanelInicioId',
            frame : true,
            style : 'padding-left:370px;',
            autoHeight: true,
            width : 750,
            items : [
                    this.getFootbarButtons()
            ]
        });
    }
});