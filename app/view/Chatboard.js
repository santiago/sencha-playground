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
	        }
	    ]
    }
});