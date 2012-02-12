/**
* Modulo 
*
* Panel principal del módulo usuarios
*/
Ext.ns('com.prominer.usuario.home');

com.prominer.usuario.home.PanelModSupervisor = new Ext.extend(Ext.Panel, {
    actions: {
        mStart:null,
        mFinish:null,
        mReport:null,
        opBack:null
    },
    pageSize:10,
    store : null,
    constructor: function(config) {
        this.initActions();
        /*
        *iniciamos los posibles stores para rellenar grids,combos, etc.
        */
        this.initStores();
        com.prominer.usuario.home.PanelModSupervisor.superclass.constructor.call(this, Ext.apply({
            title: 'Control de Supervision',
            width : 1080,
            iconCls: 'user_super_16',
            id: 'PanelModSupervisorId',
            height: 200,
            tbar: [this.getMainForm()]
        }, config));

        this.on('afterrender', function(c) {



        });
    },

    initActions: function() {
            this.actions.opBack = new Ext.Action({
            iconCls : 'op_back',
            xtype : 'fbbutton',
            id: 'opBackId',
            scale: 'small',
            text : 'Volver',
            tooltip : 'Regresar Menu',
            handler : this.handleActions.createDelegate(this, ['opBack'])
        }); 
            this.actions.mStart = new Ext.Action({
            xtype : 'tbbutton',
            text: 'Iniciar LOTE',
            tooltip: 'Iniciar el Proceso',
            iconCls : 'super_ini_lot_32',
            scale : 'large',
            iconAlign : 'top',
            cls : 'x-btn-as-arrow',
            id : 'mStartId',
            width : 150,
            handler : this.handleActions.createDelegate(this, ['mStart'])
        });
            this.actions.mFinish = new Ext.Action({
            xtype : 'tbbutton',
            text: 'Finalizar LOTE',
            tooltip: 'Finalizar el Proceso',
            iconCls : 'super_fin_lot_32',
            scale : 'large',
            iconAlign : 'top',
            cls : 'x-btn-as-arrow',
            id : 'mFinishId',
            width : 150,
            handler : this.handleActions.createDelegate(this, ['mFinish'])
        });
            this.actions.mReport = new Ext.Action({
            xtype : 'tbbutton',
            text: 'Infome LOTE',
            tooltip: 'Informacion Lote',
            iconCls : 'super_report_32',
            scale : 'large',
            iconAlign : 'top',
            cls : 'x-btn-as-arrow',
            id : 'mReportId',
            width : 150,
            handler : this.handleActions.createDelegate(this, ['mReport'])
        });
    },
    initStores : function(){

    },
    handleActions: function(a) {
        switch (a) {
            case 'opBack':
                    var p = new com.prominer.index.PanelBodyBar({});
                    var b = Ext.getDom('contentExtBody');
                    b.innerHTML='';
                    p.render('contentExtBody');
                break; 
            case 'mStart':
                    var w = new com.prominer.administracion.home.WinCreateStartLote({
                    title: 'Iniciar Lote',
                    iconCls : 'super_ini_lot_16',
                    id: 'agregarLoteId'
                });
                w.show();
            break;
            case 'mFinish':
                    var w = new com.prominer.administracion.home.WinCreateFinishLote({
                    title: 'Finalizar Lote',
                    iconCls : 'super_fin_lot_16',
                    id: 'terminarLoteId'
                });
                w.show();
            break;
            case 'mReport':
                    var w = new com.prominer.administracion.home.WinCreateReportLote({
                    title: 'Informe Final Lote',
                    iconCls : 'super_report_16',
                    id: 'reporteLoteId'
                });
                w.show();
            break;
        }       
    },
        getFootbarButtons : function(){
        var bGroup =  new Ext.ButtonGroup({
            id : 'botonesInicioId',
            height:200,
            width : 750,
            columns : 3,
            title: 'Iniciar y/o Cerrar Lote',
            buttonAlign : 'center'
        });
        bGroup.add(this.actions.mStart);
        bGroup.add(this.actions.mFinish);
        bGroup.add(this.actions.mReport);        
        return bGroup;
    },
    getInternalForm: function() {

           

    },
    /*
    *Funcion "rendered" para cambiar valores que vengan de la bdd y parsearlo para mostrarlo en el grid como corresponde
    */

    getMainForm: function() {
          
            return new Ext.form.FormPanel({
                id: 'formSupervisor',
                frame: true,
                height: 250,
                style: 'padding-left:320px',
                width : 790,
                items: [
                    this.getFootbarButtons()
                ],
                    bbar :[new Ext.Toolbar.Fill(),this.actions.opBack]
            });      
        }
    });

/**
*Window Inicio/Cierre Lote
*
*Inicio y Cierre Lote
*/

com.prominer.administracion.home.WinCreateStartLote= new Ext.extend(Ext.Window, {
    actions: {
        guardar: null,
        cerrar: null
    },
    constructor: function(config) {
        this.initActions();
        this.initStores();
        com.prominer.administracion.home.WinCreateStartLote.superclass.constructor.call(this, Ext.apply({
            width: 700,
            autoHeight: true,
            modal: true,
            resizable: false,
            items: [this.getInternalForm()],
            buttons: [this.actions.guardar, this.actions.cerrar]
        }, config));

        this.on('afterrender', function(c) {
    
        GLOBAL_NombreUser.load();
            
        GLOBAL_NombreUser.on('load', function(str, recs, opt) {
            if (str.getCount() == 1) {
                if (!str.getAt(0).data.nombre) {
                        var redirect = GLOBAL_UrlOff;
                        window.location = redirect;
                } else {
                    Ext.getCmp('usuarioSuperId').setValue(str.getAt(0).data.nombre);
                }
            }
        
        }); 

        });
    },

    initStores: function() {
        //ponemos los stores que necesitemos

    }
    ,
    initActions: function() {
        this.actions.guardar = new Ext.Action({
            xtype: 'fbbutton',
            text: 'Guardar',
            height: 30,
            iconCls: 'op_save',
            tooltip: 'Guardar',
            handler: this.handleActions.createDelegate(this, ['guardar'])
        });

        this.actions.cerrar = new Ext.Action({
            xtype: 'fbbutton',
            text: 'Cerrar',
            height: 30,
            iconCls: 'op_cancel',
            tooltip: 'Cerrar',
            handler: this.handleActions.createDelegate(this, ['cerrar'])
        });
    },

    handleActions: function(a) {
        switch (a) {
            case 'guardar':
               
                break;
            case 'cerrar':
                this.close();
                break;
        }
    },

    getInternalForm: function() {
        var storeClientes = new Ext.data.JsonStore({
            url : './service/modSupervisor.php?accion=getClientes',
            method : 'POST',
            root : 'results',
            idProperty: 'id',
            autoDestroy: true,
            fields: ['nombre','id']
        });
        var storePtExtraccion = new Ext.data.JsonStore({
            url : './service/modSupervisor.php?accion=getPtsExtraccion',
            method : 'POST',
            root : 'results',
            idProperty: 'id',
            autoDestroy: true,
            fields: ['nombre','id']
        });

            
        return new Ext.form.FormPanel({
            id: 'formStartLoteId',
            frame: true,
            border: false,
            autoHeight: true,
            waitTitle: 'Cargando datos',
            items: [{
                id: 'fsformuserId',
                xtype: 'buttongroup',
                defaults: { labelWidth: 250 },
                columns: 4,
                defaultType: 'textfield',
                border: false,
                frame: false,
                items: [
                new Ext.form.DisplayField({value:' Nombre : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                {
                        fieldLabel: 'Nombre',
                        id : 'usuarioSuperId',
                        name: 'usuario',
                        width: 140,
                        allowBlank: false,
                        readOnly: true,
                        blankText: 'Debe ingresar este campo',
                        
                    },
                new Ext.form.DisplayField({value:' Fecha Inicio : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                    {
                        fieldLabel: 'Fecha Inicio',
                        id : 'fecha',
                        name: 'fecha',
                        width: 140,
                        allowBlank: false,
                        readOnly: true,
                        value: new Date().format('d/m/Y'),
                        format : 'd/m/Y',
                        blankText: 'Debe ingresar este campo'
                        
                    },
                new Ext.form.DisplayField({value:' Cliente : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                    {
                        xtype: 'combo',
                        id: 'comboClienteId',
                        mode: 'remote',
                        fieldLabel: 'Cliente',
                        name: 'cliente',
                        hiddenName: 'cliente',
                        width: 140,
                        allowBlank: false,
                        editable: false,
                        triggerAction: 'all',
                        displayField: 'nombre',
                        valueField: 'id',
                        emptyText:'< Elegir Cliente >',
                        selecOnFocus: true,
                        typeAhead: true,
                        store: storeClientes,
                        blankText: 'Debe ingresar este campo',
                        listeners:{
                             scope: this,
                             'select': function(a, b) {
                                    
                                storePtExtraccion.setBaseParam('idCliente', Ext.getCmp('comboClienteId').getValue())
                                storePtExtraccion.removeAll()
                                Ext.getCmp('comboPtoExtId').setValue('');
                                storePtExtraccion.load()

                                Ext.getCmp('comboPtoExtId').enable();
                            }
                        }
                    },
                    new Ext.form.DisplayField({value:' Pto Extraccion : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                    {
                        xtype: 'combo',
                        id: 'comboPtoExtId',
                        mode: 'remote',
                        fieldLabel: 'Pto Extraccion',
                        name: 'ptExtraccion',
                        hiddenName: 'ptExtraccion',
                        disabled: true,
                        width: 140,
                        allowBlank: false,
                        editable: false,
                        triggerAction: 'all',
                        displayField: 'nombre',
                        valueField: 'id',
                        emptyText:'< Elegir Pto Extraccion >',
                        selecOnFocus: true,
                        typeAhead: true,
                        store: storePtExtraccion,
                        blankText: 'Debe ingresar este campo'
                    },
                    new Ext.form.DisplayField({value:' Numero de Lote #: ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                     {
                        fieldLabel: 'Numero de Lote',
                        name: 'nlote',
                        id: 'nLoteId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                      },
                    new Ext.form.DisplayField({value:' Ton. Ingresadas (T) : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                      {
                        fieldLabel: 'Ton. Ingresadas (T)',
                        id: 'tonIngreId',
                        name: 'ton_ingre',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo',
                        enableKeyEvents: true,
                        listeners:{
                             keyup: function() {
                                    Ext.getCmp('tonSecasId').setValue(this.getValue());
                            }
                        }
                       },
                    new Ext.form.DisplayField({value:' Humedad (%) : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Humedad (%)',
                        name: 'humedad',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo',
                        enableKeyEvents: true,
                        listeners:{
                             keyup: function() {
                                    var toningre = Ext.getCmp('tonIngreId').getValue();
                                    Ext.getCmp('tonHumeId').setValue(this.getValue()/100*toningre);
                                    var tonhume=Ext.getCmp('tonHumeId').getValue();
                                    Ext.getCmp('tonSecasId').setValue(toningre-tonhume);
                            }
                       }},
                    new Ext.form.DisplayField({value:' Humedad en Ton : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Humedad en Ton',
                        id: 'tonHumeId',
                        name: 'ton_humedad',
                        width: 150,
                        readOnly: true,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo',
                        listeners:{
                             change: function() {
                                    Ext.getCmp('add').setValue(this.getValue());
                            }
                       }},
                    new Ext.form.DisplayField({value:' Ton. Secas : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Ton. Secas',
                        id: 'tonSecasId',
                        name: 'ton_secas',
                        width: 150,
                        allowBlank: false,
                        readOnly: true,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Merme Operacional : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Merme Operacional',
                        name: 'merme',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Ton. Efectivas : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Ton. Efectivas',
                        id:'add',
                        name: 'ton_efectivos',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Ton. Concentrado : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Ton. Concentrado',
                        name: 'ton_concentrado',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       }
                    ]
                    },
                    {
                        xtype: 'checkboxgroup',
                        fieldLabel: 'Mineral',
                        itemCls: 'x-check-group-alt',
                        labelStyle: 'color:#15428b;padding-left: 11px;font-size:11px',
                        // Put all controls in a single column with width 100%
                        style :'color:#15428b;padding-left: 11px;',
                        columns: 6,
                        items: [
                              {boxLabel: 'Oxido', name: 'mine_oxido'},
                              {boxLabel: 'Calcopirita', name: 'mine_calcopirita'},
                              {boxLabel: 'Bornita', name: 'mine_bornita'},
                              {boxLabel: 'Calcosina', name: 'mine_calcosina'},
                              {boxLabel: 'Oro', name: 'mine_oro'},
                              {boxLabel: 'Plata', name: 'mine_plata'}
                                ]
                        }
            ]
            });
        }

    });
    
/*FIN*/

com.prominer.administracion.home.WinCreateFinishLote= new Ext.extend(Ext.Window, {
    actions: {
        guardar: null,
        cerrar: null
    },
    constructor: function(config) {
        this.initActions();
        this.initStores();
        com.prominer.administracion.home.WinCreateFinishLote.superclass.constructor.call(this, Ext.apply({
            width: 620,
            autoHeight: true,
            modal: true,
            resizable: false,
            items: [this.getInternalForm()],
            buttons: [this.actions.guardar, this.actions.cerrar]
        }, config));

        this.on('afterrender', function(c) {
    
        GLOBAL_NombreUser.load();
            
        GLOBAL_NombreUser.on('load', function(str, recs, opt) {
            if (str.getCount() == 1) {
                if (!str.getAt(0).data.nombre) {
                        var redirect = GLOBAL_UrlOff;
                        window.location = redirect;
                } else {
                    Ext.getCmp('usuarioSuperId').setValue(str.getAt(0).data.nombre);
                }
            }
        
        }); 

        });
    },

    initStores: function() {
        //ponemos los stores que necesitemos

    }
    ,
    initActions: function() {
        this.actions.guardar = new Ext.Action({
            xtype: 'fbbutton',
            text: 'Guardar',
            height: 30,
            iconCls: 'op_save',
            tooltip: 'Guardar',
            handler: this.handleActions.createDelegate(this, ['guardar'])
        });

        this.actions.cerrar = new Ext.Action({
            xtype: 'fbbutton',
            text: 'Cerrar',
            height: 30,
            iconCls: 'op_cancel',
            tooltip: 'Cerrar',
            handler: this.handleActions.createDelegate(this, ['cerrar'])
        });
    },

    handleActions: function(a) {
        switch (a) {
            case 'guardar':
               
                break;
            case 'cerrar':
                this.close();
                break;
        }
    },

    getInternalForm: function() {
            
        return new Ext.form.FormPanel({
            id: 'formStartLoteId',
            frame: true,
            border: false,
            autoHeight: true,
            waitTitle: 'Cargando datos',
            items: [{
                id: 'fsformuserId',
                xtype: 'buttongroup',
                defaults: { labelWidth: 250 },
                columns: 4,
                defaultType: 'textfield',
                border: false,
                frame: false,
                items: [
                new Ext.form.DisplayField({value:' Nombre : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                {
                        fieldLabel: 'Nombre',
                        id : 'usuarioSuperId',
                        name: 'usuario',
                        width: 140,
                        allowBlank: false,
                        readOnly: true,
                        blankText: 'Debe ingresar este campo',
                        
                    },
                new Ext.form.DisplayField({value:' Fecha Termino : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                    {
                        fieldLabel: 'Fecha Termino',
                        id : 'fechater',
                        name: 'fechater',
                        width: 140,
                        allowBlank: false,
                        readOnly: true,
                        value: new Date().format('d/m/Y'),
                        format : 'd/m/Y',
                        blankText: 'Debe ingresar este campo'
                        
                    },
                    new Ext.form.DisplayField({value:' Numero de Lote #: ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                     {
                        fieldLabel: 'Numero de Lote',
                        name: 'nlote',
                        id: 'nLoteId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                      },
                    new Ext.form.DisplayField({value:' Ton. Efectivas (T) : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                      {
                        fieldLabel: 'Ton. Efectivas (T)',
                        id: 'tonIngreId',
                        name: 'ton_ingre',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                      },
                    new Ext.form.DisplayField({value:' Horas Estimadas : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Horas Estimadas',
                        name: 'hestimadas',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Kw Inicio : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Kw Inicio',
                        name: 'kwinicio',
                        id: 'kwInicioId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Kw Final : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Kw Final',
                        name: 'kwfinal',
                        id: 'kwFinalId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Kw Consumidos : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Kw Consumidos',
                        name: 'kwconsumidos',
                        id: 'kwConsumidosId',
                        width: 150,
                        allowBlank: false,
                        readOnly: true,
                        blankText: 'Debe ingresar este campo',
                        enableKeyEvents: true,
                        listeners:{
                             keyup: function() {
                                    var kwInicio=Ext.getCmp('kwInicioId').getValue();
                                    var kwFinal=Ext.getCmp('kwFinalId').getValue();
                                    Ext.getCmp('kwConsumidosId').setValue(kwFinal-kwInicio);
                                    }
                             }
                       },
                    new Ext.form.DisplayField({value:' Consumo Agua (Lts/seg): ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Consumo Agua',
                        name: 'consumoagua',
                        id: 'ConsumoAguaId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Litros Consumidos (Lts) : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Litros Consumidos',
                        name: 'litrosconsumidos',
                        id: 'LitrosConsumidosId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Consumo Bolas Grs/T): : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Consumo Bolas',
                        name: 'consumobolas',
                        id: 'ConsumoBolasId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Bolas Consumidas (Kg) : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Bolas Consumidas',
                        name: 'bolasconsumidas',
                        id: 'BolasConsumidasId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Desgaste Martillos (Grs/T) : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Desgaste Martillos',
                        name: 'desgastemartillos',
                        id: 'DesgasteMartillosId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Martillos Consumidos (Kg) : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Kw Final',
                        name: 'martillosconsumidos',
                        id: 'MartillosConsumidosId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       }
                    ]
                }]
           });
        }
    });

/* INFORME */


com.prominer.administracion.home.WinCreateReportLote= new Ext.extend(Ext.Window, {
    actions: {

        cerrar: null
    },
    constructor: function(config) {
        this.initActions();
        this.initStores();
        com.prominer.administracion.home.WinCreateReportLote.superclass.constructor.call(this, Ext.apply({
            width: 620,
            autoHeight: true,
            modal: true,
            resizable: false,
            items: [this.getInternalForm()],
            buttons: [ this.actions.cerrar]
        }, config));

        this.on('afterrender', function(c) {

        });
    },

    initStores: function() {
        //ponemos los stores que necesitemos

    }
    ,
    initActions: function() {


        this.actions.cerrar = new Ext.Action({
            xtype: 'fbbutton',
            text: 'Cerrar',
            height: 30,
            iconCls: 'op_cancel',
            tooltip: 'Cerrar',
            handler: this.handleActions.createDelegate(this, ['cerrar'])
        });
    },

    handleActions: function(a) {
        switch (a) {
            case 'cerrar':
                this.close();
                break;
        }
    },

    getInternalForm: function() {
       var storeClientes = new Ext.data.JsonStore({
            url : './service/modSupervisor.php?accion=getClientes',
            method : 'POST',
            root : 'results',
            idProperty: 'id',
            autoDestroy: true,
            fields: ['nombre','id']
        });
        var storePtExtraccion = new Ext.data.JsonStore({
            url : './service/modSupervisor.php?accion=getPtsExtraccion',
            method : 'POST',
            root : 'results',
            idProperty: 'id',
            autoDestroy: true,
            fields: ['nombre','id']
        });
            
        return new Ext.form.FormPanel({
            id: 'formStartLoteId',
            frame: true,
            border: false,
            autoHeight: true,
            waitTitle: 'Cargando datos',
            items: [{
                id: 'fsformuserId',
                xtype: 'buttongroup',
                defaults: { labelWidth: 250 },
                columns: 4,
                defaultType: 'textfield',
                border: false,
                frame: false,
                items: [
                new Ext.form.DisplayField({value:' Cliente : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                    {
                        xtype: 'combo',
                        id: 'comboClienteId',
                        mode: 'remote',
                        fieldLabel: 'Cliente',
                        name: 'cliente',
                        hiddenName: 'cliente',
                        width: 140,
                        allowBlank: false,
                        editable: false,
                        triggerAction: 'all',
                        displayField: 'nombre',
                        valueField: 'id',
                        emptyText:'< Elegir Cliente >',
                        selecOnFocus: true,
                        typeAhead: true,
                        store: storeClientes,
                        blankText: 'Debe ingresar este campo',
                        listeners:{
                             scope: this,
                             'select': function(a, b) {
                                    
                                storePtExtraccion.setBaseParam('idCliente', Ext.getCmp('comboClienteId').getValue())
                                storePtExtraccion.removeAll()
                                Ext.getCmp('comboPtoExtId').setValue('');
                                storePtExtraccion.load()

                                Ext.getCmp('comboPtoExtId').enable();
                            }
                        }
                    },
                    new Ext.form.DisplayField({value:' Pto Extraccion : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                    {
                        xtype: 'combo',
                        id: 'comboPtoExtId',
                        mode: 'remote',
                        fieldLabel: 'Pto Extraccion',
                        name: 'ptExtraccion',
                        hiddenName: 'ptExtraccion',
                        disabled: true,
                        width: 140,
                        allowBlank: false,
                        editable: false,
                        triggerAction: 'all',
                        displayField: 'nombre',
                        valueField: 'id',
                        emptyText:'< Elegir Pto Extraccion >',
                        selecOnFocus: true,
                        typeAhead: true,
                        store: storePtExtraccion,
                        blankText: 'Debe ingresar este campo'
                    },
                    new Ext.form.DisplayField({value:' Numero de Lote #: ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                     {
                        fieldLabel: 'Numero de Lote',
                        name: 'nlote',
                        id: 'nLoteId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                      },
                    new Ext.form.DisplayField({value:' Ton. Ingresadas (T) : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                      {
                        fieldLabel: 'Ton. Ingresadas (T)',
                        id: 'tonIngreId',
                        name: 'ton_ingre',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo',
                        enableKeyEvents: true,
                        listeners:{
                             keyup: function() {
                                    Ext.getCmp('tonSecasId').setValue(this.getValue());
                            }
                        }
                       },
                    new Ext.form.DisplayField({value:' Humedad (%) : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Humedad (%)',
                        name: 'humedad',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo',
                        enableKeyEvents: true,
                        listeners:{
                             keyup: function() {
                                    var toningre = Ext.getCmp('tonIngreId').getValue();
                                    Ext.getCmp('tonHumeId').setValue(this.getValue()/100*toningre);
                                    var tonhume=Ext.getCmp('tonHumeId').getValue();
                                    Ext.getCmp('tonSecasId').setValue(toningre-tonhume);
                            }
                       }},
                    new Ext.form.DisplayField({value:' Humedad en Ton : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Humedad en Ton',
                        id: 'tonHumeId',
                        name: 'ton_humedad',
                        width: 150,
                        readOnly: true,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo',
                        listeners:{
                             change: function() {
                                    Ext.getCmp('add').setValue(this.getValue());
                            }
                       }},
                    new Ext.form.DisplayField({value:' Ton. Secas : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Ton. Secas',
                        id: 'tonSecasId',
                        name: 'ton_secas',
                        width: 150,
                        allowBlank: false,
                        readOnly: true,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Merme Operacional : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Merme Operacional',
                        name: 'merme',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Ton. Efectivas : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Ton. Efectivas',
                        id:'add',
                        name: 'ton_efectivos',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Ton. Concentrado : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Ton. Concentrado',
                        name: 'ton_concentrado',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Horas Estimadas : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Horas Estimadas',
                        name: 'hestimadas',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Kw Inicio : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Kw Inicio',
                        name: 'kwinicio',
                        id: 'kwInicioId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Kw Final : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Kw Final',
                        name: 'kwfinal',
                        id: 'kwFinalId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Kw Consumidos : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Kw Consumidos',
                        name: 'kwconsumidos',
                        id: 'kwConsumidosId',
                        width: 150,
                        allowBlank: false,
                        readOnly: true,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Consumo Agua (Lts/seg): ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Consumo Agua',
                        name: 'consumoagua',
                        id: 'ConsumoAguaId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Litros Consumidos (Lts) : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Litros Consumidos',
                        name: 'litrosconsumidos',
                        id: 'LitrosConsumidosId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Consumo Bolas Grs/T): : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Consumo Bolas',
                        name: 'consumobolas',
                        id: 'ConsumoBolasId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Bolas Consumidas (Kg) : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Bolas Consumidas',
                        name: 'bolasconsumidas',
                        id: 'BolasConsumidasId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Desgaste Martillos (Grs/T) : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Desgaste Martillos',
                        name: 'desgastemartillos',
                        id: 'DesgasteMartillosId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Martillos Consumidos (Kg) : ',style :'color:#15428b;padding-left: 11px;font-size:11px'}),
                       {
                        fieldLabel: 'Kw Final',
                        name: 'martillosconsumidos',
                        id: 'MartillosConsumidosId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       }
                    ]
                },
                    {
                        xtype: 'checkboxgroup',
                        fieldLabel: 'Mineral',
                        itemCls: 'x-check-group-alt',
                        labelStyle: 'color:#15428b;padding-left: 11px;font-size:11px',
                        // Put all controls in a single column with width 100%
                        style :'color:#15428b;padding-left: 11px;',
                        columns: 6,
                        items: [
                              {boxLabel: 'Oxido', name: 'mine_oxido'},
                              {boxLabel: 'Calcopirita', name: 'mine_calcopirita'},
                              {boxLabel: 'Bornita', name: 'mine_bornita'},
                              {boxLabel: 'Calcosina', name: 'mine_calcosina'},
                              {boxLabel: 'Oro', name: 'mine_oro'},
                              {boxLabel: 'Plata', name: 'mine_plata'}
                                ]
                        },
                {
                id: 'fsformuser2Id',
                xtype: 'buttongroup',
                defaults: { labelWidth: 250 },
                columns: 5,
                defaultType: 'textfield',
                border: false,
                frame: false,
                items: [
                        
                      new Ext.form.DisplayField({value:' Mallaje Stock Pile: ',style :'color:#15428b;padding-left: 11px;font-size:11px;'}),
                     {
                        name: 'bajo10',
                        id: 'baj10Id',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                      },
                      new Ext.form.DisplayField({value:' % Bajo 10 mm ',style :'color:#15428b;padding-left: 11px;font-size:11px;'}),
                     {
                        name: 'bajo5',
                        id: 'baj5Id',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                      },
                      new Ext.form.DisplayField({value:' % Bajo 5 mm ',style :'color:#15428b;padding-left: 11px;font-size:11px;'}),
                      new Ext.form.DisplayField({value: 'pH',style :'color:#15428b;padding-left: 11px;font-size:11px;'}),
                      {
                        name: 'ph',
                        id: 'pHId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                      },
                       new Ext.form.DisplayField({value: 'Nº Pozos',style :'color:#15428b;padding-left: 11px;font-size:11px;'}),
                      {
                        name: 'npozos',
                        id: 'npozosId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                      }
                      ]
                  }
                ]
           });
        }
    });
    
