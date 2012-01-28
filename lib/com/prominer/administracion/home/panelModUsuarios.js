/**
* Modulo 
*
* Panel principal del módulo usuarios
*/
Ext.ns('com.prominer.administracion.home');

com.prominer.administracion.home.PanelModUsuarios = new Ext.extend(Ext.Panel, {
    actions: {
        userNew:null,
        userEdit:null,
        userDelete:null,
        userRefresh:null,
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
        com.prominer.administracion.home.PanelModUsuarios.superclass.constructor.call(this, Ext.apply({
            title: 'Mantenedor de Usuarios',
            width : 1080,
            iconCls: 'admin_users_16',
            id: 'PanelModUsuariosId',
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
         this.actions.userNew = new Ext.Action({
            iconCls : 'op_add',
            xtype : 'fbbutton',
            id: 'userNuevoId',
            scale: 'small',
            text : 'Crear',
            tooltip : 'Crear Usuario',
            handler : this.handleActions.createDelegate(this, ['userNew'])
        });
         
         this.actions.userEdit = new Ext.Action({
            iconCls : 'op_edit',
            xtype : 'fbbutton',
            id: 'userEditId',
            scale: 'small',
            text : 'Editar',
            tooltip : 'Editar Usuario',
            handler : this.handleActions.createDelegate(this, ['userEdit'])
        });
         
         this.actions.userDelete = new Ext.Action({
            iconCls : 'op_remove',
            xtype : 'fbbutton',
            id: 'userDeleteId',
            scale: 'small',
            text : 'Desactivar',
            tooltip : 'Desactivar Usuario',
            handler : this.handleActions.createDelegate(this, ['userDelete'])
        });
         
         this.actions.userRefresh = new Ext.Action({
            iconCls : 'op_refresh',
            xtype : 'fbbutton',
            id: 'userRefreshId',
            scale: 'small',
            text : 'Refrescar',
            tooltip : 'Refrescar',
            handler : this.handleActions.createDelegate(this, ['userRefresh'])
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
            url : './service/modUsuarios.php?accion=getUsuarios',
            method : 'POST',
            remoteSort : true,
            root : 'results',
            totalProperty: 'totalCount',
            idProperty: 'id',
            autoDestroy: true,
            fields: ['usuario', 'passw', 'nombre', 'apellido','sexo','rol','id']
        });
            
        this.store.on('load', function(str, recs, opt){
            if (recs.length == 0)
                Ext.Msg.alert('Sin registros', 'No se encontraron registros.');
        });

        this.store.setDefaultSort('nombre', 'ASC');
    },
    handleActions: function(a) {
        switch (a) {
            case 'userRefresh':
                Ext.getCmp('gridUsauriosId').store.reload();
                break;
            case 'userNew':
                    var w = new com.prominer.administracion.home.WinCrudUsuarios({
                        id: 'agregarUsId',
                        title: 'Agregar Usuario',
                        iconCls: 'op_add'
                    });
                    w.show();
                break;
            case 'userEdit':
                //revisamos que este seleccionada una fila en el grid
                var sm = Ext.getCmp('gridUsauriosId').getSelectionModel();

                if (sm.getCount() == 0)
                    Ext.Msg.alert('Sin seleccion', 'Debe seleccionar una fila.');
                else {
                    var r = sm.getSelected();

                    var w = new com.prominer.administracion.home.WinCrudUsuarios({
                        id: 'editarUsId',
                        title: 'Editar Usuario : ' + r.get('nombre'),
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
            case 'userDelete':
                var sm = Ext.getCmp('gridUsauriosId').getSelectionModel();
                if (sm.getCount() == 0)
                    Ext.Msg.alert('Sin seleccion', 'Debe seleccionar una fila.');
                else {
                    var r = sm.getSelected();
                    Ext.Ajax.request({
                        url: './service/modUsuarios.php?accion=setDesactivateUser',
                        params: {
                            id: r.id
                        },
                        method: 'POST',
                        waitMsg: 'Procesando...',
                        waitTitle: 'Procesando peticion',
                        success: function(form, action) {
                            Ext.Msg.alert('Desactivado', 'Desactivado correctamente.')
                            Ext.getCmp('gridClientesId').store.removeAll();
                            Ext.getCmp('gridUsauriosId').store.reload();
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
    renderGenero: function(v) {
        return v == 'm' ? "Masculino" : "Femenino";
    },
    getMainForm: function() {
        
            var gridUsaurios =  new Ext.grid.EditorGridPanel({
                id : 'gridUsauriosId',
                style: 'padding:10px;',
                width : 620,
                height : 300,
                border : true,
                frame : false,
                loadMask : true,
                stripeRows : true,
                store : this.store,
                columns : [
                    {header: 'codeId', sortable : true, width : 60, dataIndex: 'id'},
                    {header: 'Usuario', sortable : true, width : 70, dataIndex: 'usuario'},
                    {header: 'Nombre', sortable : true, width : 150, dataIndex: 'nombre'},
                    {header: 'Apellido', sortable : true, width : 140, dataIndex: 'apellido'},
                    {header: 'Genero', sortable : true, width : 70, dataIndex: 'sexo', renderer: this.renderGenero},
                    {header: 'Cargo', sortable : true, width : 105, dataIndex: 'rol'}
                ],
                sm : new Ext.grid.RowSelectionModel({singleSelect : true}),
                tbar:[new Ext.Toolbar.Fill(),this.actions.userNew,new Ext.Toolbar.Separator(),this.actions.userEdit,new Ext.Toolbar.Separator(),this.actions.userDelete,new Ext.Toolbar.Separator(),this.actions.userRefresh],
                bbar :[new Ext.PagingToolbar({
                    pageSize : this.pageSize,
                    store : this.store,
                    displayInfo : true
                }),new Ext.Toolbar.Fill(),this.actions.opBack]
            });
        
        
        
            return new Ext.form.FormPanel({
                id: 'formUsuarios',
                frame: true,
                height: 300,
                style: 'padding-left:270px',
                width : 900,
                items: [
                    gridUsaurios
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
com.prominer.administracion.home.WinCrudUsuarios = new Ext.extend(Ext.Window, {
    actions: {
        guardar: null,
        cerrar: null
    },
    //hace referencia al ID dl usuario cuando se edita
    idRow: null,
    constructor: function(config) {
        this.initActions();
        this.initStores();
        com.prominer.administracion.home.WinCrudUsuarios.superclass.constructor.call(this, Ext.apply({
            width: 400,
            autoHeight: true,
            modal: true,
            resizable: false,
            items: [this.getInternalForm()],
            buttons: [this.actions.guardar, this.actions.cerrar]
        }, config));

        this.on('afterrender', function(c) {
            if (this.idRow != null)
                this.userIdLoad();
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
                var f = Ext.getCmp('formuserId').getForm();

                if (f.isValid()) {
                  f.submit({
                        url : './service/modUsuarios.php?accion=setSaveUser',
                        method : 'POST',
                        waitMsg : 'Procesando...',
                        waitTitle: 'Procesando peticion',
                        success : function(form, action){
                                Ext.Msg.alert(this.idRow == null ? 'Creacion exitosa.' : 'Actualizacion exitosa.', action.result.info, function(){
                                Ext.getCmp('gridUsauriosId').store.reload({ params : {start : 0, limit : Ext.getCmp('PanelModUsuariosId').pageSize}});
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
            id: 'formuserId',
            frame: true,
            border: false,
            autoHeight: true,
            waitTitle: 'Cargando datos',
            reader: new Ext.data.JsonReader({
                root: 'results',
                fields: [
                    {name: 'usuario',mapping: 'usuario'},
                    {name: 'passw',mapping: 'passw'},
                    {name: 'nombre',mapping: 'nombre'},
                    {name: 'apellido',mapping: 'apellido'},
                    {name: 'sexo',mapping: 'sexo'},
                    {name: 'rol',mapping: 'rol'},
                    {name: 'id',mapping: 'id'}
                ]
            }),
            items: [{
                id: 'fsformuserId',
                xtype: 'fieldset',
                title: 'Datos del Usuario',
                defaults: { labelWidth: 250 },
                defaultType: 'textfield',
                items: [
                    {
                        name: 'id',
                        value:0,
                        xtype: 'hidden'
                    },
                    {
                        fieldLabel: 'Usuario',
                        name: 'usuario',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                    },
                    {
                        fieldLabel: 'Clave',
                        name: 'passw',
                        width: 150,
                        allowBlank: false,
                        inputType:'password',
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
                        fieldLabel: 'Apellido',
                        name: 'apellido',
                        width: 150,
                        allowBlank: false,
                        blankText: 'Debe ingresar este campo'
                    },
                    {
                        xtype: 'combo',
                        mode: 'local', //local para arraystore y remote para jsonstore que busca a un php
                        fieldLabel: 'Genero',
                        name: 'sexo',
                        hiddenName: 'sexo',
                        width: 150,
                        allowBlank: false,
                        editable: false,
                        triggerAction: 'all',
                        displayField: 'nombre',
                        valueField: 'id',
                        emptyText:'< Elegir Genero >',
                        selecOnFocus: true,
                        typeAhead:true,
                        store:GLOBAL_STSexo,
                        blankText: 'Debe ingresar este campo'
                    },
                    {
                        xtype: 'combo',
                        mode: 'local', //local para arraystore y remote para jsonstore que busca a un php
                        fieldLabel: 'Rol',
                        name: 'rol',
                        hiddenName: 'rol',
                        width: 150,
                        allowBlank: false,
                        editable: false,
                        triggerAction: 'all',
                        displayField: 'nombre',
                        valueField: 'id',
                        emptyText:'< Elegir Rol >',
                        selecOnFocus: true,
                        typeAhead:true,
                        store:GLOBAL_STRoles,
                        blankText: 'Debe ingresar este campo'
                    }
                    ]
                }]
            });
        },

        userIdLoad: function() {
        
            var f = Ext.getCmp('formuserId').getForm();
            //Cargo los datos del formulario desde el PHP
            f.load({
                waitMsg: 'Cargando...',
                params: { id: this.idRow },
                method : 'POST',
                root : 'results',
                totalProperty: 'totalCount',
                idProperty: 'id',
                fields: ['usuario', 'passw', 'nombre', 'apellido','sexo','rol','id'],
                url: './service/modUsuarios.php?accion=getDatosUsuario'
            });
        }

    });
    