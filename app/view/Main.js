Ext.define('Whiteboard.view.Home', {
    extend: "Ext.Panel",
    xtype: 'home',
    config: {
	html: "Home"
    }
});

Ext.define('Whiteboard.view.Main', {
    extend: 'Ext.Container',

    xtype: 'mainview',

    // require: ['Whiteboard.view.Chatboard'],

    config: {
        fullscreen: true,
	hidden: false,
	layout: 'card',

	items: [
	    {
	    	xtype: 'home'
	    },
	    {
	    	xtype: 'workspace'
	    },
            {
                id: 'mainNav',
                xtype : 'titlebar',
                docked: 'top',
                title : 'Whiteboard',
	    	ui: 'gray',
                items: [
	    	    {
	    		xtype : 'button',
	    		id: 'gotohome',
	    		iconMask: true,
	    		iconCls: 'home',
	    		ui: 'plain'
                    },
	    	    {
	    		xtype : 'button',
	    		id: 'gotoworkspace',
	    		iconMask: true,
	    		iconCls: 'compose',
	    		ui: 'plain'
                    }
	    	]
            }
	]
    }
});