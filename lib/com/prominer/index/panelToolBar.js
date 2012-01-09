/**
* Modulo 
*
* Panel principal del módulo
*/
Ext.ns('com.prominer.index');

com.prominer.index.PanelToolBar = new Ext.extend(Ext.Panel, {
    actions: {
        salir_app: null,
        help: null
    },
    constructor: function(config) {
        this.initActions();

        com.prominer.index.PanelToolBar.superclass.constructor.call(this, Ext.apply({
            width: 1080,
            id: 'menuPrincipalAsegId',
            height: 45,
            tbar: ['<img  src="' + GLOBAL_LogoURL + '" />', this.getMainForm()]
        }, config));

        this.on('afterrender', function(c) {
            GLOBAL_UserCookieId.load();
        });


    },

    initActions: function() {
        this.actions.salir_app = new Ext.Action({
            xtype: 'fbbutton',
            width: 50,
            text: 'Salir',
            iconCls: 'op_exit',
            tooltip: 'Salir de la aplicacion',
            handler: this.handleActions.createDelegate(this, ['salir_app'])
        });
        this.actions.help = new Ext.Action({
            width: 60,
            xtype: 'fbbutton',
            text: 'Ayuda',
            iconCls: 'op_help',
            tooltip: 'Manual de Ayuda',
            handler: this.handleActions.createDelegate(this, ['help'])
        });

    },
    initStores: function() {

    },
    handleActions: function(a) {
        switch (a) {
            case 'help':

                break;
            case 'salir_app':
                Ext.Msg.alert('Cerrar Sesion', 'Te has salido correctamente', function(b) {
                    if(b=='ok' || b=='cancel'){
                        var redirect = GLOBAL_UrlOff;
                        window.location = redirect;
                    }
                }); 
                break;

        }
    },
    getMainForm: function() {


        var userVarView = new Ext.form.DisplayField(
    {
        id: 'userIdText',
        iconCls: 'status_online',
        style: 'color:#15428b;font-weight: bold;padding-left:5px',
        width: 200
    }
    );


        var perfilVarView = new Ext.form.DisplayField(
    {
        id: 'perfilIdText',
        style: 'color:#15428b;font-weight: bold;padding-left:5px',
        Autowidth: true
    }
    );

        var versionVarView = new Ext.form.DisplayField(
    {
        id: 'versionIdText',
        style: 'color:#15428b;font-weight: bold;padding-left:5px',
        Autowidth: true
    }
    );


        var tbar = new Ext.Toolbar({
            style: 'border:0px solid #99BBE8;',
            width: 890,
            items: [
                 {
                     xtype: 'buttongroup',
                     title: 'DATOS DE SESIÓN',
                     columns: 2,
                     height: 75,
                     defaults: {
                         scale: 'small'
                     },
                     items: [
                    new Ext.form.DisplayField({ value: ' Usuario :', style: 'color:#15428b;padding-left:5px' }),
                    userVarView,
                    new Ext.form.DisplayField({ value: ' Perfil :', style: 'color:#15428b;padding-left:5px' }),
                    perfilVarView,
                    new Ext.form.DisplayField({ value: ' Version Sistema :', style: 'color:#15428b;padding-left:5px' }),
                    versionVarView
                    ]
                 }
                 ,

               new Ext.Toolbar.Fill(),

               {
                   xtype: 'buttongroup',
                   title: 'Cuenta de Usuario',
                   columns: 5,
                   height: 75,
                   defaults: {
                       scale: 'small'
                   },
                   items: [
                    {
                        text: 'Mi Cuenta',
                        iconCls: 'op_account',
                        menu: {
                            xtype: 'menu',
                            plain: true,
                            items: {
                                xtype: 'buttongroup',
                                title: 'Opciones',
                                columns: 1,
                                defaults: {
                                    xtype: 'button',
                                    scale: 'large',
                                    iconAlign: 'left'
                                },
                                items: [{
                                    text: 'Cambiar mis datos',
                                    scale: 'small',
                                    iconCls: 'application_form_edit',
                                    width: 130
}]
                                }
                            }
                        },
                        new Ext.Toolbar.Separator(),
                        this.actions.help,
                        new Ext.Toolbar.Separator(),
                        this.actions.salir_app
                        ]
               }

               ]



        });

        return tbar
    }

});