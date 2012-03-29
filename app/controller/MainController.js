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

    // Dynamically show Content views
    // I just don't want to hardcode indexes
    // Of course this requires to follow a convention:
    // nav buttons must be prefixed with 'goto' followed
    // by the named 'ref' for the corresponding component.
    navTap: function(c) {
        var object= function(self) {
            var id= c.getId().replace(/goto/,'');
            id= id.charAt(0).toUpperCase() + id.slice(1);
            return self['get'+id]();
        }(this);
        this.getMain().setActiveItem(object);
    },

    launch: function() {
        Ext.create("Whiteboard.view.Workspace");
        // Ugly workaround
        this.getWorkspace().show();
    }
});
