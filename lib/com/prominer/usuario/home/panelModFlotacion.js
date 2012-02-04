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
    storeTurno: null,
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
            
        GLOBAL_NombreUser.load();
        this.storeTurno.load();
            
        GLOBAL_NombreUser.on('load', function(str, recs, opt) {
            if (str.getCount() == 1) {
                if (!str.getAt(0).data.nombre) {
                        var redirect = GLOBAL_UrlOff;
                        window.location = redirect;
                } else {
                    Ext.getCmp('usuarioFlotId').setValue(str.getAt(0).data.nombre);
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
        //recuperamos todos los registros
        this.storeTurno = new Ext.data.JsonStore({
            url : './service/modFlotacion.php?accion=getTurnos',
            method : 'POST',
            root : 'results',
            idProperty: 'id',
            autoDestroy: true,
            fields: ['tipo_turno','id']
        });

    },
    handleActions: function(a) {
        switch (a) {
            case 'opBack':
                    var p = new com.prominer.index.PanelBodyBar({});
                    var b = Ext.getDom('contentExtBody');
                    b.innerHTML='';
                    p.render('contentExtBody');
                break;
            case 'guardar':
                var f = Ext.getCmp('formFlotId').getForm();


                //COR
                var gCOR = Ext.getCmp('gridCORId');
                var gridCOR = new Array();
                sm  = gCOR.getStore();
                for (var c = 0; c < sm.getCount(); c++){
                    if(sm.getAt(c).data.hora && sm.getAt(c).data.colect1 && sm.getAt(c).data.colect2 && sm.getAt(c).data.espumante && sm.getAt(c).data.modif && sm.getAt(c).data.act_dep && sm.getAt(c).data.ph){
                        gridCOR[c]=new Array();
                        gridCOR[c][0]= sm.getAt(c).data.hora;
                        gridCOR[c][1]= sm.getAt(c).data.colect1;
                        gridCOR[c][2]= sm.getAt(c).data.colect2;
                        gridCOR[c][3]= sm.getAt(c).data.espumante;
                        gridCOR[c][4]= sm.getAt(c).data.modif;
                        gridCOR[c][5]= sm.getAt(c).data.act_dep;
                        gridCOR[c][6]= sm.getAt(c).data.ph;
                    }
                }
                if(gridCOR){
                    var jsonGridCOR = Ext.util.JSON.encode(gridCOR);
                }else{
                    var jsonGridCOR = Ext.util.JSON.encode(new Array());
                }
                //CORR
                var gCORR = Ext.getCmp('gridCORRId');
                var gridCORR = new Array();
                sm  = gCORR.getStore();
                for (var c = 0; c < sm.getCount(); c++){
                    if(sm.getAt(c).data.hora && sm.getAt(c).data.colect1 && sm.getAt(c).data.colect2 && sm.getAt(c).data.espumante && sm.getAt(c).data.modif && sm.getAt(c).data.act_dep && sm.getAt(c).data.cal_kil){
                        gridCORR[c]=new Array();
                        gridCORR[c][0]= sm.getAt(c).data.hora;
                        gridCORR[c][1]= sm.getAt(c).data.colect1;
                        gridCORR[c][2]= sm.getAt(c).data.colect2;
                        gridCORR[c][3]= sm.getAt(c).data.espumante;
                        gridCORR[c][4]= sm.getAt(c).data.modif;
                        gridCORR[c][5]= sm.getAt(c).data.act_dep;
                        gridCORR[c][6]= sm.getAt(c).data.cal_kil;
                    }
                }
                if(gridCORR){
                    var jsonGridCORR = Ext.util.JSON.encode(gridCORR);
                }else{
                    var jsonGridCORR = Ext.util.JSON.encode(new Array());
                }
            
                if (f.isValid()) {
                  f.submit({
                        url : './service/modFlotacion.php?accion=setSaveFlotacion',
                        params: {
                            gridCOR:jsonGridCOR,                            
                            gridCORR:jsonGridCORR
                        },
                        method : 'POST',
                        waitMsg : 'Procesando...',
                        waitTitle: 'Procesando peticion',
                        success : function(form, action){
                            Ext.Msg.alert('Registro Guardado', 'Se guardo el registro exitosamente.');
                            var p = new com.prominer.index.PanelBodyBar({});
                            var b = Ext.getDom('contentExtBody');
                            b.innerHTML='';
                            p.render('contentExtBody');
                        },
                        scope : this,
                        failure : function(form, action){
                            switch (action.failureType) {
                                case Ext.form.Action.CLIENT_INVALID:
                                    Ext.Msg.alert('Informacion incompleta', 'Debe ingresar toda la informacion requerida.')
                                break;
                                case Ext.form.Action.CONNECT_FAILURE:
                                                                Ext.Msg.alert('Error', 'Error de comunicacion con el servidor.');
                                break;
                                case Ext.form.Action.SERVER_INVALID:
                                    Ext.Msg.alert('Error', action.result.info);
                                break;
                           }
                        }
                    });
                }else{
                    Ext.Msg.alert('Error', 'Rellena los campos del formulario.');
                } 
                break;
        }       
    },
    getInternalForm: function() {
        
        var arrayCOR = new Ext.data.ArrayStore({
                id: 0,
                fields: ['id','hora','colect1','colect2','colect2','espumante','modif','act_dep','ph'],
                data: [
                       [1,'','','','','','',''],
                       [2,'','','','','','',''],
                       [3,'','','','','','',''],
                       [4,'','','','','','',''],
                       [5,'','','','','','',''],
                       [6,'','','','','','',''],
                       [7,'','','','','','',''],
                       [8,'','','','','','',''],
                       [9,'','','','','','',''],
                       [10,'','','','','','','']
               ]
        });
        var arrayCORR = new Ext.data.ArrayStore({
                id: 0,
                fields: ['id','hora','colect1','colect2','colect2','espumante','modif','act_dep','cal_kil'],
                data: [
                       [1,'','','','','','',''],
                       [2,'','','','','','',''],
                       [3,'','','','','','',''],
                       [4,'','','','','','',''],
                       [5,'','','','','','',''],
                       [6,'','','','','','',''],
                       [7,'','','','','','',''],
                       [8,'','','','','','',''],
                       [9,'','','','','','',''],
                       [10,'','','','','','','']
               ]
        });
        var gridCOR =  new Ext.grid.EditorGridPanel({
                id : 'gridCORId',
                width : 605,
                title: 'Control Operacional de Reactivos en Grs',
                clicksToEdit : 1,
                height : 130,
                border : false,
                frame : true,
                loadMask : true,
                stripeRows : true,
                store : arrayCOR,
                columns : [
                    {header: '#', sortable : true, width : 30, dataIndex: 'id',editable: false},
                    {header: 'Hora', sortable : true, width : 70, dataIndex: 'hora',editor: new Ext.form.TimeField({increment: 60, format:'H:i'})},
                    {header: 'Colector 1', sortable : true, width : 70, dataIndex: 'colect1',editor: new Ext.form.TextField({})},
                    {header: 'Colector 2', sortable : true, width : 70, dataIndex: 'colect2',editor: new Ext.form.TextField({})},
                    {header: 'Espumante', sortable : true, width : 70, dataIndex: 'espumante',editor: new Ext.form.TextField({})},
                    {header: 'Modificador', sortable : true, width : 80, dataIndex: 'modif',editor: new Ext.form.TextField({})},
                    {header: 'Activador/Depresor', sortable : true, width : 120, dataIndex: 'act_dep',editor: new Ext.form.TextField({})},
                    {header: 'pH', sortable : true, width : 60, dataIndex: 'ph',editor: new Ext.form.TextField({})}
                ],
                sm : new Ext.grid.RowSelectionModel({singleSelect : true})
            });

          var gridCORR =  new Ext.grid.EditorGridPanel({
                id : 'gridCORRId',
                width : 605,
                title: 'Control Operacional de Refuerzo de Reactivos en Grs',
                clicksToEdit : 1,
                height : 130,
                border : false,
                frame : true,
                loadMask : true,
                stripeRows : true,
                store : arrayCORR,
                columns : [
                    {header: '#', sortable : true, width : 30, dataIndex: 'id',editable: false},
                    {header: 'Hora', sortable : true, width : 70, dataIndex: 'hora',editor: new Ext.form.TimeField({increment: 60, format:'H:i'})},
                    {header: 'Colector 1', sortable : true, width : 70, dataIndex: 'colect1',editor: new Ext.form.TextField({})},
                    {header: 'Colector 2', sortable : true, width : 70, dataIndex: 'colect2',editor: new Ext.form.TextField({})},
                    {header: 'Espumante', sortable : true, width : 70, dataIndex: 'espumante',editor: new Ext.form.TextField({})},
                    {header: 'Modificador', sortable : true, width : 80, dataIndex: 'modif',editor: new Ext.form.TextField({})},
                    {header: 'Activador/Depresor', sortable : true, width : 120, dataIndex: 'act_dep',editor: new Ext.form.TextField({})},
                    {header: 'Cal/Kg', sortable : true, width : 60, dataIndex: 'cal_kil',editor: new Ext.form.TextField({})}
                ],
                sm : new Ext.grid.RowSelectionModel({singleSelect : true})
            });
        return new Ext.form.FormPanel({
            id: 'formFlotId',
            frame: false,
            border: false,
            title: 'Numero de LOTE #34fd6',
            autoHeight: true,
            width : 605,
            waitTitle: 'Cargando datos',
            items: [{
                id: 'fsformuserId',
                xtype: 'buttongroup',
                
                defaults: { labelWidth: 550,width:145 },
                columns: 4,
                defaultType: 'textfield',
                items: [
                    new Ext.form.DisplayField({value:' Nombre : ',style :'color:#15428b;padding-left: 11px;'}),
                    {
                        fieldLabel: 'Nombre',
                        id : 'usuarioFlotId',
                        name: 'usuario',
                        width: 140,
                        allowBlank: false,
                        readOnly: true,
                        blankText: 'Debe ingresar este campo',
                        
                    },
                    new Ext.form.DisplayField({value:' Fecha : ',style :'color:#15428b;padding-left: 11px;'}),
                    {
                        fieldLabel: 'Fecha',
                        id : 'fecha',
                        name: 'fecha',
                        width: 140,
                        allowBlank: false,
                        readOnly: true,
                        value: new Date().format('Y-m-d'),
                        format : 'Y-m-d',
                        blankText: 'Debe ingresar este campo',
                        
                    },
                    new Ext.form.DisplayField({value:' Turno : ',style :'color:#15428b;padding-left: 11px;'}),
                    {
                        xtype: 'combo',
                        mode: 'remote', //local para arraystore y remote para jsonstore que busca a un php
                        fieldLabel: 'Turno',
                        name: 'turno',
                        hiddenName: 'turno',
                        width: 140,
                        allowBlank: false,
                        editable: false,
                        triggerAction: 'all',
                        displayField: 'tipo_turno',
                        valueField: 'id',
                        emptyText:'< Elegir Turno >',
                        selecOnFocus: true,
                        typeAhead:true,
                        store:this.storeTurno,
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
                            {boxLabel: 'Si', name: 'inci-1',inputValue : 1},
                            {boxLabel: 'No', name: 'inci-1',inputValue : 0,checked: true}
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
                            {boxLabel: 'Si', name: 'deten-1',inputValue : 1 },
                            {boxLabel: 'No', name: 'deten-1',inputValue : 0,checked: true}
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
                            {boxLabel: 'Si', name: 'derra-1',inputValue : 1},
                            {boxLabel: 'No', name: 'derra-1',inputValue : 0,checked: true}
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
                gridCOR,
                gridCORR,
                {title: 'Cierre de Turno',xtype: 'panel',width : 605},
                {
                xtype: 'fieldset',
                width : 605,
                frame:true,
                border:true,
                
                defaults: { labelWidth: 550,labelStyle: 'width:240px',width: 80 },
                defaultType: 'textfield',
                items: [
                    {
                        id:'ct_op1',
                        xtype: 'radiogroup',
                        fieldLabel: 'Mantención equipos',
                        allowBlank: false,
                        // Put all controls in a single column with width 100%
                        columns: 2,
                        items: [
                            {boxLabel: 'Si', name: 'ct_me',inputValue : 1},
                            {boxLabel: 'No', name: 'ct_me',inputValue : 0,checked: true}
                        ]
                    },
                    {
                        fieldLabel: 'Niveles (tablas) - Pozo 1',
                        name: 'ct_p1'
                    }, 
                    {
                        fieldLabel: 'Niveles (tablas) - Pozo 2',
                        name: 'ct_p2'
                    }, 
                    {
                        fieldLabel: 'Niveles (tablas) - Pozo 3',
                        name: 'ct_p3'
                    }, 
                    {
                        fieldLabel: 'Nº pozos en cancha secado',
                        name: 'ct_np',
                        width: 140,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                    },                    
                    {
                        name:'ct_op2',
                        xtype: 'radiogroup',
                        fieldLabel: 'Embalse relaves OK',
                        allowBlank: false,
                        // Put all controls in a single column with width 100%
                        columns: 2,
                        items: [
                            {boxLabel: 'Si', name: 'ct_er',inputValue : 1},
                            {boxLabel: 'No', name: 'ct_er',inputValue : 0,checked: true}
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
                            {boxLabel: 'Si', name: 'ct_lae',inputValue : 1},
                            {boxLabel: 'No', name: 'ct_lae',inputValue : 0,checked: true}
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
                            {boxLabel: 'Si', name: 'ct_afo',inputValue : 1},
                            {boxLabel: 'No', name: 'ct_afo',inputValue : 0,checked: true}
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
                            {boxLabel: 'Si', name: 'ct_ioms',inputValue : 1},
                            {boxLabel: 'No', name: 'ct_ioms',inputValue : 0,checked: true}
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
                height: 780,
                style: 'padding-left:270px',
                width : 890,
                items: [
                    this.getInternalForm()
                ],
                    bbar :[new Ext.Toolbar.Fill(),this.actions.guardar,this.actions.opBack]
            });
        
        

        
        }

    });
    