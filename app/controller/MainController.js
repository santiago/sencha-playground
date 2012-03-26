Ext.define('Whiteboard.controller.MainController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'mainview',

            // Content
            home: 'home',
            workspace: 'workspace',

            // Workspace
            chatboard: 'chatboard',

            // Top Nav
            gotohome: '#gotohome',
            gotoworkspace: '#gotoworkspace'
        },

        control: {
            // Top Nav
            gotohome: {
                tap: 'navTap'
            },
            gotoworkspace: {
                tap: 'navTap'
            }
        }
    },

    navTap: function() {
        // this.getMain().setActiveItem(1);
    },

    launch: function() {
        Ext.create("Whiteboard.view.Chatboard");
    }
});
