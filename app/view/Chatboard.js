Ext.define('Whiteboard.view.Chatboard', {
    extend: "Ext.Container",
    xtype: 'chatboard',

    config: {
	fullscreen: true,
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
	    }/*,
	    {
		id: 'chatlog',
		xtype: 'list',
		itemTpl: '<div class="avatar"><img src="http://www.gravatar.com/avatar/{gravatar}?s=40&d=mm" height="40"/></div><h3><strong<tpl if="me"> class="me"</tpl>>{from}</strong></h3><p>{message}</p>',
		emptyText: '<div class="emptymsg">Chat with your coworkers using the input below.</div>',
		cls: 'messagelist'
	    }*/
	]
    }
});