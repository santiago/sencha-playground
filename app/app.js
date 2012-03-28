Ext.Loader.setConfig({ enabled: true });

Ext.application({
    name: 'Whiteboard',
    views: ['Workspace'],
    controllers: ['MainController']
});

Ext.io.setup({
    logLevel:'debug',
    debug: true,
    appId:"XB2YHJ8VyXbGt5zHhG1bqCKgTFa",
    deviceId:"MG0gdRij06sNRCG3gC0gLnO6gGB",
    url:"http://msg.sencha-dev.io:80",
    transportName:'socket'
});