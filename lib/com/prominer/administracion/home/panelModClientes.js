/**
* Modulo 
*
* Panel principal del módulo usuarios
*/
Ext.ns('com.prominer.administracion.home');

com.prominer.administracion.home.PanelModClientes = new Ext.extend(Ext.Panel, {
    actions: {
        clientNew:null,
        clientEdit:null,
        clientDelete:null,
        clientRefresh:null,
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
        com.prominer.administracion.home.PanelModClientes.superclass.constructor.call(this, Ext.apply({
            title: 'Mantenedor de Clientes',
            width : 1080,
            iconCls: 'admin_client_16',
            id: 'PanelModClientesId',
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
         this.actions.clientNew = new Ext.Action({
            iconCls : 'op_add',
            xtype : 'fbbutton',
            id: 'userNuevoId',
            scale: 'small',
            text : 'Crear',
            tooltip : 'Crear Cliente',
            handler : this.handleActions.createDelegate(this, ['clientNew'])
        });
         
         this.actions.clientEdit = new Ext.Action({
            iconCls : 'op_edit',
            xtype : 'fbbutton',
            id: 'clientEditId',
            scale: 'small',
            text : 'Editar',
            tooltip : 'Editar Cliente',
            handler : this.handleActions.createDelegate(this, ['clientEdit'])
        });
         
         this.actions.clientDelete = new Ext.Action({
            iconCls : 'op_remove',
            xtype : 'fbbutton',
            id: 'clientDeleteId',
            scale: 'small',
            text : 'Desactivar',
            tooltip : 'Desactivar Cliente',
            handler : this.handleActions.createDelegate(this, ['clientDelete'])
        });
         
         this.actions.clientRefresh = new Ext.Action({
            iconCls : 'op_refresh',
            xtype : 'fbbutton',
            id: 'clientRefreshId',
            scale: 'small',
            text : 'Refrescar',
            tooltip : 'Refrescar',
            handler : this.handleActions.createDelegate(this, ['clientRefresh'])
        });
         
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
        //recuperamos todos los registros
        this.store = new Ext.data.JsonStore({
            url : './service/modClientes.php?accion=getClientes',
            method : 'POST',
            remoteSort : true,
            root : 'results',
            totalProperty: 'totalCount',
            idProperty: 'id',
            autoDestroy: true,
            fields: ['rut','nombre','direccion','ncontacto','telefono','mail','id']
        });
            
        this.store.on('load', function(str, recs, opt){
            if (recs.length == 0)
                Ext.Msg.alert('Sin registros', 'No se encontraron registros.');
        });

        this.store.setDefaultSort('nombre', 'ASC');
    },
    handleActions: function(a) {
        switch (a) {
            case 'clientRefresh':
                Ext.getCmp('gridClientesId').store.reload();
                break;
            case 'clientNew':
                    var w = new com.prominer.administracion.home.WinCrudClientes({
                        id: 'agregarUsId',
                        title: 'Agregar Cliente',
                        iconCls: 'op_add'
                    });
                    w.show();
                break;
            case 'clientEdit':
                //revisamos que este seleccionada una fila en el grid
                var sm = Ext.getCmp('gridClientesId').getSelectionModel();

                if (sm.getCount() == 0)
                    Ext.Msg.alert('Sin seleccion', 'Debe seleccionar una fila.');
                else {
                    var r = sm.getSelected();

                    var w = new com.prominer.administracion.home.WinCrudClientes({
                        id: 'editarUsId',
                        title: 'Editar Cliente : ' + r.get('nombre'),
                        idRow: r.id, //le pasamos el id del usuario para buscar sus datos
                        iconCls: 'op_edit'
                    });
                    w.show();
                }
                break;
            case 'opBack':
                    var p = new com.prominer.index.PanelBodyBar({});
                    var b = Ext.getDom('contentExtBody');
                    b.innerHTML='';
                    p.render('contentExtBody');
                break;
            case 'clientDelete':
                var sm = Ext.getCmp('gridClientesId').getSelectionModel();
                if (sm.getCount() == 0)
                    Ext.Msg.alert('Sin seleccion', 'Debe seleccionar una fila.');
                else {
                    var r = sm.getSelected();
                    Ext.Ajax.request({
                        url: './service/modClientes.php?accion=setDesactivateClient',
                        params: {
                            id: r.id
                        },
                        method: 'POST',
                        waitMsg: 'Procesando...',
                        waitTitle: 'Procesando peticion',
                        success: function(form, action) {
                            Ext.Msg.alert('Desactivado', 'Desactivado correctamente.')
                            Ext.getCmp('gridClientesId').store.removeAll();
                            Ext.getCmp('gridClientesId').store.reload();
                        },
                        failure: function(form, action) {
                            switch (action.failureType) {
                                case Ext.form.Action.CONNECT_FAILURE:
                                    Ext.Msg.alert('Error', 'Error de comunicacion con el servidor.');
                                    Ext.getCmp('idIngresoRetMed').close();
                                    break;
                                case Ext.form.Action.SERVER_INVALID:
                                    Ext.Msg.alert('Error', action.result.errorInfo);
                                    Ext.getCmp('idIngresoRetMed').close();
                                    break;
                            }
                        }
                    });
                }
                break;
        }
    },
    /*
    *Funcion "rendered" para cambiar valores que vengan de la bdd y parsearlo para mostrarlo en el grid como corresponde
    */
    getMainForm: function() {
        
            var gridClientes =  new Ext.grid.GridPanel({
                id : 'gridClientesId',
                style: 'padding:10px;',
                width : 800,
                height : 300,
                border : true,
                frame : false,
                loadMask : true,
                stripeRows : true,
                store : this.store,
                columns : [
                    {header: 'codeId', sortable : true, width : 60, dataIndex: 'id'},
                    {header: 'RUT', sortable : true, width : 90, dataIndex: 'rut'},
                    {header: 'Nombre', sortable : true, width : 150, dataIndex: 'nombre'},
                    {header: 'Direccion', sortable : true, width : 200, dataIndex: 'direccion'},
                    {header: 'Nombre Contacto', sortable : true, width : 120, dataIndex: 'ncontacto'},
                    {header: 'Telefono', sortable : true, width : 70, dataIndex: 'telefono'},
                    {header: 'Mail', sortable : true, width : 90, dataIndex: 'mail'}
                ],
                sm : new Ext.grid.RowSelectionModel({singleSelect : true}),
                tbar:[new Ext.Toolbar.Fill(),this.actions.clientNew,new Ext.Toolbar.Separator(),this.actions.clientEdit,new Ext.Toolbar.Separator(),this.actions.clientDelete,new Ext.Toolbar.Separator(),this.actions.clientRefresh],
                bbar :[new Ext.PagingToolbar({
                    pageSize : this.pageSize,
                    store : this.store,
                    displayInfo : true
                }),new Ext.Toolbar.Fill(),this.actions.opBack]
            });
        
        
        
            return new Ext.form.FormPanel({
                id: 'formClientes',
                frame: true,
                height: 300,
                style: 'padding-left:160px',
                width : 970,
                items: [
                    gridClientes
                ]
            });
        }

    });
    
    
    
    

/**
* ProMiner
* Windows Crear/Editar Usuario
*
* @package administracion
* 
*/
com.prominer.administracion.home.WinCrudClientes = new Ext.extend(Ext.Window, {
    actions: {
        guardar: null,
        cerrar: null
    },
    //hace referencia al ID dl usuario cuando se edita
    idRow: null,
    constructor: function(config) {
        this.initActions();
        this.initStores();
        com.prominer.administracion.home.WinCrudClientes.superclass.constructor.call(this, Ext.apply({
            width: 400,
            autoHeight: true,
            modal: true,
            resizable: false,
            items: [this.getInternalForm()],
            buttons: [this.actions.guardar, this.actions.cerrar]
        }, config));

        this.on('afterrender', function(c) {
            if (this.idRow != null)
                this.clientIdLoad();
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
                var f = Ext.getCmp('formclientId').getForm();

                if (f.isValid()) {
                  f.submit({
                        url : './service/modClientes.php?accion=setSaveClient',
                        method : 'POST',
                        waitMsg : 'Procesando...',
                        waitTitle: 'Procesando peticion',
                        success : function(form, action){
                                Ext.Msg.alert(this.idRow == null ? 'Creacion exitosa.' : 'Actualizacion exitosa.', action.result.info, function(){
                                Ext.getCmp('gridClientesId').store.reload({ params : {start : 0, limit : Ext.getCmp('PanelModClientesId').pageSize}});
                                if(this.idRow == null)
                                    Ext.getCmp('agregarUsId').close();
                                else
                                    Ext.getCmp('editarUsId').close();
                            }, this);
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
            case 'cerrar':
                this.close();
                break;
        }
    },

    getInternalForm: function() {
        return new Ext.form.FormPanel({
            id: 'formclientId',
            frame: true,
            border: false,
            autoHeight: true,
            waitTitle: 'Cargando datos',
            reader: new Ext.data.JsonReader({
                root: 'results',
                fields: [
                    {name: 'rut',mapping: 'rut'},
                    {name: 'nombre',mapping: 'nombre'},
                    {name: 'direccion',mapping: 'direccion'},
                    {name: 'ncontacto',mapping: 'ncontacto'},
                    {name: 'telefono',mapping: 'telefono'},
                    {name: 'mail',mapping: 'mail'},
                    {name: 'id',mapping: 'id'}
                ]
            }),
            items: [{
                id: 'fsformclientId',
                xtype: 'fieldset',
                title: 'Datos del Cliente',
                defaults: { labelWidth: 250 },
                defaultType: 'textfield',
                items: [
                    {
                        name: 'id',
                        value:0,
                        xtype: 'hidden'
                    },
                    {
                        fieldLabel: 'Rut Empresa',
                        name: 'rut',
                        width: 150,
                        allowBlank: false,
                        vtype:'rut',
                        blankText: 'Debe ingresar este campo'
                    },
                    {
                        fieldLabel: 'Nombre',
                        name: 'nombre',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                    },
                    {
                        fieldLabel: 'Direccion',
                        name: 'direccion',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                    },
                    {
                        fieldLabel: 'Nombre Contacto',
                        name: 'ncontacto',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                    },
                    {
                        fieldLabel: 'Telefono Contacto',
                        name: 'telefono',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                    },
                    {
                        fieldLabel: 'Mail Contacto',
                        name: 'mail',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                    }
                    ]
                }]
            });
        },

        clientIdLoad: function() {
        
            var f = Ext.getCmp('formclientId').getForm();
            //Cargo los datos del formulario desde el PHP
            f.load({
                waitMsg: 'Cargando...',
                params: { id: this.idRow },
                method : 'POST',
                root : 'results',
                totalProperty: 'totalCount',
                idProperty: 'id',
                fields: ['rut','nombre','direccion','ncontacto','telefono','mail','id'],
                url: './service/modClientes.php?accion=getDatosClientes'
            });
        }

    });
    