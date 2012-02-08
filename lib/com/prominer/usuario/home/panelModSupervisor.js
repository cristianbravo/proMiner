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
            frame: true,
            border: true,
            autoHeight: true,
            waitTitle: 'Cargando datos',
            items: [
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
    