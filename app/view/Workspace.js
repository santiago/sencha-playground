var drawComponent = new Ext.draw.Component({
    // fullscreen: true,
    height: "100%",
    width: "100%",
    autoSize: true,
    style: 'background-color: white;',
    items: [{
        type: 'circle',
        fill: '#79BB3F',
        radius: 100,
        x: 100,
        y: 100
    }]
});

// drawComponent.surface.setSize(500, 1000);

Ext.define('Whiteboard.view.Chatboard', {
    extend: "Ext.Container",
    xtype: 'chatboard',

    config: {
	layout: 'fit',
	items: [
	    {
		xtype: 'toolbar',
		docked:'bottom',
		layout: 'hbox',
		items: [
		    {
			id: 'chattext', 
			xtype: "textfield",
			enableKeyEvents: true,
			flex: 2,
			placeHolder: "Enter a message...",
			text: "Normal"
		    },
		    {
			id: 'chatbutton', 
			xtype: "button",
			ui: 'plain',
			iconCls: 'chat2', 
			docked: 'right',
			iconMask: true
		    }
		]
	    },
	    {
		id: 'chatlog',
		xtype: 'list',
		itemTpl: '<div class="avatar"><img src="http://www.gravatar.com/avatar/{gravatar}?s=40&d=mm" height="40"/></div><h3><strong<tpl if="me"> class="me"</tpl>>{from}</strong></h3><p>{message}</p>',
		emptyText: '<div class="emptymsg">Chat with your coworkers using the input below.</div>',
		cls: 'messagelist'
	    }
	]
    }
});

Ext.define('Whiteboard.view.Whiteboard', {
    extend	: 'Ext.Container',
    xtype	: 'whiteboard',
    
    config: 
    {
	layout  : 'vbox',
	width: '100%',
	// height: '100%',
	style: 'background-color: #f0f0f0;',
		
	items: 
	[
	    {
		xtype: 'toolbar',
		docked: 'bottom',
		hidden	: false,
		items: 
		[
		    {
			xtype: 'spacer'
		    },
		    {
			docked: 'right',
			itemId: 'addRectangleButton',
			iconCls: 'blank', 
			iconMask: true,
			ui: 'plain'
		    },
		    {
			docked: 'right',
			itemId: 'addCircleButton',
			iconCls: 'circle',
			iconMask: true,
			ui: 'plain'
		    },
		    {
			docked: 'right',
			itemId: 'addTextButton',
			iconCls: 'font',
			iconMask: true,
			ui: 'plain'
		    },
		    {
			docked: 'right',
			itemId: 'deleteButton',
			iconCls: 'delete', 
			iconMask: true,
			ui: 'plain'
		    }
		]
	    }, drawComponent
	]
    }
});

Ext.define('Whiteboard.view.Workspace', {
    extend: "Ext.Panel",
    xtype: 'workspace',

    config: {
	title: 'Whiteboard',
	layout: 'hbox',
	fullscreen: true,

	items: [
	    {
		xtype: 'chatboard',
		docked: 'left',
		width: '25%',
		style: 'border-right: 1px solid'

	    },
	    {
		xtype: 'whiteboard'
	    }
	]
    }
});