/**
* Modulo 
*
* panelUsuario.js - Panel principal del módulo
*/
Ext.ns('com.prominer.index');

com.prominer.index.PanelFootBar = new Ext.extend(Ext.Panel, {
    actions: {
        moduloMantenedor: null
    },
    constructor: function(config) {
        this.initActions();

        com.prominer.index.PanelFootBar.superclass.constructor.call(this, Ext.apply({
            width: 1080,
            id: 'PanelFootBarId',
            
            height: 30,
            tbar: ['<img width="' + GLOBAL_SRImageLogoWidth + '" height="' + GLOBAL_SRImageLogoHeight + '" src="' + GLOBAL_LogoSRURL + '" />', 
            new Ext.form.DisplayField({ value: 'ProMiner © 2012 | www.blackcolt.cl | mail: contacto@blackcolt.cl ', style: 'color:#15428b;padding-left: 180px;' })
]
        }, config));

        this.on('afterrender', function(c) {

        });
    },

    initActions: function() {

    },
    initStores: function() {

    },
    handleActions: function(a) {
        switch (a) {
            case 'init':

                break;
        }
    },
    getMainForm: function() {
        return new Ext.form.FormPanel({
            id: 'formMenuIndex',
            frame: true,
            buttonAlign: 'center',
            width: 1074,
            height: 27,
            items: [


            ]
        });
    }

});