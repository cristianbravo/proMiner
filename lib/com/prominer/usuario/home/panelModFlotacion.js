/**
* Modulo 
*
* Panel principal del módulo usuarios
*/
Ext.ns('com.prominer.usuario.home');

com.prominer.usuario.home.PanelModFlotacion = new Ext.extend(Ext.Panel, {
    actions: {
        guardar: null,
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
        com.prominer.usuario.home.PanelModFlotacion.superclass.constructor.call(this, Ext.apply({
            title: 'Control de Operación Flotacion',
            width : 1080,
            iconCls: 'user_flot_16',
            id: 'PanelModFlotacionId',
            height: 300,
            tbar: [this.getMainForm()]
        }, config));

        this.on('afterrender', function(c) {
            /*
            *Despues de cargar la web (On Load) buscamos datos de lso usuarios
            */
            this.store.load({ params : {start : 0, limit : this.pageSize}});
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
        
            this.actions.guardar = new Ext.Action({
            xtype: 'fbbutton',
            text: 'Guardar',
            height: 30,
            iconCls: 'op_save',
            tooltip: 'Guardar',
            handler: this.handleActions.createDelegate(this, ['guardar'])
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
        return new Ext.form.FormPanel({
            id: 'formuserId',
            frame: true,
            border: true,
            autoHeight: true,
            waitTitle: 'Cargando datos',
            items: [{
                id: 'fsformuserId',
                xtype: 'buttongroup',
                title: 'Numero de LOTE #34fd6',
                defaults: { labelWidth: 550,width:145 },
                columns: 4,
                defaultType: 'textfield',
                items: [
                    new Ext.form.DisplayField({value:' Nombre : ',style :'color:#15428b;padding-left: 11px;'}),
                    {
                        fieldLabel: 'Nombre',
                        id : 'idRutPacienteFarm',
                        name: 'usuario',
                        width: 140,
                        allowBlank: false,
                        disabled:true,
                        value:'Mauricio Barria',
                        blankText: 'Debe ingresar este campo',
                        
                    },
                    new Ext.form.DisplayField({value:' Fecha : ',style :'color:#15428b;padding-left: 11px;'}),
                    {
                        fieldLabel: 'Fecha',
                        id : 'fecha',
                        name: 'fecha',
                        width: 140,
                        allowBlank: false,
                        disabled:true,
                        value:'28/01/2012',
                        blankText: 'Debe ingresar este campo',
                        
                    },
                    new Ext.form.DisplayField({value:' Turno : ',style :'color:#15428b;padding-left: 11px;'}),
                    {
                        xtype: 'combo',
                        mode: 'local', //local para arraystore y remote para jsonstore que busca a un php
                        fieldLabel: 'Turno',
                        name: 'turno',
                        hiddenName: 'turno',
                        width: 140,
                        allowBlank: false,
                        editable: false,
                        triggerAction: 'all',
                        displayField: 'nombre',
                        valueField: 'id',
                        emptyText:'< Elegir Turno >',
                        selecOnFocus: true,
                        typeAhead:true,
                        store:GLOBAL_STTurno,
                        blankText: 'Debe ingresar este campo'
                    },
                    new Ext.form.DisplayField({value:' Incidentes / Accidentes : ',style :'color:#15428b;padding-left: 11px;'}),
                    {
                        name:'inci',
                        xtype: 'radiogroup',
                        fieldLabel: 'Incidentes / Accidentes',
                        allowBlank: false,
                        width: 80,                        
                        // Put all controls in a single column with width 100%
                        columns: 2,
                        items: [
                            {boxLabel: 'Si', name: 'inci-1'},
                            {boxLabel: 'No', name: 'inci-1',checked: true}
                        ]
                    },
                    new Ext.form.DisplayField({value:' Detención : ',style :'color:#15428b;padding-left: 11px;'}),                    
                    {
                        name:'deten',
                        xtype: 'radiogroup',
                        fieldLabel: 'Detención',
                        allowBlank: false,
                        width: 80,
                        // Put all controls in a single column with width 100%
                        columns: 2,
                        items: [
                            {boxLabel: 'Si', name: 'deten-1'},
                            {boxLabel: 'No', name: 'deten-1',checked: true}
                        ]
                    },
                    new Ext.form.DisplayField({value:' Derrames : ',style :'color:#15428b;padding-left: 11px;'}), 
                    {
                        name:'derra',
                        xtype: 'radiogroup',
                        fieldLabel: 'Derrames',
                        allowBlank: false,
                        width: 80,                        
                        // Put all controls in a single column with width 100%
                        columns: 2,
                        items: [
                            {boxLabel: 'Si', name: 'derra-1'},
                            {boxLabel: 'No', name: 'derra-1',checked: true}
                        ]
                    },
                    new Ext.form.DisplayField({value:' Observaciones : ',style :'color:#15428b;padding-left: 11px; vertical-align: top;'}),
                    {
                        xtype:'textarea',
                        fieldLabel: 'Observaciones',
                        name: 'obser',
                        width: 454,
                        colspan:3
                    }
                    ]
                },
                {
                id: 'asdf',
                xtype: 'buttongroup',
                title: 'Control Operacional de Reactivos en Grs.',
                defaults: { labelWidth: 550,width:145 },
                defaultType: 'textfield',
                items: [
                    {
                        fieldLabel: 'Nombre',
                        id : 'idRutPacienteFarm1',
                        name: 'usuario',
                        width: 140,
                        allowBlank: false,
                        disabled:true,
                        value:'Grid1',
                        blankText: 'Debe ingresar este campo'
                        
                    }
                    ] 
                },
                {
                id: 'asdfg',
                xtype: 'buttongroup',
                title: 'Control Operacional de Refuerzo de Reactivos en Grs.',
                defaults: { labelWidth: 550,width:145 },
                defaultType: 'textfield',
                items: [
                    {
                        fieldLabel: 'Nombre',
                        id : 'idRutPacienteFarm2',
                        name: 'usuario',
                        width: 140,
                        allowBlank: false,
                        disabled:true,
                        value:'Grid2',
                        blankText: 'Debe ingresar este campo'
                        
                    }
                    ] 
                },
           
                {
                id: 'ctformId',
                xtype: 'fieldset',
                title: 'Cierre de Turno',
                defaults: { labelWidth: 550,labelStyle: 'width:240px',width: 80 },
                autoWidth: true,
                defaultType: 'textfield',
                items: [
                    {
                        name:'ct_op1',
                        xtype: 'radiogroup',
                        fieldLabel: 'Mantención equipos',
                        allowBlank: false,
                        // Put all controls in a single column with width 100%
                        columns: 2,
                        items: [
                            {boxLabel: 'Si', name: 'ct_op-1'},
                            {boxLabel: 'No', name: 'ct_op-1',checked: true}
                        ]
                    },
                    {
                        fieldLabel: 'Niveles (tablas) - Pozo 1',
                        id : 'pozo1',
                        name: 'pozo1',
                    }, 
                    {
                        fieldLabel: 'Niveles (tablas) - Pozo 2',
                        id : 'pozo2',
                        name: 'pozo2',
                    }, 
                    {
                        fieldLabel: 'Niveles (tablas) - Pozo 3',
                        id : 'pozo3',
                        name: 'pozo3',
                    }, 
                    {
                        fieldLabel: 'Nº pozos en cancha secado',
                        id : 'npozos',
                        name: 'npozos',
                        width: 140,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo',
                    },                    
                    {
                        name:'ct_op2',
                        xtype: 'radiogroup',
                        fieldLabel: 'Embalse relaves OK',
                        allowBlank: false,
                        // Put all controls in a single column with width 100%
                        columns: 2,
                        items: [
                            {boxLabel: 'Si', name: 'ct_op-2'},
                            {boxLabel: 'No', name: 'ct_op-2',checked: true}
                        ]
                    },
                    {
                        name:'ct_op3',
                        xtype: 'radiogroup',
                        fieldLabel: 'Limpieza Área y equipos',
                        allowBlank: false,
                        // Put all controls in a single column with width 100%
                        columns: 2,
                        items: [
                            {boxLabel: 'Si', name: 'ct_op-3'},
                            {boxLabel: 'No', name: 'ct_op-3',checked: true}
                        ]
                    },
                    {
                        name:'ct_op4',
                        xtype: 'radiogroup',
                        fieldLabel: 'Área flotación operativa',
                        allowBlank: false,
                        // Put all controls in a single column with width 100%
                        columns: 2,
                        items: [
                            {boxLabel: 'Si', name: 'ct_op-4'},
                            {boxLabel: 'No', name: 'ct_op-4',checked: true}
                        ]
                    },
                    {
                        name:'ct_op5',
                        xtype: 'radiogroup',
                        fieldLabel: 'Insumos op/mant suficientes',
                        allowBlank: false,
                        // Put all controls in a single column with width 100%
                        columns: 2,
                        items: [
                            {boxLabel: 'Si', name: 'ct_op-5'},
                            {boxLabel: 'No', name: 'ct_op-5',checked: true}
                        ]
                    },
                    {
                        name:'ct_op6',
                        xtype: 'radiogroup',
                        fieldLabel: 'Insumos operación/mantención suficientes',
                        allowBlank: false,
                        // Put all controls in a single column with width 100%
                        columns: 2,
                        items: [
                            {boxLabel: 'Si', name: 'ct_op-6'},
                            {boxLabel: 'No', name: 'ct_op-6',checked: true}
                        ]
                    }                                   
                    ]
                }]
            });
        },
    /*
    *Funcion "rendered" para cambiar valores que vengan de la bdd y parsearlo para mostrarlo en el grid como corresponde
    */

    getMainForm: function() {
       
            return new Ext.form.FormPanel({
                id: 'formUsuarios',
                frame: true,
                height: 600,
                style: 'padding-left:270px',
                width : 900,
                items: [
                    this.getInternalForm()
                ],
                    bbar :[new Ext.Toolbar.Fill(),this.actions.guardar,this.actions.opBack]
            });
        
        

        
        }

    });
    