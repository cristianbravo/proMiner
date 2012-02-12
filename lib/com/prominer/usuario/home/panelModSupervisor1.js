/**
* Modulo 
*
* Panel principal del módulo usuarios
*/
Ext.ns('com.prominer.usuario.home');

com.prominer.usuario.home.PanelModSupervisor = new Ext.extend(Ext.Panel, {
    actions: {
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
            height: 300,
            tbar: [this.getMainForm()]
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
            id: 'formSuperId',
            title: 'Apertura de Proceso',
            width : 605,
            waitTitle: 'Cargando datos',
            frame: true,
            border: true,
            autoHeight: true,
            defaultType: 'textfield',
            waitTitle: 'Cargando datos',
            items: [{
                id: 'fsformuserId',
                xtype: 'buttongroup',
                frame: false,
                border: false,
                defaults: { labelWidth: 500,width:130 },
                columns: 4,
                defaultType: 'textfield',
                items: [
                new Ext.form.DisplayField({value:' Nombre : ',style :'color:#15428b;padding-left: 11px;'}),
                {
                        fieldLabel: 'Nombre',
                        id : 'usuarioSuperId',
                        name: 'usuario',
                        width: 140,
                        allowBlank: false,
                        readOnly: true,
                        blankText: 'Debe ingresar este campo',
                        
                    },
                new Ext.form.DisplayField({value:' Fecha Inicio : ',style :'color:#15428b;padding-left: 11px;'}),
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
                new Ext.form.DisplayField({value:' Cliente : ',style :'color:#15428b;padding-left: 11px;'}),
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
                    new Ext.form.DisplayField({value:' Pto Extraccion : ',style :'color:#15428b;padding-left: 11px;'}),
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
                    new Ext.form.DisplayField({value:' Numero de Lote #: ',style :'color:#15428b;padding-left: 11px;'}),
                     {
                        fieldLabel: 'Numero de Lote',
                        name: 'nlote',
                        id: 'nLoteId',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                      },
                    new Ext.form.DisplayField({value:' Ton. Ingresadas (T) : ',style :'color:#15428b;padding-left: 11px;'}),
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
                    new Ext.form.DisplayField({value:' Humedad (%) : ',style :'color:#15428b;padding-left: 11px;'}),
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
                    new Ext.form.DisplayField({value:' Humedad en Ton : ',style :'color:#15428b;padding-left: 11px;'}),
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
                    new Ext.form.DisplayField({value:' Ton. Secas : ',style :'color:#15428b;padding-left: 11px;'}),
                       {
                        fieldLabel: 'Ton. Secas',
                        id: 'tonSecasId',
                        name: 'ton_secas',
                        width: 150,
                        allowBlank: false,
                        readOnly: true,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Merme Operacional : ',style :'color:#15428b;padding-left: 11px;'}),
                       {
                        fieldLabel: 'Merme Operacional',
                        name: 'merme',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Ton. Efectivas : ',style :'color:#15428b;padding-left: 11px;'}),
                       {
                        fieldLabel: 'Ton. Efectivas',
                        id:'add',
                        name: 'ton_efectivos',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                       },
                    new Ext.form.DisplayField({value:' Ton. Concentrado : ',style :'color:#15428b;padding-left: 11px;'}),
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
                        labelStyle: 'color:#15428b;padding-left: 11px;',
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

    },
    /*
    *Funcion "rendered" para cambiar valores que vengan de la bdd y parsearlo para mostrarlo en el grid como corresponde
    */

    getMainForm: function() {
          
            return new Ext.form.FormPanel({
                id: 'formSupervisor',
                frame: true,
                height: 600,
                style: 'padding-left:270px',
                width : 900,
                items: [
                    this.getInternalForm()
                ],
                    bbar :[new Ext.Toolbar.Fill(),this.actions.opBack]
            });
        
        

        
        }

    });
    