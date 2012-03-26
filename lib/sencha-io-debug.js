
(function(){

    var patch_st2_b2b3rc= function(){

        Ext.data.Store.prototype.storeSync= Ext.data.Store.prototype.sync;

        Ext.data.Store.override({
            /**
             * Synchronizes the Store with its Proxy. This asks the Proxy to batch together any new, updated
             * and deleted records in the store, updating the Store's internal representation of the records
             * as each operation completes.
             */
            sync: function(callback,scope) {
                if (this.getProxy().sync==undefined) {
                    return this.storeSync();
                }else{
                    return this.getProxy().sync(this,callback,scope);
                }
            },
        });
    };

    var patch_ext41_b2= function(){

        Ext.data.Store.prototype.storeSync= Ext.data.AbstractStore.prototype.sync;

        Ext.data.Store.override({
            /**
             * Synchronizes the Store with its Proxy. This asks the Proxy to batch together any new, updated
             * and deleted records in the store, updating the Store's internal representation of the records
             * as each operation completes.
             */
            sync: function(callback,scope) {
                if (this.getProxy().sync==undefined) {
                    return this.storeSync();
                }else{
                    return this.getProxy().sync(this,callback,scope);
                }
            },
        });
        
    };
    
    var m= "ERROR: The Sencha.io SDK requires either the Sencha Touch SDK or the Sencha Ext JS SDK.";
    if(typeof Ext==='undefined'){
        console.log(m);
        throw m;
    }else{
        var coreVersion= Ext.getVersion('core');
        if(!coreVersion){
            var t= m+" Ext is defined, but getVersion('core') did not return the expected version information.";
            console.log(t);
            throw t;
        }else{
            var version= coreVersion.version;
            switch(version){
                default:
            }
            var touchVersion= Ext.getVersion('touch');
            var extjsVersion= Ext.getVersion('extjs');
            if(touchVersion && extjsVersion){
                var t= "WARNING: Both the Sencha Touch SDK and the Sencha Ext JS SDK have been loaded. This could lead to unpredicatable behaviour.";
                console.log(t);
            }
            if(!touchVersion && !extjsVersion){
                var t= m+" The Ext Core SDK is on its own is not sufficient.";
                console.log(t);
                throw t;
            }
            if(extjsVersion){
                var version= extjsVersion.version;
                switch(version){
                    case '4.1.0':
                        // TODO patching as required...
                        break;                    
                    default:
                        var t= m+" Version "+version+" of the Sencha Ext SDK and this version of the Sencha.io SDK are not fully compatible.";
                        console.log(t);
                        throw t;
                }
            }else if(touchVersion){
                var version= touchVersion.version;
                switch(version){
                    case '2.0.0.beta2':
                    case '2.0.0.beta3':
                    case '2.0.0.rc':
                        patch_st2_b2b3rc();
                        break;
                    default:
                        var t= m+" Version "+version+" of the Sencha Touch SDK and this version of the Sencha.io SDK are not fully compatible.";
                        console.log(t);
                        throw t;
                }
            }else{
                var t= m+" They were here, but now I can't find them.";
                console.log(t);
                throw t;
            }
        }
    }
})();

Ext.setVersion('sio', '0.0.1');

Ext.util.MD5 = function(s,raw,hexcase,chrsz) { // JCM Md5, use Ext.define
	raw = raw || false;	
	hexcase = hexcase || false;
	chrsz = chrsz || 8;

	function safe_add(x, y){
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}
	function bit_rol(num, cnt){
		return (num << cnt) | (num >>> (32 - cnt));
	}
	function md5_cmn(q, a, b, x, s, t){
		return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
	}
	function md5_ff(a, b, c, d, x, s, t){
		return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t){
		return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t){
		return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t){
		return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}

	function core_md5(x, len){
		x[len >> 5] |= 0x80 << ((len) % 32);
		x[(((len + 64) >>> 9) << 4) + 14] = len;
		var a =  1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d =  271733878;
		for(var i = 0; i < x.length; i += 16){
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
			d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
			c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
			b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
			a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
			d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
			c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
			b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
			a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
			d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
			c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
			b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
			a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
			d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
			c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
			b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
			a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
			d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
			c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
			b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
			a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
			d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
			c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
			b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
			a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
			d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
			c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
			b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
			a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
			d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
			c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
			b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
			a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
			d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
			c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
			b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
			a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
			d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
			c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
			b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
			a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
			d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
			c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
			b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
			a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
			d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
			c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
			b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
			a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
			d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
			c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
			b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
			a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
			d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
			c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
			b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
			a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
			d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
			c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
			b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
			a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
			d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
			c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
			b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
			a = safe_add(a, olda);
			b = safe_add(b, oldb);
			c = safe_add(c, oldc);
			d = safe_add(d, oldd);
		}
		return [a, b, c, d];
	}
	function str2binl(str){
		var bin = [];
		var mask = (1 << chrsz) - 1;
		for(var i = 0; i < str.length * chrsz; i += chrsz) {
			bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
		}
		return bin;
	}
	function binl2str(bin){
		var str = "";
		var mask = (1 << chrsz) - 1;
		for(var i = 0; i < bin.length * 32; i += chrsz) {
			str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
		}
		return str;
	}
	
	function binl2hex(binarray){
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for(var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) + hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
		}
		return str;
	}
	return (raw ? binl2str(core_md5(str2binl(s), s.length * chrsz)) : binl2hex(core_md5(str2binl(s), s.length * chrsz))	);
};

Ext.define('Ext.util.LoggerConstants', {
    statics: {
        NONE: 10,
        ERROR: 4,
        WARNING: 3,
        INFO: 2,
        DEBUG: 1,

        STR_TO_LEVEL: {
          "debug": 1,
          "info": 2,
          "warn": 3,
          "error": 4,
          "none": 10,
        },
    }
});

Ext.define('Ext.util.Logger', {
    statics: {
        level: Ext.util.LoggerConstants.ERROR,

        setLevel: function(levelString) {
            if(Ext.util.LoggerConstants.STR_TO_LEVEL[levelString]) {
                Ext.util.Logger.level = Ext.util.LoggerConstants.STR_TO_LEVEL[levelString];
            } else {
                Ext.util.Logger.level = Ext.util.LoggerConstants.NONE;
            }
        },

        debug: function() {
            if(Ext.util.Logger.level <= Ext.util.LoggerConstants.DEBUG) {
                Ext.util.Logger.message('DEBUG:',arguments);
            }
        },

        info: function() {
            if(Ext.util.Logger.level <= Ext.util.LoggerConstants.INFO) {
                Ext.util.Logger.message('INFO:',arguments);
            }
        },

        warn: function() {
            if(Ext.util.Logger.level <= Ext.util.LoggerConstants.WARNING) {
                Ext.util.Logger.message('WARNING:',arguments);
            }
        },

        error: function() {
            if(Ext.util.Logger.level <= Ext.util.LoggerConstants.ERROR) {
                Ext.util.Logger.message('ERROR:',arguments);
            }
        },

        message: function(level,a){
            var b= Array.prototype.slice.call(a);
            b.unshift(level);
            console.log.apply(console,b);
        }

    }
});



Ext.util.UUIDGenerator= { // JCM Uuid, Use Ext.define
	
	generate: function() { // totally random uuid
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		    return v.toString(16);
		});
	},

};


Ext.define('Ext.util.LocalStorage', {
	statics: {
		getItem: function(key) {
			var store= window.localStorage;
			if (store) {
				return store.getItem(key);
			}
		},

		setItem: function(key,value) {
			var store= window.localStorage;
			if (store) {
				store.setItem(key,value);
			}
		},

		removeItem: function(key) {
			var store= window.localStorage;
			if (store) {
				store.removeItem(key);
			}
		},
	}
});



Ext.define('Ext.util.SessionStorage', {
	statics: {
		getItem: function(key) {
			var store= window.sessionStorage;
			if (store) {
				return store.getItem(key);
			}
		},

		setItem: function(key,value) {
			var store= window.sessionStorage;
			if (store) {
				store.setItem(key,value);
			}
		},

		removeItem: function(key) {
			var store= window.sessionStorage;
			if (store) {
				store.removeItem(key);
			}
		},
	}
});
/**
 * {@img diagram.003.png Class Diagram}
 *
 * Ext.io is the namespace and entry point for the Sencha.io SDK.
 *
 * It has static methods to get hold of the current {@link Ext.io.App}, {@link Ext.io.Device}, {@link Ext.io.User} or 
 * {@link Ext.io.Group} objects.
 *
 * A factory method is available for getting a named queue through which messages can be 
 * passed between clients.
 * 
 */
Ext.define('Ext.io', {

    statics: {

        config: {
            url: 'http://msg.sencha.io',
        },

        /**
         * @private
         */
        messaging: null,

        /**
         * @private
         */
        storeDirectory: null,

        /**
         * Setup Ext.io for use.
         *
         * @param {Object} config
         * @param {String} config.appId
         * @param {String} config.url the server URL. Defaults to http://msg.sencha.io
         * @param {String} config.logLevel logging level. Should be one of "none", "debug", "info", "warn" or "error". Defaults to "error".
         * @param {String} config.transportName the transport type to use for communicating with the server. Should be one of "polling" (HTTP polling) or "socket" (SocketIO). Defaults to "polling".
         * @param {Boolean} config.piggybacking for "polling" transport, if HTTP responses can carry piggybacked envelopes from the server. Defaults to true.
         * @param {Number} config.maxEnvelopesPerReceive for "polling" transport, the maximum number of envelopes to return in one poll request. Defaults to 10.
         * @param {Number} config.pollingDuration for "polling" transport, the duration in milliseconds between poll requests. Defaults to 5 seconds.
         * @param {Number} config.rpcTimeoutDuration for RPC calls, the maximum time to wait for a reply from the server, after which an error is returned to the caller. Defaults to 60 seconds.
         * @param {Number} config.rpcTimeoutCheckInterval how often the RPC timeout check should be performed. Defaults to 5 seconds.
         *
         * Calling this method is optional. It assumes the defaults mentioned above if not called.
         */
        setup: function(config) {
            Ext.apply(Ext.io.config, config);
        },

        /**
         * @private
         */
        init: function() {

            if (!this.initialized) {

                if (Ext.io.config.logLevel) {
                    Ext.util.Logger.setLevel(Ext.io.config.logLevel);
                }

                try {
                    Ext.io.storeDirectory = Ext.create('Ext.io.data.Directory', {});
                } catch(e) {
                    Ext.util.Logger.error("SIO data directory could not be created");
                }
                

                /*
                 * Every App has an Id and a Key.
                 */
                
                var appId= Ext.naming.IDStore.stash('app','id',Ext.io.config.appId);

                if (!appId) {
                    Ext.util.Logger.error('Could not find App Id.');
                    Ext.util.Logger.error('The App Id is either provided by Sencha.io when the App is served, or can be passed through Ext.io.setup');
                }
                
                // var appKey= Ext.naming.IDStore.stash('app','key',Ext.io.config.appKey);
                // if (!appKey) {
                //    Ext.util.Logger.error('Could not find App Key.');
                // }

                // if (!appKey) {
                //    Ext.util.Logger.error('The App Key is either provided by Sencha.io when the App is served, or can be passed through Ext.io.setup');
                // }


                /*
                 * Every Device has an Id and a Session Id.
                 */
                var deviceId= Ext.naming.IDStore.stash('device','id',Ext.io.config.deviceId);
                var deviceKey= Ext.naming.IDStore.stash('device','key',Ext.io.config.deviceKey);
                var deviceSid= Ext.naming.IDStore.getSid('device')||Ext.io.config.deviceSid;

                if (!deviceId) {
                    Ext.util.Logger.warn('Could not find Device Id.');
                    Ext.util.Logger.warn('The Device Id is provided by Sencha.io when the App is served, or by calling Ext.io.App.register.');
                }
                // if(!deviceSid) {
                //     deviceSid = Ext.io.config.deviceSid;
                // }
                //if (!deviceSid) {
                //    Ext.util.Logger.error('Could not find Device Session Id.');
                //    Ext.util.Logger.warn('The Device Session Id is provided by Sencha.io when the App is served, or by calling Ext.io.App.authenticate.');
                //}

                // if (!deviceSid) {
                //     Ext.util.Logger.error('Could not find Device Session Id.');
                //     Ext.util.Logger.warn('The Device Session Id is provided by Sencha.io when the App is served, or by calling Ext.io.App.authenticate.');
                // }

                Ext.naming.IDStore.stash('group','id');
                Ext.naming.IDStore.stash('user','id');
                Ext.naming.IDStore.stash('developer','id');

                Ext.io.messaging = Ext.create(Ext.io.Messaging, Ext.io.config);


                this.initialized= true;
            }

        },

        /**
         * Get the current App.
         *
         * The current App object is an instance of the {@link Ext.io.App} class. It represents
         * the web app itself. It is always available, and serves as the root of
         * the server side objects available to this client.
         *
         * @param {Object} options An object which may contain the following properties:
         *
         * @param {Function} options.callback The function to be called after getting the current App object.
         * The callback is called regardless of success or failure and is passed the following parameters:
         * @param {Object} options.callback.options The parameter to the API call.
         * @param {Boolean} options.callback.success True if the API call succeeded.
         * @param {Object} options.callback.app The current {Ext.io.App} object if the call succeeded, else an error object.
         *
         * @param {Function} options.success The function to be called upon success of the API.
         * The callback is passed the following parameters:
         * @param {Ext.io.App} options.success.app The current {Ext.io.App} object.
         * @param {Object} options.success.options The parameter to the API call.
         *
         * @param {Function} options.failure The function to be called upon failure of the API.
         * The callback is passed the following parameters:
         * @param {Object} options.failure.error An error object.
         * @param {Object} options.failure.options The parameter to the API call.
         *
         * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
         * the callback function.
         */
        getCurrentApp: function(options) {
            Ext.io.init();
            Ext.io.App.getCurrent(options);
        },

        /**
         * Get the current Device.
         *
         * The current Device object is an instance of {@link Ext.io.Device} class. It represents
         * the device that this web app is running on. It is always available.
         *
         * @param {Object} options An object which may contain the following properties:
         *
         * @param {Function} options.callback The function to be called after getting the current Device object.
         * The callback is called regardless of success or failure and is passed the following parameters:
         * @param {Object} options.callback.options The parameter to the API call.
         * @param {Boolean} options.callback.success True if the API call succeeded.
         * @param {Object} options.callback.device The current {Ext.io.Device} object if the call succeeded, else an error object.
         *
         * @param {Function} options.success The function to be called upon success of the API.
         * The callback is passed the following parameters:
         * @param {Ext.io.Device} options.success.device The current {Ext.io.Device} object.
         * @param {Object} options.success.options The parameter to the API call.
         *
         * @param {Function} options.failure The function to be called upon failure of the API.
         * The callback is passed the following parameters:
         * @param {Object} options.failure.error An error object.
         * @param {Object} options.failure.options The parameter to the API call.
         *
         * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
         * the callback function.
         *
         */
        getCurrentDevice: function(options) {
            Ext.io.init();
            Ext.io.Device.getCurrent(options);
        },

        /**
         * Get the current user Group, if any.
         *
         * The current user Group object is an instance of {@link Ext.io.Group}. It represents
         * the group associated with the app. If the app is not associated with a group,
         * then there will no current group.
         *
         * The group is used for registering and authenticating users, and for searching
         * for other users.
         *
         * @param {Object} options An object which may contain the following properties:
         *
         * @param {Function} options.callback The function to be called after getting the current Group object.
         * The callback is called regardless of success or failure and is passed the following parameters:
         * @param {Object} options.callback.options The parameter to the API call.
         * @param {Boolean} options.callback.success True if the API call succeeded.
         * @param {Object} options.callback.group The current {Ext.io.Group} object if the call succeeded, else an error object.
         *
         * @param {Function} options.success The function to be called upon success of the API.
         * The callback is passed the following parameters:
         * @param {Ext.io.Group} options.success.group The current {Ext.io.Group} object.
         * @param {Object} options.success.options The parameter to the API call.
         *
         * @param {Function} options.failure The function to be called upon failure of the API.
         * The callback is passed the following parameters:
         * @param {Object} options.failure.error An error object.
         * @param {Object} options.failure.options The parameter to the API call.
         *
         * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
         * the callback function.
         *
         */
        getCurrentGroup: function(options) {
            Ext.io.init();
            Ext.io.Group.getCurrent(options);
        },

        /**
         * Get the current User, if any.
         *
         * The current User object is an instance of {@link Ext.io.User}. It represents
         * the user of the web app. If there is no group associated with the app,
         * then there will not be a current user object. If there is a group, and
         * it has been configured to authenticate users before download then the
         * current user object will be available as soon as the app starts running.
         * If the group has been configured to authenticate users within the app
         * itself then the current user object will not exist until after a 
         * successful call to Ext.io.Group.authenticate has been made.
         *
         * @param {Object} options An object which may contain the following properties:
         *
         * @param {Function} options.callback The function to be called after getting the current User object.
         * The callback is called regardless of success or failure and is passed the following parameters:
         * @param {Object} options.callback.options The parameter to the API call.
         * @param {Boolean} options.callback.success True if the API call succeeded.
         * @param {Object} options.callback.user The current {Ext.io.User} object if the call succeeded, else an error object.
         *
         * @param {Function} options.success The function to be called upon success of the API.
         * The callback is passed the following parameters:
         * @param {Ext.io.User} options.success.user The current {Ext.io.User} object.
         * @param {Object} options.success.options The parameter to the API call.
         *
         * @param {Function} options.failure The function to be called upon failure of the API.
         * The callback is passed the following parameters:
         * @param {Object} options.failure.error An error object.
         * @param {Object} options.failure.options The parameter to the API call.
         *
         * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
         * the callback function.
         *
         */
        getCurrentUser: function(options) {
            Ext.io.init();
            Ext.io.User.getCurrent(options);
        },

        /**
         * Get a proxy interface for a service.
         *
         * For RPC services, an instance of {@link Ext.io.Proxy} is returned, whereas for
         * async message based services, an instance of {@link Ext.io.Service} is returned.
         *
         * @param {Object} options An object which may contain the following properties:
         *
         * @param {String} options.name Name of the service
         *
         * @param {Function} options.callback The function to be called after getting the service.
         * The callback is called regardless of success or failure and is passed the following parameters:
         * @param {Object} options.callback.options The parameter to the API call.
         * @param {Boolean} options.callback.success True if the API call succeeded.
         * @param {Object} options.callback.service An {Ext.io.Service} or {Ext.io.Proxy} object if the call succeeded, else an error object.
         *
         * @param {Function} options.success The function to be called upon success of the API.
         * The callback is passed the following parameters:
         * @param {Ext.io.Service|Ext.io.Proxy} options.success.service An {Ext.io.Service} or {Ext.io.Proxy} object.
         * @param {Object} options.success.options The parameter to the API call.
         *
         * @param {Function} options.failure The function to be called upon failure of the API.
         * The callback is passed the following parameters:
         * @param {Object} options.failure.error An error object.
         * @param {Object} options.failure.options The parameter to the API call.
         *
         * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
         * the callback function.
         *
         */
        getService: function(options) {
            Ext.io.init();
            Ext.io.messaging.getService(options);
        },

        /**
         * Get a named queue
         *
         * All instances of an app have access to the same
         * named queues. If an app gets the same named queue on many devices then
         * those devices can communicate by sending messages to each other. Messages 
         * are simple javascript objects, which are sent by publishing them through 
         * a queue, and are received by other devices that have subscribed to the 
         * same queue.
         *
         * @param {Object} options An object which may contain the following properties:
         *
         * @param {Object} options.params Queue options may contain custom metadata in addition to the name, which is manadatory
         * @param {String} options.params.name Name of the queue
         *
         * @param {Function} options.callback The function to be called after getting the queue.
         * The callback is called regardless of success or failure and is passed the following parameters:
         * @param {Object} options.callback.options The parameter to the API call.
         * @param {Boolean} options.callback.success True if the API call succeeded.
         * @param {Object} options.callback.queue An {Ext.io.Queue} object if the call succeeded, else an error object.
         *
         * @param {Function} options.success The function to be called upon success of the API.
         * The callback is passed the following parameters:
         * @param {Ext.io.Queue} options.success.queue An {Ext.io.Queue} object.
         * @param {Object} options.success.options The parameter to the API call.
         *
         * @param {Function} options.failure The function to be called upon failure of the API.
         * The callback is passed the following parameters:
         * @param {Object} options.failure.error An error object.
         * @param {Object} options.failure.options The parameter to the API call.
         *
         * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
         * the callback function.
         *
         */
        getQueue: function(options) {
            Ext.io.init();
            Ext.io.App.getCurrent({
                success: function(app) {
                    app.getQueue(options);
                },
                failure: function(errResponse) {
                    Ext.callback(options.callback, options.scope, [options, false, errResponse]);
                    Ext.callback(options.failure, options.scope, [errResponse, options]);
                }
            });
        },

        /**
         * @private
         */
        authenticateDeveloper: function(options) {
            Ext.io.init();
            Ext.io.Developer.authenticate(options);
        },

        /**
         * @private
         */
        getCurrentDeveloper: function(options) {
            Ext.io.init();
            Ext.io.Developer.getCurrent(options);
        },

        /**
         * @private
         */
        getCurrentVersion: function(options) {
            Ext.io.init();
            Ext.io.Device.getCurrent({
                success: function(device) {
                    device.getVersion(options);
                },
                failure: function(errResponse) {
                    Ext.callback(options.callback, options.scope, [options, false, errResponse]);
                    Ext.callback(options.failure, options.scope, [errResponse, options]);
                }
            });
        },

        /**
         * @private
         */
        getApp: function(options) {
            Ext.io.init();
            Ext.io.App.get(options);
        },
        /**
         * @private
         */
        getDeveloper: function(options) {
            Ext.io.init();
            Ext.io.Developer.get(options);
        },
        /**
         * @private
         */
        getDevice: function(options) {
            Ext.io.init();
            Ext.io.Device.get(options);
        },
        /**
         * @private
         */
        getTeam: function(options) {
            Ext.io.init();
            Ext.io.Team.get(options);
        },
        /**
         * @private
         */
        getUser: function(options) {
            Ext.io.init();
            Ext.io.User.get(options);
        },
        /**
         * @private
         */
        getVersion: function(options) {
            Ext.io.init();
            Ext.io.Version.get(options);
        },
        /**
         * @private
         */
        getGroup: function(options) {
            Ext.io.init();
            Ext.io.Group.get(options);
        },
        
        /** 
         * Get a Store
         * 
         * JCM but who is the owner? The current App?
         * JCM or pass in the owner as part of the config.
         */
        getStore: function(options) {
            Ext.io.init();
            // JCM ...
        },

        getStoreDirectory: function(options) {
            Ext.io.init();
            
            Ext.callback(options.callback, options.scope, [options, true, Ext.io.storeDirectory]);
            Ext.callback(options.success, options.scope, [Ext.io.storeDirectory, options]);
        }
    }
});

/**
 * An Object... but a special one.
 * 
 */
Ext.define('Ext.io.object.Object', {

    // JCM should use config?
    bucket: null,

    key: null, // JCM it's kinda really the id of the object, oid?

    data: null, // JCM data+state= an eventually consistent object

    // JCM should have a local in-memory and on-disk cache of these objects

    // JCM eventually consistent objects...
    // JCM ref or full object
    // JCM ephemeral, cached, or maintained in sync
    // JCM events for changes

    constructor: function(bucket, key, data, messaging) { // JCM use config?
        this.bucket = bucket;
        this.key = key;
        this.data = data;
        this.messaging = messaging;
        
        var args = Array.prototype.slice.call(arguments, 0);
        if (args.indexOf(undefined) != -1) {
            Ext.util.Logger.warn("Calling new <Object> does not work. Use the factory method Ext.io.get<Object> instead.");
        }
    },

    /**
     * Update
     * (JCM ...)
     * JCM local update?
     * JCM remote update?
     * JCM sync?
     */
    update: function(options) {
        var self = this;

        //update data JCM apply?
        for (var k in options.data) {
            self.data[k] = options.data[k];
        }

        this.messaging.getService({
            name: "naming-rpc",
            success: function(namingRpc) {
                namingRpc.update(function(result) {
                    if(result.status == "success") {
                        Ext.callback(options.callback, options.scope, [options, true, true]);
                        Ext.callback(options.success, options.scope, [true, options]);
                    } else {
                        var err = { message : 'Can not update entity' };
                        Ext.callback(options.callback, options.scope, [options, false, err]);
                        Ext.callback(options.failure, options.scope, [err, options]);
                    }
                }, self.bucket, self.key, self.data);
            },
            failure: function(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            }
        });
    },

    /**
     * @private
     */
    destroy: function(options) {
        var self = this;
        
        this.messaging.getService({
            name: "naming-rpc",
            success: function(namingRpc) {
                namingRpc.destroy(function(result) {
                    if(result.status == "success") {
                        Ext.callback(options.callback, options.scope, [options, true, true]);
                        Ext.callback(options.success, options.scope, [true, options]);
                    } else {
                        var err = { message : 'Can not destroy entity' };
                        Ext.callback(options.callback, options.scope, [options, false, err]);
                        Ext.callback(options.failure, options.scope, [err, options]);
                    }
                }, self.bucket, self.key);
            },
            failure: function(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            }
        });
    },

    /**
     * @private
     */
    createRelatedEntity: function(method, entity, data, callback, scope) {
        var self = this;

        this.messaging.getService({
            name: "naming-rpc",
            success: function(namingRpc) {
                namingRpc.createRelatedEntity(function(result) {
                    if(result.status == "success") {
                        var ent = Ext.create(entity, result.value._bucket, result.value._key, result.value.data, self.messaging);
                        callback.call(scope, false, ent);
                    } else {
                        var err = { message : (typeof result.description != "undefined") ? result.description : 'Can not create this object' };
                        callback.call(scope, err, null);
                    }
                }, self.bucket, self.key, method, data);
            },
            failure: function(err) {
                callback.call(scope, err, null);
            }
        });
    },

    /** 
     * @private
     */
    uploadIcon: function(options) {
        var self = this;

        var errorCallback = function(err) {
            Ext.callback(options.callback, options.scope, [options, false, err]);
            Ext.callback(options.failure, options.scope, [err, options]);
        }

        options.file.ftype = 'icon';
        self.messaging.sendContent({
            params:options.file,
            failure: function(err) {
                errorCallback(err);
            },
            success: function(csId) {
                var tmp = options.file.name.split('.');
                var ext = "."+tmp[tmp.length - 1];

                self.setPicture(csId, ext, function(err, fileName) {
                    if (fileName) {
                        Ext.callback(options.callback, options.scope, [options, true, fileName]);
                        Ext.callback(options.success, options.scope, [fileName, options]);
                    } else {
                        errorCallback(err || null);
                    }
                }, self);
            }
        });
    },

    /**
     * @private
     */
    setPicture: function(csKey, ext, callback, scope) {
        var self = this;

        this.messaging.getService({
            name: "naming-rpc",
            success: function(namingRpc) {
                namingRpc.setPicture(function(result) {
                    if(result.status == "success") {
                        callback.call(scope, false, result.value);
                    } else {
                        callback.call(scope, true, null);
                    }
                }, self.bucket, self.key, csKey, ext);
            },
            failure: function() {
                callback.call(scope, true, null);
            }
        });
    },

    // JCM getACL
    // JCM setACL

    /**
     * @private
     */
    delBiLinks: function(bucket, key, tag, callback, scope) {
        var self = this;

        this.messaging.getService({
            name: "naming-rpc",
            success: function(namingRpc) {
                namingRpc.delBiLinks(function(result) {
                    if(result.status == "success") {
                        callback.call(scope, false);
                    } else {
                        callback.call(scope, true, null);
                    }
                }, self.bucket, self.key, bucket, key, tag);
            },
            failure: function() {
                callback.call(scope, true, null);   
            }
        });
    },
    
    /**
     * @private
     */
    addBiLinks: function(bucket, key, tag, callback, scope) {
        var self = this;

        this.messaging.getService({
            name: "naming-rpc",
            success: function(namingRpc) {
                namingRpc.addBiLinks(function(result) {
                    if(result.status == "success") {
                        callback.call(scope, false);
                    } else {
                        callback.call(scope, true, null);
                    }
                }, self.bucket, self.key, bucket, key, tag);
            },
            failure: function() {
                callback.call(scope, true, null);   
            }
        });
    },

    /**
     * @private
     */
    getSingleLink: function(bucket, key, tag, entity, callback, scope) {
        var self = this;

        this.messaging.getService({
            name: "naming-rpc",
            success: function(namingRpc) {
                namingRpc.getSingleLink(function(result) {
                    if(result.status == "success") {
                        var linkedEntity = null;
                        if(result.value != null) { // it's possible there is no linked entity
                            // Note we are taking bucket from result.value, not self._bucket because the linked entity
                            // might be from a different bucket
                            linkedEntity = Ext.create(entity, result.value._bucket, result.value._key, result.value.data, self.messaging);
                        }
                        callback.call(scope, false, linkedEntity);
                    } else {
                        callback.call(scope, true, null);
                    }
                }, self.bucket, self.key, bucket, key, tag);
            },
            failure: function() {
                callback.call(scope, true, null);   
            }
        });
    },

    /**
     * @private
     */
    getRelatedObjects: function(bucket, tag, entity, callback, scope) {
        var self = this;

        this.messaging.getService({
            name: "naming-rpc",
            success: function(namingRpc) {
                namingRpc.getRelatedEntities(function(result) {
                    if(result.status == "success") {
                        var objects = [];
                        for(var i = 0; i < result.value.length; i++) {
                            objects.push(Ext.create(entity, result.value[i]._bucket, result.value[i]._key, result.value[i].data, self.messaging));
                        }
                        callback.call(scope, false, objects);
                    } else {
                        callback.call(scope, true, null);
                    }
                }, self.bucket, self.key, bucket, tag);
            },
            failure: function() {
                callback.call(scope, true, null);   
            }
        });
    },

    /**
     * @private
     */
    findRelatedObjects: function(bucket, key, tag, query, entity, callback, scope) {
        var self = this;

        this.messaging.getService({
            name: "naming-rpc",
            success: function(namingRpc) {
                namingRpc.findRelatedEntities(function(result) {
                    if(result.status == "success") {
                        var objects = [];
                        for(var i = 0; i < result.value.length; i++) {
                            objects.push(Ext.create(entity, result.value[i]._bucket, result.value[i]._key, result.value[i].data, self.messaging));
                        }
                        callback.call(scope, false, objects);
                    } else {
                        callback.call(scope, true, null);
                    }
                }, self.bucket, self.key, bucket, key, tag, query);
            },
            failure: function() {
                callback.call(scope, true, null);    
            }
        });
    }
});


/**
 * 
 * @private
 *
 * A collection of Objects.
 */
Ext.define('Ext.io.object.Objects', {
    
    CLASS_MAP: {
        'Realms': 'Ext.io.Group', // JCM Realms => Groups
        'Apps': 'Ext.io.App',
        'Users': 'Ext.io.User',
        'Instances': 'Ext.io.Device', // JCM Instances => Devices
        'Queues' : 'Ext.io.Queue',
        'Developers' : 'Ext.io.Developer',
        'Organizations' : 'Ext.io.Team', // JCM Organizations => Teams
        'Versions' : 'Ext.io.Version'
        },

    bucket: null,

    // JCM should have a local in-memory and on-disk cache of these objects

    constructor: function(bucket, messaging) { // JCM use config?
        this.bucket = bucket;
        this.messaging = messaging;
    },

    /**
     * Get a specific Object.
     */
    get: function(key, callback, scope) {
        var self = this;
            
        this.messaging.getService({
            name: "naming-rpc",
            success: function(namingRpc) {
                namingRpc.get(function(result) {
                    if(result.status == "success") {
                        callback.call(scope, false, Ext.create(self.CLASS_MAP[self.bucket], self.bucket, result.value._key, result.value.data, self.messaging));
                    } else {
                        callback.call(scope, true, null);
                    }
                }, self.bucket, key);
            },
            failure: function() {
                callback.call(scope, true, null);    
            } 
        });
    },

    /**
     * Get a set of Objects that match a query.
     */
    find: function(query, start, rows, callback, scope) {
        var self = this;

        this.messaging.getService({
            name: "naming-rpc",
            success: function(namingRpc) {
                namingRpc.find(function(result) {
                    if(result.status == "success") {
                        var objects = [];
                        for(var i = 0; i < result.value.length; i++) {
                            objects.push(Ext.create(self.CLASS_MAP[self.bucket], self.bucket, result.value[i]._key, result.value[i].data, self.messaging));
                        }
                        callback.call(scope, false, objects);
                    } else {
                        callback.call(scope, true, null);
                    }
                }, self.bucket, query, start, rows);
            },
            failure: function() {
                callback.call(scope, true, null);    
            } 
        });
    },
    
    /**
     * Add a specific Object.
     */
    add: function(data, callback, scope) {
        var self = this;
            
        this.messaging.getService({
            name: "naming-rpc",
            success: function(namingRpc) {
                namingRpc.add(function(result) {
                    if(result.status == "success") {
                        callback.call(scope, false, Ext.create(self.CLASS_MAP[self.bucket], self.bucket, result.value._key, result.value.data, self.messaging));
                    } else {
                        callback.call(scope, true, null);
                    }
                }, self.bucket, data);
            },
            failure: function() {
                callback.call(scope, true, null);    
            } 
        });
    }
});

Ext.define('Ext.io.EnvelopeWrapper', {
  extend: 'Ext.data.Model',

  config: { 
    fields: [
      {name: 'e', type: 'auto'}, // envelope
      {name: 'ts', type: 'integer'} // timestamp
    ]
  }
});

Ext.define('Ext.io.Transport', {
	
  naming: null,

  transport: null,

  listeners: {},

  undeliveredIncomingStore: null,

  retryIncomingInProgress: false,

  undeliveredOutgoingStore: null,

  retryOutgoingInProgress: false,

  /** @private
  * Mapping of transport classes to short name
  * transportName provided by config used for transport lookup.
  */
  transportClasses: {
    "polling": 'Ext.io.transports.PollingTransport',
    "socket": "Ext.io.transports.SocketIoTransport",
  },

  config: {
    url: 'http://msg.sencha.io',
    clientId: '',
    piggybacking: true,
    maxEnvelopesPerReceive: 10,
    transportName: "polling",
    debug: false, /* pass debug flag to server in envelope */

    undeliveredIncomingRetryInterval: 5 * 1000, // every 5 secs
    undeliveredIncomingExpiryInterval: 60 * 60 * 24 * 1000, // 24 hours
    undeliveredIncomingMaxCount: 100, // max queue size after which we start dropping new messages

    undeliveredOutgoingRetryInterval: 5 * 1000, // every 5 secs
    undeliveredOutgoingExpiryInterval: 60 * 60 * 24 * 1000, // 24 hours
    undeliveredOutgoingMaxCount: 100 // max queue size after which we start dropping new messages
  },

  constructor: function(config, naming) {
    var self = this;

    config.clientId = Ext.naming.IDStore.getId('device');
    
    this.initConfig(config);
    this.naming = naming;

    Ext.util.Logger.info("Transport type ", this.getTransportName());

    if(Ext.io.storeDirectory) {
      this.undeliveredIncomingStore = Ext.create('Ext.data.Store', {
        model: 'Ext.io.EnvelopeWrapper',
        proxy: {
          type: 'localstorage', 
          id: 'sencha-io-undelivered-incoming-envelopes'
        },
        autoLoad: true,
        autoSync: false
      });

      this.undeliveredOutgoingStore = Ext.create('Ext.data.Store', {
        model: 'Ext.io.EnvelopeWrapper',
        proxy: {
          type: 'localstorage', 
          id: 'sencha-io-undelivered-outgoing-envelopes'
        },
        autoLoad: true,
        autoSync: false
      });

      if(Ext.io.storeDirectory) {
        Ext.io.storeDirectory.update("sencha-io-undelivered-incoming-envelopes", "queue", { direction: "in" });
        Ext.io.storeDirectory.update("sencha-io-undelivered-outgoing-envelopes", "queue", { direction: "out" });
      } else {
        Ext.util.Logger.error("Store directory not initialized, skipping registration of Transport queues");
      }

      Ext.util.Logger.info("Undelivered incoming retry interval: " + this.getUndeliveredIncomingRetryInterval());
      setInterval(function() {
        self.retryUndeliveredIncomingMessages();  
      }, this.getUndeliveredIncomingRetryInterval());

      Ext.util.Logger.info("Undelivered outgoing retry interval: " + this.getUndeliveredOutgoingRetryInterval());
      setInterval(function() {
        self.retryUndeliveredOutgoingMessages();  
      }, this.getUndeliveredOutgoingRetryInterval());
    }

    Ext.util.Logger.debug("Transport config", Ext.encode(this.config));

    this.transport = Ext.create(this.transportClasses[this.getTransportName()], this.config);
    this.transport.start();
    this.transport.on('receive', function(envelope) { self.receive(envelope); });

    return this;
  },

  retryUndeliveredOutgoingMessages: function() {
    var self = this;

    if(self.retryOutgoingInProgress) {
      Ext.util.Logger.debug("Another retry (outgoing) already in progress, skipping...");
      return;
    }

    var pendingCount = this.undeliveredOutgoingStore.getCount();
    if(pendingCount > 0) {
      Ext.util.Logger.debug("Transport trying redelivery for outgoing envelopes:", pendingCount);
    } else {
      return;
    }

    self.retryOutgoingInProgress = true;

    try {
      var now = new Date().getTime();
      var expiryInterval = self.getUndeliveredOutgoingExpiryInterval();

      // get the first envelope for redelivery
      var record = this.undeliveredOutgoingStore.getAt(0);
      var envelope = record.data.e;

      // Expiry based on age
      if((now - record.data.ts) > expiryInterval) {
        Ext.util.Logger.warn("Buffered outgoing envelope is too old, discarding", record);
        this.undeliveredOutgoingStore.remove(record);
        self.undeliveredOutgoingStore.sync();
        self.retryOutgoingInProgress = false;
      } else {
        if(window.navigator.onLine) { // attempt redelivery only if browser says we're online
          Ext.util.Logger.debug("Transport trying redelivery for outgoing envelope: " + record);
          self.transport.send(envelope, function(err, response, doBuffering) {
            if(doBuffering) {
              // could not be delivered again, do nothing
              Ext.util.Logger.debug("Redelivery failed for outgoing envelope, keeping it queued", record);

              self.retryOutgoingInProgress = false;
            } else {
              // sent to server, now remove it from the queue
              Ext.util.Logger.debug("Delivered outgoing envelope on retry", record);
              self.undeliveredOutgoingStore.remove(record);
              self.undeliveredOutgoingStore.sync();
              self.retryOutgoingInProgress = false;
            }
          });
        } else {
          Ext.util.Logger.debug("Browser still offline, not retrying delivery for outgoing envelope", record);  
          self.retryOutgoingInProgress = false;
        }
      }
    } catch(e) {
      // if an exception occurs, ensure retryOutgoingInProgress is false
      // otherwise future retries will be skipped!
      self.retryOutgoingInProgress = false;

      Ext.util.Logger.debug("Error during retryUndeliveredOutgoingMessages", e);
    }
  },

  retryUndeliveredIncomingMessages: function() {
    var self = this;

    if(self.retryIncomingInProgress) {
      Ext.util.Logger.debug("Another retry (incoming) already in progress, skipping...");
      return;
    }

    self.retryIncomingInProgress = true;
    try {
      var now = new Date().getTime();
      var expiryInterval = self.getUndeliveredIncomingExpiryInterval();

      var undelivered = this.undeliveredIncomingStore.getRange();
      if(undelivered.length > 0) {
        Ext.util.Logger.debug("Transport trying redelivery for incoming envelopes:", undelivered.length);
      }

      for(var i = 0; i < undelivered.length; i++) {
        var record = undelivered[i];
        var envelope = record.data.e;

        var map = this.listeners[envelope.service];
        if(map) {
          map.listener.call(map.scope, envelope);
          Ext.util.Logger.debug("Delivered incoming envelope on retry", record);
          this.undeliveredIncomingStore.remove(record);
        } else {
          // Still can't deliver the message... see if the message is eligible for expiry
          
          // Expiry based on age
          if((now - record.data.ts) > expiryInterval) {
            Ext.util.Logger.warn("Buffered incoming envelope is too old, discarding", record);
            this.undeliveredIncomingStore.remove(record);
          }
        }
      }
    } finally {
      // even if an exception occurs, sync the store and ensure retryIncomingInProgress is false
      // otherwise future retries will be skipped!
      this.undeliveredIncomingStore.sync();
      self.retryIncomingInProgress = false;
    }
  },

  getDeveloperSid: function() {
    return Ext.naming.IDStore.getSid('developer');
  },

  getUserSid: function() {
    return Ext.naming.IDStore.getSid('user');
  },

  setListener: function(serviceName, listener, scope) {
    this.listeners[serviceName] = {listener:listener, scope:scope};
  },

  removeListener: function(serviceName) {
    delete this.listeners[serviceName];
  },

  sendToService: function(serviceName, payload, callbackFunction, scope) {
    this.send({service: serviceName, msg: payload}, callbackFunction, scope)
  },

  sendToClient: function(targetClientId, payload, callbackFunction, scope) {
    if(payload && typeof(payload) === "object") {
      payload.to = targetClientId;
      this.send({service: "courier", msg: payload}, callbackFunction, scope);
    } else {
      Ext.util.Logger.error("Payload is not a JSON object");
      callbackFunction.call(scope, true, {status: "error", statusText: "Payload is not a JSON object"});
    }
  },

  send: function(envelope, callbackFunction, scope) {
    var self = this;

    if(this.getDebug()) {
      envelope.debug = true;
    }

    envelope.from = this.getClientId();

    // pass developerSid if available
    var developerSid = this.getDeveloperSid();
    if(developerSid) {
      envelope.developerSid = developerSid;  
    }
    
    // pass userSid if available
    var userSid = this.getUserSid();
    if(userSid) {
      envelope.userSid = userSid;  
    }
    

    Ext.util.Logger.debug("Transport.send " + JSON.stringify(envelope));
    
    if(window.navigator.onLine) {
      // browser says we are online, which may or may not be true. Try delivery and see...
      this.transport.send(envelope, function(err, response, doBuffering) {
        if(callbackFunction) {
          callbackFunction.call(scope, err, response, doBuffering);

          // handling PollingTransport for now. TODO: handle socket transport
          if(err && doBuffering) {
            // could not send outgoing envelope. Buffer it!
            Ext.util.Logger.warn("Error delivering outgoing envelope", envelope, response);
            self.bufferOutgoingEnvelope(envelope);
          }
        }
      });
    } else {
      // Browser says we're offline, so we MUST be offline. Don't even bother sending
      self.bufferOutgoingEnvelope(envelope);
    }
  },

  bufferOutgoingEnvelope: function(envelope) {
    if(this.undeliveredOutgoingStore) {
      if(this.undeliveredOutgoingStore.getCount() < this.getUndeliveredOutgoingMaxCount()) {
        var record = this.undeliveredOutgoingStore.add(Ext.create('Ext.io.EnvelopeWrapper', {e: envelope, ts: (new Date().getTime())}));
        this.undeliveredOutgoingStore.sync();
        Ext.util.Logger.debug("Added to outgoing queue, will retry delivery later", record);
      } else {
        // queue is full, start dropping messages now
        Ext.util.Logger.warn("Queue full, discarding undeliverable outgoing message!", envelope);
      }
    }
  },

  receive: function(envelope) {
    Ext.util.Logger.debug("Transport.receive " + JSON.stringify(envelope));

    // dispatch it to the correct service listener
    if(this.listeners[envelope.service]) {
      var map = this.listeners[envelope.service];
      map.listener.call(map.scope, envelope);
    } else {
      Ext.util.Logger.error("Transport.receive no listener for service '",envelope.service,"'.",this.listeners);

      // check current length of queue
      if(this.undeliveredIncomingStore) {
        if(this.undeliveredIncomingStore.getCount() < this.getUndeliveredIncomingMaxCount()) {
          // add it to the undelivered store for trying delivery later
          var record = this.undeliveredIncomingStore.add(Ext.create('Ext.io.EnvelopeWrapper', {e: envelope, ts: (new Date().getTime())}));
          Ext.util.Logger.debug("Added to incoming queue, will retry delivery later", record);
          
          this.undeliveredIncomingStore.sync();      
        } else {
          // queue is full, start dropping messages now
          Ext.util.Logger.warn("Queue full, discarding undeliverable incoming message!", envelope);
        }
      }
    }
  },

  subscribe: function(serviceName, callbackFunction, scope) {
    Ext.util.Logger.debug("Transport.subscribe " + serviceName);

    var params = { client_id: this.getClientId(), service: serviceName };

    this.transport.subscribe(params, function(err, response) {
      if(callbackFunction){
        callbackFunction.call(scope, err, response);
      }
    });
  },

  unsubscribe: function(serviceName, callbackFunction, scope) {
    Ext.util.Logger.debug("Transport.unsubscribe " + serviceName);

    var params = { client_id: this.getClientId(), service: serviceName };

    this.transport.unsubscribe(params, function(err, response) {
      if(callbackFunction){
        callbackFunction.call(scope, err, response);
      }
    });
  }
});


Ext.define('Ext.io.Rpc', {
	
  currentCallId: 0,

  callMap: {},

  transport: null,

  rpcTimeoutInterval: null,

  config: {
    rpcTimeoutDuration: 60 * 1000, // 1 minute
    rpcTimeoutCheckInterval: 5 * 1000 // check for timeouts every 5 sec
  },

  constructor: function(config, transport) {
    var self = this;

    this.initConfig(config);
    this.transport = transport;

    this.rpcTimeoutInterval = setInterval(function() {
      self.processRpcTimeouts();
    }, this.getRpcTimeoutCheckInterval());


    return this;
  },

  processRpcTimeouts: function() {
    var self = this;

    var currentTime = new Date().getTime();
    var rpcTimeoutDuration = this.getRpcTimeoutDuration();
    var toRemove = [];

    try {
      for(var corrId in this.callMap) {
        var map = this.callMap[corrId];
        if(map && map.requestTime && ((currentTime - map.requestTime) > rpcTimeoutDuration)) {
          toRemove.push(corrId);
        }
      }

      // remove the timed out corrIds, and return a timeout error to the callers
      toRemove.forEach(function(corrId) {
        var map = self.callMap[corrId];
        if(map && map.callback) {
          delete self.callMap[corrId];

          Ext.util.Logger.warn("RPC request has timed out as there was no reply from the server. Correlation Id:", corrId);
          Ext.util.Logger.warn("See documentation for Ext.io.setup (rpcTimeoutDuration, rpcTimeoutCheckInterval) to configure the timeout check");

          map.callback({ status:"error", description: "RPC request has timed out as there was no reply from the server" });
        }
      });
    } catch(e) {
      Ext.util.Logger.error("Error running RPC timeout checks", e);
    }
  },

  generateCallId: function() {
    return ++this.currentCallId;
  },

  subscribe: function(envelope) {
    // got a response envelope, now handle it
    this.callback(envelope.msg["corr-id"], envelope);
  },

  dispatch: function(envelope, callbackFunction) {
    var self = this;

    var corrId = this.generateCallId();
    envelope.msg["corr-id"] = corrId;
    envelope.from = this.transport.getClientId();

    this.callMap[corrId] = { callback: callbackFunction, requestTime: (new Date().getTime()) };

    // send the envelope
    this.transport.send(envelope, function(err, response) {
      if(err) { // couldn't even send the envelope
        self.callMap[corrId].callback({ status:"error", description: response.responseText });
        delete self.callMap[corrId];
      }
    }, this);
  },

  callback: function(corrId, envelope) {
    var id = parseInt(corrId);
    if (!this.callMap[id]) {
      Ext.util.Logger.warn("No callback found for this correspondance id: " + corrId);
    } else {
      this.callMap[id].callback(envelope.msg.result);
      delete this.callMap[id];
    }
  },

  call: function(callbackFunction, serviceName, style, method, args) {
    // register for rpc-direct receive calls
    this.transport.setListener("rpc", this.subscribe, this);

    // register for serviceName receive calls (subscriber rpc)
    this.transport.setListener(serviceName, this.subscribe, this);

    switch(style) {
      case "subscriber":
        var envelope = {service: serviceName, from: this.transport.getClientId(), msg: {method: method, args: args}};
        this.dispatch(envelope, callbackFunction);
        break;
      case "direct":
        var envelope = {service: 'rpc', from: this.transport.getClientId(), msg: {service: serviceName, method: method, args: args}};
        this.dispatch(envelope, callbackFunction);
        break;
      default:
			  Ext.util.Logger.error(style + " is an invalid RPC style. Should be 'direct' or 'subscriber'");
        throw "Invalid RPC style: " + style;
        break;
    }
  }

});


/**
 * Instances of {@link Ext.io.Proxy} represent proxy objects to services running in the backend. Any
 * RPC method defined by the service can be invoked on the proxy as if it were a local method.
 *
 * The first parameter to any RPC method is always a callback function, followed by the parameters
 * to the method being called on the server.
 *
 * For example:
 *
 *     Ext.io.getService("calculator", function(calculator) {
 *         calculator.add(
 *             function(result) { // callback
 *                 display("Calculator: " + number1 + " + " + number2 + " = " + result.value);
 *             },
 *             number1, number2 // arguments
 *         );
 *     });
 *
 * The callback function to the RPC method is passed the result of the RPC call.
 */
Ext.define('Ext.io.Proxy', {

  name: null,

  /**
   * @private
   */
  descriptor: null,

  /**
   * @private
   */
  rpc: null,

  /**
   * @private
   */
  constructor: function(name, descriptor, rpc) {
    this.name = name;
    this.descriptor = descriptor;
    this.rpc = rpc;

    if(this.descriptor.kind != 'rpc') {
			Ext.util.Logger.error(this.name + " is not a RPC service");
      throw "Error, proxy does not support non-RPC calls";
    }

    this._createMethodProxies();

    return this;
  },

  /**
   * @private
   */
  _createMethodProxies: function() {
    var self = this;
    for(var i = 0; i < this.descriptor.methods.length; i++) {
      var methodName = this.descriptor.methods[i];
      self[methodName] = self._createMethodProxy(methodName);
    }
  },

  /**
   * @private
   */
  _createMethodProxy: function(methodName) {
    var self = this;

    return function() {
      arguments.slice = Array.prototype.slice;
      var serviceArguments = arguments.slice(0);
      var style = self.descriptor.style[0];
      if(self.descriptor.style.indexOf("subscriber") > 0) {
        style = "subscriber"; // prefer subscriber style if available
      }

      self.rpc.call(serviceArguments[0], self.name, style, methodName, serviceArguments.slice(1));
    }
  }

});

/**
 * Instances of {@link Ext.io.Service} represent proxy object to async message based services running in the backend.
 * You can use the proxy to send async messages to the service, to receive async messages from the service,
 * and if the service is a PubSub type of service, to subscribe/unsubscribe to updates from the service.
 *
 * For example:
 *
 *     Ext.io.getService("weather", function(weatherService) {
 *         weatherService.send({temperature: temperature}, function() {
 *             display("Weather Sensor: sent temperature update " + temperature);
 *         }, this);
 *     });
 *
 *
 *     Ext.io.getService("weather", function(weatherService) {
 *         weatherService.subscribe(function(service, msg) {
 *             display(service + " got temperature update: " + msg.temperature);
 *         }, this, function(err, response) {
 *             console.log("Error during subscribe!");
 *         });
 *     });
 *
 */
Ext.define('Ext.io.Service', {

  name: null,

  /**
   * @private
   */
  descriptor: null,

  /**
   * @private
   */
  transport: null,

  /**
   * @private
   */
  constructor: function(name, descriptor, transport) {
    this.name = name;
    this.descriptor = descriptor;
    this.transport = transport;

    return this;
  },

  /**
   * Send an async message to the service
   *
   * @param {Object} options An object which may contain the following properties:
   *
   * @param {Object} options.message A simple Javascript object.
   *
   * @param {Function} options.callback The function to be called after sending the message to the server for delivery.
   * The callback is called regardless of success or failure and is passed the following parameters:
   * @param {Object} options.callback.options The parameter to the API call.
   * @param {Boolean} options.callback.success True if the API call succeeded.
   * @param {Object} options.callback.response A response object from the server to the API call.
   *
   * @param {Function} options.success The function to be called upon success of the API.
   * The callback is passed the following parameters:
   * @param {Object} options.success.response A response object from the server to the API call.
   * @param {Object} options.success.options The parameter to the API call.
   *
   * @param {Function} options.failure The function to be called upon failure of the API.
   * The callback is passed the following parameters:
   * @param {Object} options.failure.error An error object.
   * @param {Object} options.failure.options The parameter to the API call.
   *
   * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
   * the callback function.
   *
   */
  send: function(options) {
    this.transport.sendToService(this.name, options.message, function(err, response) {
      if(err) {
        Ext.callback(options.callback, options.scope, [options, false, response]);
        Ext.callback(options.failure, options.scope, [response, options]);
      } else {
        Ext.callback(options.callback, options.scope, [options, true, response]);
        Ext.callback(options.success, options.scope, [response, options]);
      }
    }, this);
  },

  /**
   * Receive async messages from the service
   *
   * For PubSub type of services, which need subscription to start getting messages, see the 'subscribe' method.
   *
   * @param {Object} options An object which may contain the following properties:
   *
   * @param {Function} options.callback The function to be called after receiving a message from this service.
   * The callback is called regardless of success or failure and is passed the following parameters:
   * @param {Object} options.callback.options The parameter to the API call.
   * @param {Boolean} options.callback.success True if the API call succeeded.
   * @param {String} options.callback.from the service the message originated from, i.e. the name of this service.
   * @param {Object} options.callback.message A simple Javascript object.
   *
   * @param {Function} options.success The function to be called upon success of the API.
   * The callback is passed the following parameters:
   * @param {String} options.success.from the service the message originated from, i.e. the name of this service.
   * @param {Object} options.success.message A simple Javascript object.
   * @param {Object} options.success.options The parameter to the API call.
   *
   * @param {Function} options.failure The function to be called upon failure of the API.
   * The callback is passed the following parameters:
   * @param {Object} options.failure.error An error object.
   * @param {Object} options.failure.options The parameter to the API call.
   *
   * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
   * the callback function.
   *
   */
  receive: function(options) {
    this.transport.setListener(this.name, function(envelope) {
      Ext.callback(options.callback, options.scope, [options, true, envelope.from, envelope.msg]);
      Ext.callback(options.success, options.scope, [envelope.from, envelope.msg, options]);
    }, this);
  },

  /**
   * Subscribe to receive messages from this service.
   *
   * This method must be used only for PubSub type of services.
   * Some services do not need subscription for delivering messages. Use 'receive' to get messages
   * from such services.
   *
   * @param {Object} options An object which may contain the following properties:
   *
   * @param {Function} options.callback The function to be called after receiving a message from this service.
   * The callback is called regardless of success or failure and is passed the following parameters:
   * @param {Object} options.callback.options The parameter to the API call.
   * @param {Boolean} options.callback.success True if the API call succeeded.
   * @param {String} options.callback.from the service the message originated from, i.e. the name of this service.
   * @param {Object} options.callback.message A simple Javascript object.
   *
   * @param {Function} options.success The function to be called upon success of the API.
   * The callback is passed the following parameters:
   * @param {String} options.success.from the service the message originated from, i.e. the name of this service.
   * @param {Object} options.success.message A simple Javascript object.
   * @param {Object} options.success.options The parameter to the API call.
   *
   * @param {Function} options.failure The function to be called upon failure of the API.
   * The callback is passed the following parameters:
   * @param {Object} options.failure.error An error object.
   * @param {Object} options.failure.options The parameter to the API call.
   *
   * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
   * the callback function.
   *
   */
  subscribe: function(options) {
    var self = this;

    self.transport.subscribe(self.name, function(err, response) {
      if(err) {
        Ext.callback(options.callback, options.scope, [options, false, response]);
        Ext.callback(options.failure, options.scope, [response, options]);
      } else {
        self.transport.setListener(self.name, function(envelope) {
          Ext.callback(options.callback, options.scope, [options, true, envelope.service, envelope.msg]);
          Ext.callback(options.success, options.scope, [envelope.service, envelope.msg, options]);
        }, self);
      }
    }, self);
  },

  /**
   * Unsubscribe from receiving messages from this service.
   *
   * This method must be used only for PubSub type of services.
   *
   * @param {Object} options An object which may contain the following properties:
   *
   * @param {Function} options.callback The function to be called after unsubscribing from this service.
   * The callback is called regardless of success or failure and is passed the following parameters:
   * @param {Object} options.callback.options The parameter to the API call.
   * @param {Boolean} options.callback.success True if the API call succeeded.
   * @param {Object} options.callback.response A response object from the server to the API call.
   *
   * @param {Function} options.success The function to be called upon success of the API.
   * The callback is passed the following parameters:
   * @param {Object} options.success.response A response object from the server to the API call.
   * @param {Object} options.success.options The parameter to the API call.
   *
   * @param {Function} options.failure The function to be called upon failure of the API.
   * The callback is passed the following parameters:
   * @param {Object} options.failure.error An error object.
   * @param {Object} options.failure.options The parameter to the API call.
   *
   * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
   * the callback function.
   *
   */
  unsubscribe: function(options) {
    Ext.io.messaging.transport.unsubscribe(this.name, function(err, response) {
      if(err) {
        Ext.callback(options.callback, options.scope, [options, false, response]);
        Ext.callback(options.failure, options.scope, [response, options]);
      } else {
        Ext.callback(options.callback, options.scope, [options, true, response]);
        Ext.callback(options.success, options.scope, [response, options]);
      }
    }, this);
  }
});


Ext.define('Ext.io.Messaging', {

  proxyCache : {},

  queueCache: {},

  naming: null,

  transport: null,

  rpc: null,

  pubsub: null,

  config: {
  },

  constructor: function(config) {
    this.initConfig(config);

    this.naming = Ext.create(Ext.io.Naming, config, this);
    this.transport = Ext.create(Ext.io.Transport, config, this.naming);
    this.rpc = Ext.create(Ext.io.Rpc, config, this.transport);
    this.pubsub = Ext.create(Ext.io.PubSub, config, this.transport);

    return this;
  },

  getService: function(options) {
    var self = this;
    if(!options.name || options.name == "") {
      Ext.util.Logger.error("Service name is missing");
      var errResponse = { status: 'SERVICE_NAME_MISSING', statusText: 'Service name is missing' };
      Ext.callback(options.callback, options.scope, [options, false, errResponse]);
      Ext.callback(options.failure, options.scope, [errResponse, options]);
    } else {
      var service = this.proxyCache[options.name];
      if(service) {
        Ext.callback(options.callback, options.scope, [options, true, service]);
        Ext.callback(options.success, options.scope, [service, options]);
      } else {
        self.naming.getServiceDescriptor(options.name, function(serviceDescriptor) {
          if(serviceDescriptor == null) {
            Ext.util.Logger.error("Unable to load service descriptor for " + options.name);
            var errResponse = { status: 'SERVICE_DESCRIPTOR_LOAD_ERROR', statusText: 'Error loading service descriptor' };
            Ext.callback(options.callback, options.scope, [options, false, errResponse]);
            Ext.callback(options.failure, options.scope, [errResponse, options]);
          } else {
            if(serviceDescriptor.kind == "rpc") {
              service = Ext.create(Ext.io.Proxy, options.name, serviceDescriptor, self.rpc);
            } else {
              service = Ext.create(Ext.io.Service, options.name, serviceDescriptor, self.transport);
            }

            self.proxyCache[options.name] = service;
            Ext.callback(options.callback, options.scope, [options, true, service]);
            Ext.callback(options.success, options.scope, [service, options]);
          }
        });
      }
    }
  },

  getQueue: function(options) {
    var self = this;

    var errResponse;

    if(!options.params.name || options.params.name == "") {
      errResponse = { status: 'QUEUE_NAME_MISSING', statusText: 'Queue name is missing' };
      Ext.callback(options.callback, options.scope, [options, false, errResponse]);
      Ext.callback(options.failure, options.scope, [errResponse, options]);
    } else if(!options.appId || options.appId == "") {
      errResponse = { status: 'APP_ID_MISSING', statusText: 'App Id is missing' };
      Ext.callback(options.callback, options.scope, [options, false, errResponse]);
      Ext.callback(options.failure, options.scope, [errResponse, options]);
    } else {
      var queueName = options.appId + "." + options.params.name;
      var queue = this.queueCache[queueName];
      if(!queue) {
        self.getService({
            name: "naming-rpc",
            success: function(namingRpc) {
              namingRpc.getQueue(function(result) {
                if(result.status == "success") {
                  queue = Ext.create('Ext.io.Queue', result.value._bucket, result.value._key, result.value.data, self);

                  self.queueCache[queueName] = queue;

                  Ext.callback(options.callback, options.scope, [options, true, queue]);
                  Ext.callback(options.success, options.scope, [queue, options]);
                } else {
                  errResponse = { status: 'QUEUE_CREATE_ERROR', statusText: 'Queue creation error' };
                  Ext.callback(options.callback, options.scope, [options, false, errResponse]);
                  Ext.callback(options.failure, options.scope, [errResponse, options]);
                }
              }, options.appId, options.params);
            },
            failure: function() {
              errResponse = { status: 'QUEUE_CREATE_ERROR', statusText: 'Queue creation error' };
              Ext.callback(options.callback, options.scope, [options, false, errResponse]);
              Ext.callback(options.failure, options.scope, [errResponse, options]);
            }
        });
      } else {
        Ext.callback(options.callback, options.scope, [options, true, queue]);
        Ext.callback(options.success, options.scope, [queue, options]);
      }
    }
  },

  //options.params.file - it should be a handler for file, for example for client side:
  //document.getElementById("the-file").files[0];
  sendContent: function(options) {
    var self  = this;
    var url   = self.config.url || 'http://msg.sencha.io';
    if(!options.params.name || options.params.name == "" || !options.params.file || !options.params.ftype) {
      var errResponse = { status: 'PARAMS_MISSING', statusText: 'Some of parameters are missing' };
      Ext.callback(options.callback, options.scope, [options, false, errResponse]);
      Ext.callback(options.failure, options.scope, [errResponse, options]);
    } else {
      var reader  = new FileReader();
      //read file as binary
      reader.readAsBinaryString(options.params.file);
      reader.onload = (function(theFile) {
        var xhr     = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
          if (xhr.readyState == 4){
            var result = Ext.merge({status : 'error', error : 'Can not store file'}, JSON.parse(xhr.responseText));
            if (result.status == 'success') {
              Ext.callback(options.callback, options.scope, [options, true, result.value]);
              Ext.callback(options.success, options.scope, [result.value, options]);
            } else {
              errResponse = { status: 'STORE_ERROR', statusText: result.error };
              Ext.callback(options.callback, options.scope, [options, false, errResponse]);
              Ext.callback(options.failure, options.scope, [errResponse, options]);
            }
          }
        }
        xhr.open('POST', url+'/contenttransfer/'+Math.random(), true);
        xhr.setRequestHeader("X-File-Name", encodeURIComponent(options.params.name));
        xhr.setRequestHeader("Content-Type", "application/octet-stream; charset=binary");
        xhr.overrideMimeType('application/octet-stream; charset=x-user-defined-binary');
        xhr.setRequestHeader("Content-Length", theFile.total);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("Content-Encoding", "binary");
        xhr.setRequestHeader("File-type", options.params.ftype);

        xhr.send(reader.result);
      });
    }
  }
});



// EOF



Ext.define('Ext.io.PubSub', {
	
  queueCallbackMap: {},

  transport: null,

  config: {

  },

  constructor: function(config, transport) {
    this.initConfig(config);
    this.transport = transport;

    return this;
  },

  handleIncoming: function(envelope) {
    var queueName = envelope.msg.queue;
    if(queueName && this.queueCallbackMap[queueName]) {
      var item = this.queueCallbackMap[queueName]
		  item.callback.call(item.scope,envelope.from, envelope.msg.data);
    } else {
      Ext.util.Logger.warn("PubSub: No callback for queueName " + queueName);
    }
  },

  publish: function(queueName, qKey, data, callbackFunction, scope) {
    this.transport.send({service:"client-pubsub", msg:{api:"publish", queue:queueName, 
      qKey: qKey, data:data}}, callbackFunction, scope);
  },

  subscribe: function(queueName, qKey, callbackFunction, scope, errCallbackFunction) {
    var self = this;

    this.transport.setListener("client-pubsub", this.handleIncoming, this);

    this.transport.send({service:"client-pubsub", msg:{api:"subscribe", queue:queueName, qKey: qKey}}, function(err, response) {
      if(err) {
			  if (errCallbackFunction) {
        	errCallbackFunction.call(scope, err, response);
			  }
      } else {
        self.queueCallbackMap[queueName] = {callback:callbackFunction,scope:scope};
        Ext.util.Logger.info("client-pubsub: " + self.transport.getClientId() + " subscribed to " + queueName);
      }
    }, this);
  },

  unsubscribe: function(queueName, qKey, callbackFunction, scope) {
    var self = this;

    delete this.queueCallbackMap[queueName];
    this.transport.send({service:"client-pubsub", msg:{api:"unsubscribe", queue:queueName, qKey: qKey}}, function(err, response) {
      Ext.util.Logger.info("client-pubsub: " + self.transport.getClientId() + " unsubscribed to " + queueName);
		  if(callbackFunction){
        callbackFunction.call(scope, err, response);
		  }
    }, this);
  }
});


Ext.define('Ext.io.AuthStrategies', {

  statics: {
    nc: 0, // request counter used in Digest auth
    
    getRequestCounter: function() {
      return ++Ext.io.AuthStrategies.nc;
    },
    
    strategies: {
      'digest': function(realm, params, callback, scope) {
        var username = params.username;
        var password = params.password;
        
        // step 1
        // send call without digest 'response' field, causing server to return the server nonce
        realm.messaging.getService({
          name: "authorization",
          success: function(authService) {
            authService.realmAuthDigest(function(result) {
              if(result.status == "success") {
                var nonce = result.value.nonce;
                var qop = "auth";
                var nc = '' + Ext.io.AuthStrategies.getRequestCounter();
                var cnonce = Ext.util.UUIDGenerator.generate();

                // http://en.wikipedia.org/wiki/Digest_access_authentication#Example_with_explanation

                // HA1 = MD5( "Mufasa:testrealm@host.com:Circle Of Life" )
                // = 939e7578ed9e3c518a452acee763bce9
                var ha1 = Ext.util.MD5(username + ":" + realm.key + ":" + password);

                var uri = realm.messaging.transport.getUrl();

                // HA2 = MD5( "GET:/dir/index.html" )
                // = 39aff3a2bab6126f332b942af96d3366
                var ha2 = Ext.util.MD5("POST:" + uri);

                /* Response = MD5( "939e7578ed9e3c518a452acee763bce9:\
                      dcd98b7102dd2f0e8b11d0f600bfb0c093:\
                      00000001:0a4f113b:auth:\
                      39aff3a2bab6126f332b942af96d3366" ) */
                var response = Ext.util.MD5(ha1 + ":" + nonce + ":" + nc +
                  ":" + cnonce + ":" + qop + ":" + ha2);

                authService.realmAuthDigest(function(result) {
                  if(result.status == "success" && result.value._bucket && result.value._bucket == "Users") {
                      callback.call(scope, false, result);
                  } else {
                      callback.call(scope, true, null);
                  }
                }, realm.key, username, nonce, uri, qop, nc, cnonce, response);

              } else {
                // too bad
                callback.call(scope, true, null);
              }
            }, realm.key);            
          },
          failure: function() {
            callback.call(scope, true, null);  
          } 
        });
      }     
    }
  }
});

/**
 * Allows the creation of named queues on the server, subscribing for updates from the queue
 * and publishing data to the queue.
 *
 * A queue can have multiple subscribers, and messages sent to the queue are delivered to each subscriber.
 * Messages published by a device are not sent back to the same device (i.e. echo is prevented)
 *
 * Note that once a queue has been subscribed to, messages will be delivered untill a subsequent
 * call to the unsubscribe method is made.
 *
 * If the device is offline, messages accumulate for it on the server, and will be delivered when
 * the device reconnects.
 */
Ext.define('Ext.io.Queue', {
    extend: 'Ext.io.object.Object',
    
    // JCM should use config?
    // JCM should allow for Ext.create?

    name: null, // the name of the queue within the app

    qName: null, // the rabbitmq identifier of the queue (appId + "." + name)

    /**
     * @private
     */
    constructor: function(bucket, key, data, messaging) {
        this.superclass.constructor.call(this, bucket, key, data, messaging);
        this.name = data.name;
        this.qName = data.qName;

        return this;
    },

    /**
     * Publish a message to this queue.
     *
     * The message will be delivered to all devices subscribed to the queue.
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Object} options.message A simple Javascript object.
     *
     * @param {Function} options.callback The function to be called after sending the message to the server for delivery.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the API call.
     * @param {Boolean} options.callback.success True if the API call succeeded.
     * @param {Object} options.callback.response A response object from the server to the API call.
     *
     * @param {Function} options.success The function to be called upon success of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.success.response A response object from the server to the API call.
     * @param {Object} options.success.options The parameter to the API call.
     *
     * @param {Function} options.failure The function to be called upon failure of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.error An error object.
     * @param {Object} options.failure.options The parameter to the API call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function.
     *
     */
    publish: function(options) {
        this.messaging.pubsub.publish(this.qName, this.key, options.message, function(err, response) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, response]);
                Ext.callback(options.failure, options.scope, [response, options]);
            } else {
                Ext.callback(options.callback, options.scope, [options, true, response]);
                Ext.callback(options.success, options.scope, [response, options]);
            }
        }, this);
    },

    /**
     * Subscribe to receive messages from this queue.
     *
     * To receive messages from a queue, it is necessary to subscribe to the queue.
     * Subscribing registers interest in the queue and starts delivery of messages
     * published to the queue using the callback.
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Function} options.callback The function to be called after subscribing to this Queue.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the API call.
     * @param {Boolean} options.callback.success True if the API call succeeded.
     * @param {String} options.callback.from The sending Device ID.
     * @param {Object} options.callback.message A simple Javascript object.
     *
     * @param {Function} options.success The function to be called upon success of the API.
     * The callback is passed the following parameters:
     * @param {String} options.success.from The sending Device ID.
     * @param {Object} options.success.message A simple Javascript object.
     * @param {Object} options.success.options The parameter to the API call.
     *
     * @param {Function} options.failure The function to be called upon failure of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.error An error object.
     * @param {Object} options.failure.options The parameter to the API call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function.
     *
     */
    subscribe: function(options) {
        this.messaging.pubsub.subscribe(this.qName, this.key, function(from, message) {
            Ext.callback(options.callback, options.scope, [options, true, from, message]);
            Ext.callback(options.success, options.scope, [from, message, options]);
        }, this, function(err, response) {
            Ext.callback(options.callback, options.scope, [options, false, response]);
            Ext.callback(options.failure, options.scope, [response, options]);
        });
    },

    /**
     * Unsubscribe from receiving messages from this queue.
     *
     * Once a queue has been subscribed to, message delivery will continue until a call to unsubscribe is made.
     * If a device is offline but subscribed, messages sent to the queue will accumulate on the server,
     * to be delivered after the device reconnects at a later point of time.
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Function} options.callback The function to be called after unsubscribing from this Queue.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the API call.
     * @param {Boolean} options.callback.success True if the API call succeeded.
     * @param {Object} options.callback.response A response object from the server to the API call.
     *
     * @param {Function} options.success The function to be called upon success of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.success.response A response object from the server to the API call.
     * @param {Object} options.success.options The parameter to the API call.
     *
     * @param {Function} options.failure The function to be called upon failure of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.error An error object.
     * @param {Object} options.failure.options The parameter to the API call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function.
     *
     */
    unsubscribe: function(options) {
        this.messaging.pubsub.unsubscribe(this.qName, this.key, function(err, response) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, response]);
                Ext.callback(options.failure, options.scope, [response, options]);
            } else {
                Ext.callback(options.callback, options.scope, [options, true, response]);
                Ext.callback(options.success, options.scope, [response, options]);
            }
        }, this);
    }
});

/**
 *
 * JCM document 'id'. 
 * why is it a string?
 * should the user had an 'id' field, or not?
 * what if the user wants to display the records of the store in order?
 */
Ext.define('Ext.io.Store', {
    extend: 'Ext.data.Store',

    //extend: 'Ext.io.object.Object',

    // JCM requires: ['Ext.data.Xxx'],
    // JCM uses: ['Ext.data.Yyy'],

    // JCM config stuff

    // JCM pass in owner, and acl

    constructor: function(config) {
    	// JCM pass in the name of a model
    	// JCM create a sync proxy
    },

    /**
     * Sync
     */
    sync: function() {
    	
    },

    // JCM clear / removeAll

});


Ext.define('Ext.io.transports.PollingTransport', {

  mixins: {
    observable: 'Ext.util.Observable'
  },

  intervalId: null,

  config: {
    url: 'http://msg.sencha.io',
    clientId: '',
    piggybacking: true,
    maxEnvelopesPerReceive: 10,
    pollingDuration: 5000
  },

  constructor: function(config) {
    this.initConfig(config);
    this.mixins.observable.constructor.call(this);

    return this;
  },

  getReceiveInvoker: function() {
    var self = this;

    var callback = function(err, response) {
      self.responseHandler(err, response);
    }

    self.ajaxRequest("/receive",
      { client_id: self.config.clientId,
        max: self.config.maxEnvelopesPerReceive},{}, callback);
  },

  start: function() {
    var self = this;
    this.intervalId = setInterval(function() { self.getReceiveInvoker()} , this.config.pollingDuration);

    this.checkVersion();    
  },

  checkVersion: function() {
    this.ajaxRequest("/version", { }, { v: Ext.getVersion("sio").toString() }, function(err, response) {
      if(err) {
        Ext.util.Logger.error(response.responseText);
        throw new Error(response.responseText);
      }
    });
  },

  stop: function() {
    clearInterval(this.intervalId);
  },

  responseHandler: function(err, response, doBuffering) {
    var self = this;

    if(!err) {
      Ext.util.Logger.debug("PollingTransport",this.config.url,"response:",response.responseText);
      var data = Ext.decode(response.responseText);

      if(data != null) {
        var envelopes = data.envelopes;
        var hasMore = data.hasMore;

        if(hasMore) { // if there are more messages, make another RECEIVE call immediately
          setTimeout(function() { self.getReceiveInvoker()}, 0);
        }

        if(envelopes != null) {
          for(var i = 0; i < envelopes.length; i++) {
             this.fireEvent('receive', envelopes[i]);
          }
        } else {
          Ext.util.Logger.warn("PollingTransport",this.config.url,"envelopes missing in response",response.status); 
        }
      } else {
        Ext.util.Logger.warn("PollingTransport",this.config.url,"response text is null",response.status);  
      }
    } else {
      Ext.util.Logger.warn("PollingTransport",this.config.url,"response error:",response.status);
    }
  },

  send: function(message, callback) {
    var self = this;

    this.ajaxRequest("/send", { max: this.config.maxEnvelopesPerReceive }, message, function(err, response, doBuffering) {
      callback(err, response, doBuffering);

      if(self.config.piggybacking) {
        self.responseHandler(err, response, doBuffering);
      }
    });
  },

  subscribe: function(params, callback) {
    this.ajaxRequest("/subscribe", params, {}, callback);
  },

  unsubscribe: function(params, callback) {
    this.ajaxRequest("/unsubscribe", params, {}, callback);
  },

  ajaxRequest: function(path, params, jsonData, callbackFunction) {
    if(!this.config.piggybacking) {
      params.pg = 0; // client has turned off piggybacking
    }

    Ext.Ajax.request({
 	    method: "POST",
 	    url: this.config.url + path,
 	    params: params,
 	    jsonData: jsonData,
 	    scope: this,

      callback: function(options, success, response) {
        if(callbackFunction) {
          if(response && response.status == 0) { // status 0 = server down / network error
            callbackFunction('error', response, true); // request can be buffered
          } else {
            if(success) {
              callbackFunction(null, response);
            } else {
              callbackFunction('error', response, false); // no buffering, server replied
            }
          }
        }
      }
    });
  }
});


Ext.ns('Ext.io.transports');

Ext.define('Ext.io.transports.SocketIoTransport', {
    mixins: {
        observable: 'Ext.util.Observable'
    },

    config: {
      url: 'http://msg.sencha.io',
      clientId: ''
    },

     constructor : function(config) {
       config = config || {};
       Ext.apply(this, config);
       /** @private
         * @event receive
         *  Connection recives an envelope from the server.
         * @param {Object} envelope from the server.
         */
         /** @private
          * @event error
          *  An error condition is recived via the socket connnection
          * @param {Object} error The error Message.
          */

      this.mixins.observable.constructor.call(this);

    },


    /** @private
    * connects to the server and registers to receive messages for the clientID passed
    *
    * @param {Object} clientID the id of this client.
    */
    start: function() {
      Ext.util.Logger.debug("connecting to ", this.url);
      var me = this;

      // check if socket.io has been included on the page
      if(typeof(io) === "undefined") {
        var error = "SocketIoTransport needs the socket.io 0.8.7 client library to work, but that library was not found. Please include the library and try again.";
        Ext.util.Logger.error(error)  
        throw error;
      }

      // check if we are using the same version as the server
      if(io.version !== '0.8.7') {
        var error = "SocketIoTransport needs socket.io version 0.8.7, but the included version is " + io.version;
        Ext.util.Logger.error(error)  
        throw error;
      }

      me.socket = io.connect(me.url);

      me.socket.on('receive', function(data) {
    	  me._receive(data);
    	});

      me.socket.on('connect', function () {
        Ext.util.Logger.debug("start", me.clientId);
        me.socket.emit('start', {"client_id":me.clientId});

        var actualTransportName = me.socket.socket.transport.name;
        if(actualTransportName !== "websocket") {
          Ext.util.Logger.warn("SocketIoTransport: Could not use websockets! Falling back to", actualTransportName);
        }

        me.checkVersion();
      });
    },

    checkVersion: function() {
      this._emit('version', { v: Ext.getVersion("sio").toString() }, function(err, response) {
        if(err) {
          Ext.util.Logger.error(response.statusText);
          throw new Error(response.statusText);
        }
      });
    },

    send: function(message, callback) {
      this._emit('send', message, callback);
    },

    subscribe: function(message, callback) {
      this._emit('subscribe', message, callback);
    },

    unsubscribe: function(message, callback) {
     this._emit('unsubscribe', message, callback);
    },

   _emit: function(channel, message, callback) {
      if(this.socket){
        this.socket.emit(channel, message, callback);
      }
    },

    _receive: function(data){
    	if(data.envelope) {
        this.fireEvent('receive', data.envelope);
      } else if(data.envelopes && data.envelopes.length > 0) {
         var l = data.envelopes.length;
        for(var i =0; i < l; i++ ) {
          this.fireEvent('receive', data.envelopes[i]);
        }
      }
    }
  });


// Cookie class to read a key from cookie
// https://developer.mozilla.org/en/DOM/document.cookie
Ext.define('Ext.util.Cookie', {
  statics: {
    hasItem: function (sKey) {
    	return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },

    getItem: function (sKey) {
    	if (!sKey || !this.hasItem(sKey)) { return null; }
    	return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    },

    setItem: function (sKey, sValue) {
    	document.cookie= escape(sKey)+'='+escape(sValue);
    },
  }
});



Ext.define('Ext.io.Naming', {
	
  messaging: null,

  config: {
	},

  constructor: function(config, messaging) {
    this.initConfig(config);
    this.messaging = messaging;

    return this;
  },

  generateClientId: function() {
    return Ext.util.UUIDGenerator.generate();
  },

  getClientIdFromLocalStorage: function() {
    var clientId = null;

    try {
      if('localStorage' in window && window['localStorage'] !== null) {
        clientId = window.localStorage["sencha.io.client.uuid"]; // JCM ... now we use device.id
      }
    } catch(e) {
      clientId = null;
    }

    return clientId;
  },

  storeClientIdInLocalStorage: function(clientId) {
    window.localStorage["sencha.io.client.uuid"] = clientId; // JCM ... now we use device.id
  },

  getClientId: function() {
    var clientId = this.getClientIdFromLocalStorage();
    if(!clientId) {
      clientId = this.generateClientId();
      this.storeClientIdInLocalStorage(clientId);
    }
    return clientId;
  },

  getServiceDescriptor: function(serviceName, callback, scope) {
    if(serviceName == "naming-rpc") {
      callback.call(scope, {
        kind: "rpc",
        style: ["subscriber"],
        access: ["clients", "servers"],
        depends: ["messaging", "naming"],
        methods: [
					"getServiceDescriptor",
          "get", 
					"find",
					"update",
          "add",
          "destroy",
          "addBiLinks",
          "delBiLinks",
          "getSingleLink", 
					"getRelatedEntities", 
					"findRelatedEntities",
          "getQueue",
          "deployVersion",
          "undeployVersion",
          "createRelatedEntity",
          "setPicture",
          "addDeveloper",
          "removeDeveloper",
          "inviteDeveloper"
				]
      });
    } else {
      this.messaging.getService({
        name: "naming-rpc",
        success: function(namingRpc) {
          namingRpc.getServiceDescriptor(function(result) {
            if(result.status == "success") {
              callback.call(scope, result.value);
            } else {
              callback.call(scope, null);
            }
          }, serviceName);
        },
        failure: function() {
          callback.call(scope, null);
        }
      });
    }
  }
});


Ext.define('Ext.naming.IDStore', {
	statics: {

		/**
		 * Get the id for the current object of a class.
		 */
		getId: function(klass) {
			var store_key= 'sencha.io.'+klass+'.id';
	        return Ext.util.LocalStorage.getItem(store_key);
		},

		/**
		 * Get the key for the current object of a class.
		 */
		getKey: function(klass) {
			var store_key= 'sencha.io.'+klass+'.key';
	        return Ext.util.LocalStorage.getItem(store_key);
		},

		/**
		 * Get the session id for the current object of a class.
		 */
		getSid: function(klass) {
			var cookie_key = klass+'.sid';
		    return Ext.util.Cookie.getItem(cookie_key);
		},

		/**
		 * Set the id for the current object of a class.
		 */
		setId: function(klass,id) {
			var store_key= 'sencha.io.'+klass+'.id';
	        return Ext.util.LocalStorage.setItem(store_key,id);
		},

		/**
		 * Set the key for the current object of a class.
		 */
		setKey: function(klass,key) {
			var store_key= 'sencha.io.'+klass+'.key';
	        return Ext.util.LocalStorage.setItem(store_key,key);
		},

		/**
		 * Set the session id for the current object of a class.
		 */
		setSid: function(klass,sid) {
			var cookie_key = klass+'.sid';
		    return Ext.util.Cookie.setItem(cookie_key,sid);
		},

		remove: function(klass,thing) {
			var cookie_key = klass+'.'+thing;
			var store_key= 'sencha.io.'+cookie_key;
			Ext.util.Cookie.removeItem(cookie_key);
			Ext.util.SessionStorage.removeItem(cookie_key);
			Ext.util.LocalStorage.removeItem(store_key);			
		},

		stash: function(klass,thing,default_value) {
			var cookie_key = klass+'.'+thing;
			var store_key= 'sencha.io.'+cookie_key;
		    var id_in_cookie = Ext.util.Cookie.getItem(cookie_key) || default_value;
	        var id_in_store = Ext.util.LocalStorage.getItem(store_key);
		    if (id_in_cookie) {
		    	if (id_in_store) {
		    		// it's in the cookie, and in the store...
		    		if (id_in_cookie!=id_in_store) {
		    			// ...but it isn't the same, this shouldn't happen. Fix it.
				        Ext.util.LocalStorage.setItem(store_key,id_in_cookie);
		    		} else {
		    			// ...and they are the same.
		    		}
		    	} else {
		    		// it's in the cookie, but not in the store.
			        Ext.util.LocalStorage.setItem(store_key,id_in_cookie);
		    	}
		    } else {
		    	
		    }
		    return id_in_cookie || id_in_store;
		}

	}
});




/**
 * {@img diagram.003.png Class Diagram}
 *
 * The {@link Ext.io.App} class represents the web app itself. There is only one
 * app object, called the current app object, available in the client.
 * It is always available.
 *
 * Methods are provided for navigation through the graph of objects available
 * to the currently running client code. 
 *
 */
Ext.define('Ext.io.App', {
    extend: 'Ext.io.object.Object',

    statics: {

        appsObject: null,

        getAppsObject: function() {
            if(!this.appsObject) {
                this.appsObject = Ext.create('Ext.io.object.Objects', 'Apps', Ext.io.messaging);
            }             
            return this.appsObject;            
        },

        /**
         * Get the current App object.
         *
         * The current App object is an instance of the {@link Ext.io.App} class. It represents
         * the web app itself. It is always available, and serves as the root of
         * the server side objects available to this client.
         *
         * @param {Object} options An object which may contain the following properties:
         *
         * @param {Function} options.callback The function to be called after getting the current App object.
         * The callback is called regardless of success or failure and is passed the following parameters:
         * @param {Object} options.callback.options The parameter to the API call.
         * @param {Boolean} options.callback.success True if the API call succeeded.
         * @param {Object} options.callback.app The current {Ext.io.App} object if the call succeeded, else an error object.
         *
         * @param {Function} options.success The function to be called upon success of the API.
         * The callback is passed the following parameters:
         * @param {Ext.io.App} options.success.app The current {Ext.io.App} object.
         * @param {Object} options.success.options The parameter to the API call.
         *
         * @param {Function} options.failure The function to be called upon failure of the API.
         * The callback is passed the following parameters:
         * @param {Object} options.failure.error An error object.
         * @param {Object} options.failure.options The parameter to the API call.
         *
         * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
         * the callback function.
         *
         */
        getCurrent: function(options) {
            var appId = Ext.naming.IDStore.getId('app');
            if (!appId) {
                var err = { message: "App ID not found" };
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                this.getAppsObject().get(appId, function(err, app) {
                    if(err) {
                        Ext.callback(options.callback, options.scope, [options, false, err]);
                        Ext.callback(options.failure, options.scope, [err, options]);
                    } else {
                        Ext.callback(options.callback, options.scope, [options, true, app]);
                        Ext.callback(options.success, options.scope, [app, options]);
                    }
                }, this);
            }
        },

        /** 
         * @private
         */
        get: function(options) {
            this.getAppsObject().get(options.id, function(err, app) {
                if(err) {
                    Ext.callback(options.callback, options.scope, [options, false, err]);
                    Ext.callback(options.failure, options.scope, [err, options]);
                } else {
                    Ext.callback(options.callback, options.scope, [options, true, app]);
                    Ext.callback(options.success, options.scope, [app, options]);
                }
            }, this);
        }
    },

    /** 
     * @private
     */
    constructor: function(bucket, key, data, messaging) {
        this.superclass.constructor.call(this, bucket, key, data, messaging);
    },

    /**
     * Get the current user Group, if any.
     *
     * The current user Group object is an instance of {@link Ext.io.Group}. It represents
     * the group associated with the app. If the app is not associated with a group,
     * then there will no current group.
     *
     * The group is used for registering and authenticating users, and for searching
     * for other users.
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Function} options.callback The function to be called after getting the Group object.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the API call.
     * @param {Boolean} options.callback.success True if the API call succeeded.
     * @param {Object} options.callback.group The {Ext.io.Group} object for the App if the call succeeded, else an error object.
     *
     * @param {Function} options.success The function to be called upon success of the API.
     * The callback is passed the following parameters:
     * @param {Ext.io.Group} options.success.group The {Ext.io.Group} object for the App.
     * @param {Object} options.success.options The parameter to the API call.
     *
     * @param {Function} options.failure The function to be called upon failure of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.error An error object.
     * @param {Object} options.failure.options The parameter to the API call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function.
     *
     */
    getGroup: function(options) {
        this.getSingleLink("Realms", null, null, "Ext.io.Group", function(err, group) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                Ext.callback(options.callback, options.scope, [options, true, group]);
                Ext.callback(options.success, options.scope, [group, options]);
            }
        }, this);
    },

    /**
     * Register a new Device.
     * 
     */
    register: function(options) {
        // JCM returns an Ext.io.Device, and a session id
        // JCM the server generates an id, a key, and a session id
        //Ext.naming.IDStore.setId('device',device.id);
        //Ext.naming.IDStore.setKey('device',device.key);
        //Ext.naming.IDStore.setSid('device',device.sid);
    },

    /**
     * Authenticate an existing Device.
     *
     */
    authenticate: function(options) {
        //Ext.naming.IDStore.getId('device',device.id);
        //Ext.naming.IDStore.getKey('device',device.key);
        // JCM returns an Ext.io.Device, and a session id
        //Ext.naming.IDStore.setSid('device',device.sid);
    },

    /**
     * Find devices that match a query.
     * 
     * Returns all the device objects that match the given query. The query is a String
     * of the form name:value. For example, "location:austin", would search for all the
     * devices in Austin, assuming that the app is adding that attribute to all
     * its devices. 
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Object} options.query
     *
     * @param {Function} options.callback The function to be called after finding the matching devices.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the API call.
     * @param {Boolean} options.callback.success True if the API call succeeded.
     * @param {Object} options.callback.devices The {Ext.io.Device[]} matching devices found for the App if the call succeeded, else an error object.
     *
     * @param {Function} options.success The function to be called upon success of the API.
     * The callback is passed the following parameters:
     * @param {Ext.io.Device[]} options.success.devices The matching devices found for the App.
     * @param {Object} options.success.options The parameter to the API call.
     *
     * @param {Function} options.failure The function to be called upon failure of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.error An error object.
     * @param {Object} options.failure.options The parameter to the API call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function.
     *
     */
    findDevices: function(options) {
        this.findRelatedObjects("Instances", this.key, null, options.query, "Ext.io.Device", function(err, devices) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                Ext.callback(options.callback, options.scope, [options, true, devices]);
                Ext.callback(options.success, options.scope, [devices, options]);
            }
        }, this);
    },

    /**
     * Get a named queue
     *
     * All instances of an app have access to the same
     * named queues. If an app gets the same named queue on many devices then
     * those devices can communicate by sending messages to each other. Messages 
     * are simple javascript objects, which are sent by publishing them through 
     * a queue, and are received by other devices that have subscribed to the 
     * same queue.
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Object} options.params Queue options may contain custom metadata in addition to the name, which is manadatory
     * @param {String} options.params.name Name of the queue
     *
     * @param {Function} options.callback The function to be called after getting the queue.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the API call.
     * @param {Boolean} options.callback.success True if the API call succeeded.
     * @param {Object} options.callback.queue The named {Ext.io.Queue} if the call succeeded, else an error object.
     *
     * @param {Function} options.success The function to be called upon success of the API.
     * The callback is passed the following parameters:
     * @param {Ext.io.Queue} options.success.queue The named queue.
     * @param {Object} options.success.options The parameter to the API call.
     *
     * @param {Function} options.failure The function to be called upon failure of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.error An error object.
     * @param {Object} options.failure.options The parameter to the API call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function.
     *
     */
    getQueue: function(options) {
        options.appId = this.key;
        this.messaging.getQueue(options);
    },

    /**
     * Find queues that match a query.
     * 
     * Returns all the queue objects that match the given query. The query is a String
     * of the form name:value. For example, "location:austin", would search for all the
     * queues in Austin, assuming that the app is adding that attribute to all
     * its queues. 
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Object} options.query
     *
     * @param {Function} options.callback The function to be called after finding the matching queues.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the API call.
     * @param {Boolean} options.callback.success True if the API call succeeded.
     * @param {Object} options.callback.queues The {Ext.io.Queue[]} matching queues found for the App if the call succeeded, else an error object.
     *
     * @param {Function} options.success The function to be called upon success of the API.
     * The callback is passed the following parameters:
     * @param {Ext.io.Queue[]} options.success.queues The matching queues found for the App.
     * @param {Object} options.success.options The parameter to the API call.
     *
     * @param {Function} options.failure The function to be called upon failure of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.error An error object.
     * @param {Object} options.failure.options The parameter to the API call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function.
     *
     */
    findQueues: function(options) {
        this.findRelatedObjects("Queues", this.key, null, options.query, "Ext.io.Queue", function(err, queues) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                Ext.callback(options.callback, options.scope, [options, true, queues]);
                Ext.callback(options.success, options.scope, [queues, options]);
            }
        }, this);    
    },

    /** 
     * @private
     */
    createVersion: function(options) {
        var self = this;

        var errorCallback = function(err) {
            Ext.callback(options.callback, options.scope, [options, false, err]);
            Ext.callback(options.failure, options.scope, [err, options]);
        }

        options.file.ftype = 'package';
        self.messaging.sendContent({
            params:options.file,
            failure: function(err) {
                errorCallback(err);
            },
            success: function(csId) {
                options.data['package'] = csId; 
                var tmp = options.file.name.split('.');
                options.data.ext = "."+tmp[tmp.length - 1];
                self.createRelatedEntity("createVersion", 'Ext.io.Version', options.data, function(err, version) {
                    if (version) {
                        Ext.callback(options.callback, options.scope, [options, true, version]);
                        Ext.callback(options.success, options.scope, [version, options]);
                    } else {
                        errorCallback(err || null);
                    }
                }, self);
            }
        });
    },

    /** 
     * @private
     */
    getTeam: function(options) {
        this.getSingleLink("Organizations", null, null, "Ext.io.Team", function(err, team) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                Ext.callback(options.callback, options.scope, [options, true, team]);
                Ext.callback(options.success, options.scope, [team, options]);
            }
        }, this);
    },

    /** 
     * @private
     */
    getDeployedVersion: function(options) {
        var tag = (typeof(options.env) != "undefined") ? ((options.env == 'dev') ? 'dev' : 'prod') : 'prod';
        this.getSingleLink("Versions", null, tag, "Ext.io.Version", function(err, version) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                Ext.callback(options.callback, options.scope, [options, true, version]);
                Ext.callback(options.success, options.scope, [version, options]);
            }
        }, this);
    },

    /**
     * Get a Store
     *
     * If the store does not already exist then this app is the owner of the store. 
     */
    getStore: function(options) {
        // JCM ...  
    },

    findStores: function(options) {
        // JCM ...
    },

});


/**
 * {@img diagram.003.png Class Diagram}
 *
 * The {@link Ex.io.Device} class represents the device on which an app instance
 * is running. There is a current device object, for the client code
 * currently running, and is always available. Instances of this class are
 * also used to represent other devices running the same app. We can
 * communicate with them using this class.
 *
 * Methods are provided for navigation through the graph of objects available
 * to the currently running client code.
 */
Ext.define('Ext.io.Device', {
    extend: 'Ext.io.object.Object',

    statics: {

        devicesObject: null,

        getDevicesObject: function() {
            if(!this.devicesObject) {
                this.devicesObject = Ext.create('Ext.io.object.Objects', 'Instances', Ext.io.messaging);
            }             
            return this.devicesObject;            
        },

        /**
         * Get the current Device object.
         *
         * The current Device object is an instance of {@link Ext.io.Device} class. It represents
         * the device that this web app is running on. It is always available.
         *
         * @param {Object} options An object which may contain the following properties:
         *
         * @param {Function} options.callback The function to be called after getting the current Device object.
         * The callback is called regardless of success or failure and is passed the following parameters:
         * @param {Object} options.callback.options The parameter to the API call.
         * @param {Boolean} options.callback.success True if the API call succeeded.
         * @param {Object} options.callback.device The current {Ext.io.Device} object if the call succeeded, else an error object.
         *
         * @param {Function} options.success The function to be called upon success of the API.
         * The callback is passed the following parameters:
         * @param {Ext.io.Device} options.success.device The current {Ext.io.Device} object.
         * @param {Object} options.success.options The parameter to the API call.
         *
         * @param {Function} options.failure The function to be called upon failure of the API.
         * The callback is passed the following parameters:
         * @param {Object} options.failure.error An error object.
         * @param {Object} options.failure.options The parameter to the API call.
         *
         * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
         * the callback function.
         *
         */
        getCurrent: function(options) {
            var deviceId = Ext.naming.IDStore.getId('device');
            if (!deviceId) {
                var err = { message: "Device ID not found" };
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                this.getDevicesObject().get(deviceId, function(err, device) {
                    if(err) {
                        Ext.callback(options.callback, options.scope, [options, false, err]);
                        Ext.callback(options.failure, options.scope, [err, options]);
                    } else {
                        Ext.callback(options.callback, options.scope, [options, true, device]);
                        Ext.callback(options.success, options.scope, [device, options]);
                    }
                }, this);
            }
        },

        /**
         * @private
         */
        get: function(options) {
            this.getDevicesObject().get(options.id, function(err, device) {
                if(err) {
                    Ext.callback(options.callback, options.scope, [options, false, err]);
                    Ext.callback(options.failure, options.scope, [err, options]);
                } else {
                    Ext.callback(options.callback, options.scope, [options, true, device]);
                    Ext.callback(options.success, options.scope, [device, options]);
                }
            }, this);
        }
    },

    /**
     * @private
     */
    constructor: function(bucket, key, data, messaging) {
        this.superclass.constructor.call(this, bucket, key, data, messaging);
    },

    /**
     * Get the App associated with this Device.
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Function} options.callback The function to be called after getting the App object.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the API call.
     * @param {Boolean} options.callback.success True if the API call succeeded.
     * @param {Object} options.callback.app The {Ext.io.App} associated with this Device if the call succeeded, else an error object.
     *
     * @param {Function} options.success The function to be called upon success of the API.
     * The callback is passed the following parameters:
     * @param {Ext.io.App} options.success.app The {Ext.io.App} object associated with this Device.
     * @param {Object} options.success.options The parameter to the API call.
     *
     * @param {Function} options.failure The function to be called upon failure of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.error An error object.
     * @param {Object} options.failure.options The parameter to the API call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function.
     *
     */
    getApp: function(options) {
        this.getSingleLink("Versions", this.data.version, null, "Ext.io.Version", function(err, version) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                version.getSingleLink("Apps", null, null, "Ext.io.App", function(err, app) {
                    if(err) {
                        Ext.callback(options.callback, options.scope, [options, false, err]);
                        Ext.callback(options.failure, options.scope, [err, options]);
                    } else {
                        Ext.callback(options.callback, options.scope, [options, true, app]);
                        Ext.callback(options.success, options.scope, [app, options]);
                    }
                }, this);
            }
        }, this);
    },

    /**
     * Get the User associated with this Device, if any.
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Function} options.callback The function to be called after getting the User object.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the API call.
     * @param {Boolean} options.callback.success True if the API call succeeded.
     * @param {Object} options.callback.user The {Ext.io.User} associated with this Device if the call succeeded, else an error object.
     *
     * @param {Function} options.success The function to be called upon success of the API.
     * The callback is passed the following parameters:
     * @param {Ext.io.User} options.success.user The {Ext.io.User} object associated with this Device.
     * @param {Object} options.success.options The parameter to the API call.
     *
     * @param {Function} options.failure The function to be called upon failure of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.error An error object.
     * @param {Object} options.failure.options The parameter to the API call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function.
     *
     */
    getUser: function(options) {
        this.getSingleLink("Users", null, null, "Ext.io.User", function(err, user) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                Ext.callback(options.callback, options.scope, [options, true, user]);
                Ext.callback(options.success, options.scope, [user, options]);
            }
        }, this);
    },

    /**
     * Send a message to this Device.
     *
     * The send method allow messages to be sent to another device. The message
     * is a simple Javascript object. The message is queued on the server until
     * the destination device next comes online, then it is delivered.
     *
     * See receive for receiving these device to device messages.
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Object} options.message A simple Javascript object.
     *
     * @param {Function} options.callback The function to be called after sending the message to the server for delivery.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the API call.
     * @param {Boolean} options.callback.success True if the API call succeeded.
     * @param {Object} options.callback.response A response object from the server to the API call.
     *
     * @param {Function} options.success The function to be called upon success of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.success.response A response object from the server to the API call.
     * @param {Object} options.success.options The parameter to the API call.
     *
     * @param {Function} options.failure The function to be called upon failure of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.error An error object.
     * @param {Object} options.failure.options The parameter to the API call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function.
     *
     */
    send: function(options) {
        this.messaging.transport.sendToClient(this.key, options.message, function(err, response) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, response]);
                Ext.callback(options.failure, options.scope, [response, options]);
            } else {
                Ext.callback(options.callback, options.scope, [options, true, response]);
                Ext.callback(options.success, options.scope, [response, options]);
            }
        }, this);
    },

    /**
     * Receive messages for this Device.
     *
     * To receive messages sent directly to a device the app must use this
     * method to register a handler function. Each message is passed to the
     * callback function as it is received. The message is a simple Javascript
     * object.
     *
     * See send for sending these device to device messages.
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Function} options.callback The function to be called after receiving a message for this Device.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the API call.
     * @param {Boolean} options.callback.success True if the API call succeeded.
     * @param {String} options.callback.from The sending Device ID.
     * @param {Object} options.callback.message A simple Javascript object.
     *
     * @param {Function} options.success The function to be called upon success of the API.
     * The callback is passed the following parameters:
     * @param {String} options.success.from The sending Device ID.
     * @param {Object} options.success.message A simple Javascript object.
     * @param {Object} options.success.options The parameter to the API call.
     *
     * @param {Function} options.failure The function to be called upon failure of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.error An error object.
     * @param {Object} options.failure.options The parameter to the API call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function.
     *
     */
    receive: function(options) {
        this.messaging.transport.setListener("courier", function(envelope) {
            Ext.callback(options.callback, options.scope, [options, true, envelope.from, envelope.msg]);
            Ext.callback(options.success, options.scope, [envelope.from, envelope.msg, options]);
        }, this);
    },

    /**
     * @private
     */
    getVersion: function(options) {
        this.getSingleLink("Versions", this.data.version, null, "Ext.io.Version", function(err, version) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                Ext.callback(options.callback, options.scope, [options, true, version]);
                Ext.callback(options.success, options.scope, [version, options]);
            }
        }, this);
    },

    /**
     * Get a Store
     * 
     * If the store does not already exist then this device is the owner of the store.
     */
    getStore: function(options) {
        // JCM ...  
    },

    findStores: function(options) {
        // JCM ...
    },

});

/**
 * {@img diagram.003.png Class Diagram}
 *
 * The {@link Ext.io.User} class represents a user. If the current app is associated
 * with a user group and that user group has been configured appropriatly,
 * then a current user object will be available for the user currently
 * using the app. Instances of this class are also used to represent other users
 * using the same app. We can communicate with them using this class.
 *
 * Methods are provided for navigation through the graph of objects available
 * to the currently running client code.

 */
Ext.define('Ext.io.User', {
    extend: 'Ext.io.object.Object',

    statics: {

        usersObject: null,

        getUsersObject: function() {
            if(!this.usersObject) {
                this.usersObject = Ext.create('Ext.io.object.Objects', 'Users', Ext.io.messaging);
            }             
            return this.usersObject;            
        },

        /**
         * Get the current User, if any.
         *
         * The current User object is an instance of {@link Ext.io.User}. It represents
         * the user of the web app. If there is no group associated with the app,
         * then there will not be a current user object. If there is a group, and
         * it has been configured to authenticate users before download then the
         * current user object will be available as soon as the app starts running.
         * If the group has been configured to authenticate users within the app
         * itself then the current user object will not exist until after a
         * successful call to Ext.io.Group.authenticate has been made.
         *
         * @param {Object} options An object which may contain the following properties:
         *
         * @param {Function} options.callback The function to be called after getting the current User object.
         * The callback is called regardless of success or failure and is passed the following parameters:
         * @param {Object} options.callback.options The parameter to the API call.
         * @param {Boolean} options.callback.success True if the API call succeeded.
         * @param {Object} options.callback.user The current {Ext.io.User} object if the call succeeded, else an error object.
         *
         * @param {Function} options.success The function to be called upon success of the API.
         * The callback is passed the following parameters:
         * @param {Ext.io.User} options.success.user The current {Ext.io.User} object.
         * @param {Object} options.success.options The parameter to the API call.
         *
         * @param {Function} options.failure The function to be called upon failure of the API.
         * The callback is passed the following parameters:
         * @param {Object} options.failure.error An error object.
         * @param {Object} options.failure.options The parameter to the API call.
         *
         * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
         * the callback function.
         *
         */
        getCurrent: function(options) {
            var userId = Ext.naming.IDStore.getId('user');
            if (!userId) {
                var err = { message: "User ID not found" };
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                this.getUsersObject().get(userId, function(err, user) {
                    if(err) {
                        Ext.callback(options.callback, options.scope, [options, false, err]);
                        Ext.callback(options.failure, options.scope, [err, options]);
                    } else {
                        Ext.callback(options.callback, options.scope, [options, true, user]);
                        Ext.callback(options.success, options.scope, [user, options]);
                    }
                }, this);
            }
        },

        /**
         * @private
         */
        get: function(options) {
            this.getUsersObject().get(options.id, function(err, user) {
                if(err) {
                    Ext.callback(options.callback, options.scope, [options, false, err]);
                    Ext.callback(options.failure, options.scope, [err, options]);
                } else {
                    Ext.callback(options.callback, options.scope, [options, true, user]);
                    Ext.callback(options.success, options.scope, [user, options]);
                }
            }, this);
        }

    },

    /**
     * @private
     */
    constructor: function(bucket, key, data, messaging) {
        this.superclass.constructor.call(this, bucket, key, data, messaging);
        this.userQueueName = bucket + '/' + key;
        // name of the user queue (inbox)
    },

    /**
     * Get all devices that belong to this user
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Function} options.callback The function to be called after getting the devices that belong to this user.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the API call.
     * @param {Boolean} options.callback.success True if the API call succeeded.
     * @param {Object} options.callback.devices The {Ext.io.Device[]} devices belonging to this User if the call succeeded, else an error object.
     *
     * @param {Function} options.success The function to be called upon success of the API.
     * The callback is passed the following parameters:
     * @param {Ext.io.Device[]} options.success.devices The devices belonging to this User.
     * @param {Object} options.success.options The parameter to the API call.
     *
     * @param {Function} options.failure The function to be called upon failure of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.error An error object.
     * @param {Object} options.failure.options The parameter to the API call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function.
     *
     */
    getDevices: function(options) {
        this.getRelatedObjects("Instances", null, "Ext.io.Device", function(err, devices) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                Ext.callback(options.callback, options.scope, [options, true, devices]);
                Ext.callback(options.success, options.scope, [devices, options]);
            }
        }, this);
    },

    /**
     * Get the user group that this user is a member of.
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Function} options.callback The function to be called after getting the Group object.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the API call.
     * @param {Boolean} options.callback.success True if the API call succeeded.
     * @param {Object} options.callback.group The {Ext.io.Group} object for this User if the call succeeded, else an error object.
     *
     * @param {Function} options.success The function to be called upon success of the API.
     * The callback is passed the following parameters:
     * @param {Ext.io.Group} options.success.group The {Ext.io.Group} object for this User.
     * @param {Object} options.success.options The parameter to the API call.
     *
     * @param {Function} options.failure The function to be called upon failure of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.error An error object.
     * @param {Object} options.failure.options The parameter to the API call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function.
     *
     */
    getGroup: function(options) {
        this.getSingleLink("Realms", this.data.realm, null, "Ext.io.Group", function(err, group) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                Ext.callback(options.callback, options.scope, [options, true, group]);
                Ext.callback(options.success, options.scope, [group, options]);
            }
        }, this);
    },

    /**
     * Send a message to this User.
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Object} options.message A simple Javascript object.
     *
     * @param {Function} options.callback The function to be called after sending the message to the server for delivery.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the API call.
     * @param {Boolean} options.callback.success True if the API call succeeded.
     * @param {Object} options.callback.response A response object from the server to the API call.
     *
     * @param {Function} options.success The function to be called upon success of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.success.response A response object from the server to the API call.
     * @param {Object} options.success.options The parameter to the API call.
     *
     * @param {Function} options.failure The function to be called upon failure of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.error An error object.
     * @param {Object} options.failure.options The parameter to the API call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function.
     */
    send: function(options) {
        this.messaging.pubsub.publish(this.userQueueName, null, options.message, function(err, response) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, response]);
                Ext.callback(options.failure, options.scope, [response, options]);
            } else {
                Ext.callback(options.callback, options.scope, [options, true, response]);
                Ext.callback(options.success, options.scope, [response, options]);
            }
        }, this);
    },

    /**
     * Receive messages for this User.
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Function} options.callback The function to be called after a message is received for this User.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the API call.
     * @param {Boolean} options.callback.success True if the API call succeeded.
     * @param {String} options.callback.from The sending Device ID.
     * @param {Object} options.callback.message A simple Javascript object.
     *
     * @param {Function} options.success The function to be called upon success of the API.
     * The callback is passed the following parameters:
     * @param {String} options.success.from The sending Device ID.
     * @param {Object} options.success.message A simple Javascript object.
     * @param {Object} options.success.options The parameter to the API call.
     *
     * @param {Function} options.failure The function to be called upon failure of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.error An error object.
     * @param {Object} options.failure.options The parameter to the API call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function.
     */
    receive: function(options) {
        this.messaging.pubsub.subscribe(this.userQueueName, null, function(from, message) {
            Ext.callback(options.callback, options.scope, [options, true, from, message]);
            Ext.callback(options.success, options.scope, [from, message, options]);
        }, this, function(err, response) {
            Ext.callback(options.callback, options.scope, [options, false, response]);
            Ext.callback(options.failure, options.scope, [response, options]);
        });        
    },

    /**
     * Get a Store
     *
     * If the store does not already exist then this user is the owner of the store.
     */
    getStore: function(options) {
        // JCM ...  
    },

    /**
     * Find Stores
     *
     * Find stores that match the query.
     */
    findStores: function(options) {
        // JCM ...
    },

});

/**
 * {@img diagram.003.png Class Diagram}
 *
 * The {@link Ext.io.Group} class represents a group of users. There is only one
 * group object, called the current group object, available to the client.
 * If the current app is not associated with a user group then there will
 * be no user group.
 *
 * Methods are provided for navigation through the graph of objects available
 * to the currently running client code. 
 */
Ext.define('Ext.io.Group', {
    extend: 'Ext.io.object.Object',

    statics: {

        groupsObject: null,

        getGroupsObject: function() {
            if(!this.groupsObject) {
                this.groupsObject = Ext.create('Ext.io.object.Objects', 'Realms', Ext.io.messaging);
            }             
            return this.groupsObject;            
        },

        /**
         * Get the current user Group object.
         *
         * @param {Object} options An object which may contain the following properties:
         *
         * @param {Function} options.callback The function to be called after getting the current Group object.
         * The callback is called regardless of success or failure and is passed the following parameters:
         * @param {Object} options.callback.options The parameter to the API call.
         * @param {Boolean} options.callback.success True if the API call succeeded.
         * @param {Object} options.callback.group The current {Ext.io.Group} object if the call succeeded, else an error object.
         *
         * @param {Function} options.success The function to be called upon success of the API.
         * The callback is passed the following parameters:
         * @param {Ext.io.Group} options.success.group The current {Ext.io.Group} object.
         * @param {Object} options.success.options The parameter to the API call.
         *
         * @param {Function} options.failure The function to be called upon failure of the API.
         * The callback is passed the following parameters:
         * @param {Object} options.failure.error An error object.
         * @param {Object} options.failure.options The parameter to the API call.
         *
         * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
         * the callback function.
         *
         */
        getCurrent: function(options) {
            var groupId = Ext.naming.IDStore.getId('group');
            if (!groupId) {
                var err = { message: "Group ID not found" };
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                this.getGroupsObject().get(groupId, function(err, group) {
                    if(err) {
                        Ext.callback(options.callback, options.scope, [options, false, err]);
                        Ext.callback(options.failure, options.scope, [err, options]);
                    } else {
                        Ext.callback(options.callback, options.scope, [options, true, group]);
                        Ext.callback(options.success, options.scope, [group, options]);
                    }
                }, this);
            }
        },

        /** 
         * @private
         */
        get: function(options) {
            this.getGroupsObject().get(options.id, function(err, group) {
                if(err) {
                    Ext.callback(options.callback, options.scope, [options, false, err]);
                    Ext.callback(options.failure, options.scope, [err, options]);
                } else {
                    Ext.callback(options.callback, options.scope, [options, true, group]);
                    Ext.callback(options.success, options.scope, [group, options]);
                }
            }, this);
        }
    },

    /** 
     * @private
     */
    constructor: function(bucket, key, data, messaging) {
        this.superclass.constructor.call(this, bucket, key, data, messaging);
    },

    /**
     * Get the App associated with this user Group.
     *
     * Returns an instance of {@link Ext.io.App} for the current app.
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Function} options.callback The function to be called after getting the App object.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the API call.
     * @param {Boolean} options.callback.success True if the API call succeeded.
     * @param {Object} options.callback.app The {Ext.io.App} associated with this Group if the call succeeded, else an error object.
     *
     * @param {Function} options.success The function to be called upon success of the API.
     * The callback is passed the following parameters:
     * @param {Ext.io.App} options.success.app The {Ext.io.App} object associated with this Group.
     * @param {Object} options.success.options The parameter to the API call.
     *
     * @param {Function} options.failure The function to be called upon failure of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.error An error object.
     * @param {Object} options.failure.options The parameter to the API call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function.
     *
     */
    getApp: function(options) {
        Ext.io.App.getCurrent(options);
    },

    /**
     * Find Users that match a query.
     *
     * Returns all the user objects that match the given query. The query is a String
     * of the form name:value. For example, "hair:brown", would search for all the
     * users with brown hair, assuming that the app is adding that attribute to all
     * its users. 
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Object} options.query
     *
     * @param {Function} options.callback The function to be called after finding the matching users.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the API call.
     * @param {Boolean} options.callback.success True if the API call succeeded.
     * @param {Object} options.callback.users The {Ext.io.User[]} matching users found for the Group if the call succeeded, else an error object.
     *
     * @param {Function} options.success The function to be called upon success of the API.
     * The callback is passed the following parameters:
     * @param {Ext.io.User[]} options.success.users The matching users found for the Group.
     * @param {Object} options.success.options The parameter to the API call.
     *
     * @param {Function} options.failure The function to be called upon failure of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.error An error object.
     * @param {Object} options.failure.options The parameter to the API call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function.
     *
     */
    findUsers: function(options) {
        this.findRelatedObjects("Users", this.key, null, options.query, 'Ext.io.User', function(err, users) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                Ext.callback(options.callback, options.scope, [options, true, users]);
                Ext.callback(options.success, options.scope, [users, options]);
            }
        }, this);
    },

    /**
     * Register a new User.
     * 
     * If the user does not already exist in the group then a new user is created,
     * and is returned as an instance of {@link Ext.io.User}. The same user is now available
     * through the {@link Ext.io.getCurrentUser}.
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Object} params User profile attributes.
     * @param {Object} params.username
     * @param {Object} params.password
     * @param {Object} params.email
     *
     * @param {Function} options.callback The function to be called after registering the user.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the API call.
     * @param {Boolean} options.callback.success True if the API call succeeded.
     * @param {Object} options.callback.user The {Ext.io.User} if registration succeeded, else an error object.
     *
     * @param {Function} options.success The function to be called upon success of the API.
     * The callback is passed the following parameters:
     * @param {Ext.io.User} options.success.user The registered user.
     * @param {Object} options.success.options The parameter to the API call.
     *
     * @param {Function} options.failure The function to be called upon failure of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.error An error object.
     * @param {Object} options.failure.options The parameter to the API call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function.
     *
     */
    register: function(options) {
        var self = this;

        this.messaging.getService({
            name: "authorization",
            success: function(authService) {
                authService.realmRegister(function(result) {
                    if (result.status == "success") {
                        var user = Ext.create('Ext.io.User', result.value._bucket, result.value._key, result.value.data, self.messaging);

                        Ext.naming.IDStore.setId('user', user.key);
                        //Ext.naming.IDStore.setSid('user', user.sid);

                        Ext.callback(options.callback, options.scope, [options, true, user]);
                        Ext.callback(options.success, options.scope, [user, options]);
                    } else {
                        var err = { message : 'Can not register this user' };
                        Ext.callback(options.callback, options.scope, [options, false, err]);
                        Ext.callback(options.failure, options.scope, [err, options]);
                    }
                }, self.key, options.params);
            },
            failure: function(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            }
        });
    },

    /**
     * Authenticate an existing User.
     *
     * Checks if the user is a member of the group. The user provides a username
     * and password. If the user is a member of the group, and the passwords match,
     * then an instance of {@link Ext.io.User} is returned. The current user object is
     * now available through {@link Ext.io.getCurrentUser}
     *
     * We use a digest based authentication mechanism to ensure that no
     * sensitive information is passed over the network.
     *
     * @param {Object} options An object which may contain the following properties:
     *
     * @param {Object} params Authentication credentials
     * @param {Object} params.username
     * @param {Object} params.password
     *
     * @param {Function} options.callback The function to be called after authenticating the user.
     * The callback is called regardless of success or failure and is passed the following parameters:
     * @param {Object} options.callback.options The parameter to the API call.
     * @param {Boolean} options.callback.success True if the API call succeeded.
     * @param {Object} options.callback.user The {Ext.io.User} if authentication succeeded, else an error object.
     *
     * @param {Function} options.success The function to be called upon success of the API.
     * The callback is passed the following parameters:
     * @param {Ext.io.User} options.success.user The authenticated user.
     * @param {Object} options.success.options The parameter to the API call.
     *
     * @param {Function} options.failure The function to be called upon failure of the API.
     * The callback is passed the following parameters:
     * @param {Object} options.failure.error An error object.
     * @param {Object} options.failure.options The parameter to the API call.
     *
     * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
     * the callback function.
     *
     */
    authenticate: function(options) {
        var self = this;

        Ext.io.AuthStrategies.strategies['digest'](this, options.params, function(err, result) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                var user = Ext.create('Ext.io.User', result.value._bucket, result.value._key, result.value.data, self.messaging);
                     
                Ext.naming.IDStore.setId('user', user.key);
                Ext.naming.IDStore.setSid('user', result.sid);

                Ext.callback(options.callback, options.scope, [options, true, user]);
                Ext.callback(options.success, options.scope, [user, options]);
            }
        }, this);
    },

    // JCM logout
    // JCM Ext.naming.IDStore.remove('user','sid');

    /**
     * Get a Store
     *
     * If the store does not already exist then this group is the owner of the store.
     */
    getStore: function(options) {
        // JCM ...  
    },

    findStores: function(options) {
        // JCM ...
    },

});

Ext.define('Ext.io.Developer', {
    extend: 'Ext.io.object.Object',

    statics: {

        developersObject: null,

        getDevelopersObject: function() {
            if(!this.developersObject) {
                this.developersObject = Ext.create('Ext.io.object.Objects', 'Developers', Ext.io.messaging);
            }             
            return this.developersObject;            
        },

        /**
         * @private
         */
        authenticate: function(options) {
            var self = this;

            Ext.io.getService({
                name: "developer",
                success: function(devService) {
                    devService.devAuth(function(result) {
                        if (result.status == "success") {
                            var developer = Ext.create('Ext.io.Developer', result.value._bucket, result.value._key, result.value.data, Ext.io.messaging);

                            Ext.naming.IDStore.setSid('developer', result.sid);
                            Ext.naming.IDStore.setId('developer', result.value._key);

                            Ext.callback(options.callback, options.scope, [options, true, developer]);
                            Ext.callback(options.success, options.scope, [developer, options]);
                        } else {
                            var err = (typeof result.error != "undefined") ? result.error : { message : 'Can not authenticate this developer' };
                            Ext.callback(options.callback, options.scope, [options, false, err]);
                            Ext.callback(options.failure, options.scope, [err, options]);
                        }
                    }, {username : options.params.username, password : Ext.util.MD5(options.params.password)});
                },
                failure: function(err) {
                    Ext.callback(options.callback, options.scope, [options, false, err]);
                    Ext.callback(options.failure, options.scope, [err, options]);
                }
            });
        },

        /**
         * @private
         */
        getCurrent: function(options) {
            var developerId = Ext.naming.IDStore.getId('developer');
            if (!developerId) {
                var err = { message: "Developer not logged in." };
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                this.getDevelopersObject().get(developerId, function(err, dev) {
                    if(err) {
                        Ext.callback(options.callback, options.scope, [options, false, err]);
                        Ext.callback(options.failure, options.scope, [err, options]);
                    } else {
                        Ext.callback(options.callback, options.scope, [options, true, dev]);
                        Ext.callback(options.success, options.scope, [dev, options]);
                    }
                }, this);
            }
        },

        /**
         * @private
         */
        get: function(options) {
            this.getDevelopersObject().get(options.id, function(err, dev) {
                if(err) {
                    Ext.callback(options.callback, options.scope, [options, false, err]);
                    Ext.callback(options.failure, options.scope, [err, options]);
                } else {
                    Ext.callback(options.callback, options.scope, [options, true, dev]);
                    Ext.callback(options.success, options.scope, [dev, options]);
                }
            }, this);
        }
    },

    /**
     * @private
     */
    constructor: function(bucket, key, data, messaging) {
        this.superclass.constructor.call(this, bucket, key, data, messaging);
    },

    /**
     * @private
     */
    getTeams: function(options) {
        this.getRelatedObjects("Organizations", null, 'Ext.io.Team', function(err, teams) {
            if (err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                Ext.callback(options.callback, options.scope, [options, true, teams]);
                Ext.callback(options.success, options.scope, [teams, options]);
            }
        }, this);
    },

    /**
     * @private
     */
    createTeam: function(options) {
        this.createRelatedEntity("createOrganization", 'Ext.io.Team', options.data, function(err, team) {
            if (team) {
                Ext.callback(options.callback, options.scope, [options, true, team]);
                Ext.callback(options.success, options.scope, [team, options]);
            } else {
                var error = (err) ? err : { message : 'Can not create such entity' };
                Ext.callback(options.callback, options.scope, [options, false, error]);
                Ext.callback(options.failure, options.scope, [error, options]);
            }
        }, this);
    },
    
});
Ext.define('Ext.io.Team', {
    extend: 'Ext.io.object.Object',

    statics: {

        teamsObject: null,

        getTeamsObject: function() {
            if(!this.teamsObject) {
                this.teamsObject = Ext.create('Ext.io.object.Objects', 'Organizations', Ext.io.messaging);
            }             
            return this.teamsObject;            
        },

        /**
         * @private
         */
        get: function(options) {
            this.getTeamsObject().get(options.id, function(err, team) {
                if(err) {
                    Ext.callback(options.callback, options.scope, [options, false, err]);
                    Ext.callback(options.failure, options.scope, [err, options]);
                } else {
                    Ext.callback(options.callback, options.scope, [options, true, team]);
                    Ext.callback(options.success, options.scope, [team, options]);
                }
            }, this);
        }
    },

    /**
     * @private
     */
    constructor: function(bucket, key, data, messaging) {
        this.superclass.constructor.call(this, bucket, key, data, messaging);
    },

    /**
     * @private
     */
    createApp: function(options) {
        this.createRelatedEntity("createApp", 'Ext.io.App', options.data, function(err, app) {
            if (app) {
                Ext.callback(options.callback, options.scope, [options, true, app]);
                Ext.callback(options.success, options.scope, [app, options]);
            } else {
                var error = (err) ? err : { message : 'Can not create such entity' };
                Ext.callback(options.callback, options.scope, [options, false, error]);
                Ext.callback(options.failure, options.scope, [error, options]);
            }
        }, this);
    },

    /**
     * @private
     */
    createGroup: function(options) {
        this.createRelatedEntity("createGroup", 'Ext.io.Group', options.data, function(err, group) {
            if (group) {
                Ext.callback(options.callback, options.scope, [options, true, group]);
                Ext.callback(options.success, options.scope, [group, options]);
            } else {
                var error = (err) ? err : { message : 'Can not create such entity' };
                Ext.callback(options.callback, options.scope, [options, false, error]);
                Ext.callback(options.failure, options.scope, [error, options]);
            }
        }, this);
    },

    /**
     * @private
     */
    getDevelopers: function(options) {
        var tag = (typeof(options.owner) != "undefined") ? ((options.owner) ? 'ownr' : 'memb') : '_';
        this.getRelatedObjects("Developers", tag, "Ext.io.Developer", function(err, developers) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                Ext.callback(options.callback, options.scope, [options, true, developers]);
                Ext.callback(options.success, options.scope, [developers, options]);
            }
        }, this);
    },

    /**
     * @private
     */
    getApps: function(options) {
        this.getRelatedObjects("Apps", null, "Ext.io.App", function(err, apps) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                Ext.callback(options.callback, options.scope, [options, true, apps]);
                Ext.callback(options.success, options.scope, [apps, options]);
            }
        }, this);
    },

    /**
     * @private
     */
    getGroups: function(options) {
        this.getRelatedObjects("Realms", null, "Ext.io.Group", function(err, groups) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                Ext.callback(options.callback, options.scope, [options, true, groups]);
                Ext.callback(options.success, options.scope, [groups, options]);
            }
        }, this);
    },

    /**
     * @private
     */
    manageDeveloper: function(options) {
        var self = this;
        
        this.messaging.getService({
            name: "naming-rpc",
            success: function(namingRpc) {
                namingRpc[options.method](function(result) {
                    if(result.status == "success") {
                        Ext.callback(options.callback, options.scope, [options, true, true]);
                        Ext.callback(options.success, options.scope, [true, options]);
                    } else {
                        var err = { message: result.description };
                        Ext.callback(options.callback, options.scope, [options, false, err]);
                        Ext.callback(options.failure, options.scope, [err, options]);
                    }
                }, self.key, (options.key || options.username));
            },
            failure: function(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            }
        });
    },

    /**
     * @private
     */
    addDeveloper: function(options) {
        options.method = 'addDeveloper';
        this.manageDeveloper(options);
    },

    /**
     * @private
     */
    removeDeveloper: function(options) {
        options.method = 'removeDeveloper';
        this.manageDeveloper(options);
    },

    /**
     * @private
     */
    inviteDeveloper: function(options) {
        options.method = 'inviteDeveloper';
        this.manageDeveloper(options);
    },

});
Ext.define('Ext.io.Version', {
    extend: 'Ext.io.object.Object',

    statics: {

        versionsObject: null,

        getVersionsObject: function() {
            if(!this.versionsObject) {
                this.versionsObject = Ext.create('Ext.io.object.Objects', 'Versions', Ext.io.messaging);
            }             
            return this.versionsObject;            
        },

        /**
         * @private
         */
        get: function(options) {
            this.getVersionsObject().get(options.id, function(err, version) {
                if(err) {
                    Ext.callback(options.callback, options.scope, [options, false, err]);
                    Ext.callback(options.failure, options.scope, [err, options]);
                } else {
                    Ext.callback(options.callback, options.scope, [options, true, version]);
                    Ext.callback(options.success, options.scope, [version, options]);
                }
            }, this);
        }
    },

    /**
     * @private
     */
    constructor: function(bucket, key, data, messaging) {
        this.superclass.constructor.call(this, bucket, key, data, messaging);
    },

    /**
     * @private
     */
    deploy: function(options) {
        var self = this;
        
        this.messaging.getService({
            name: "naming-rpc",
            success: function(namingRpc) {
            	namingRpc.deployVersion(function(result) {
                    if(result.status == "success") {
                        Ext.callback(options.callback, options.scope, [options, true, true]);
            			Ext.callback(options.success, options.scope, [true, options]);
                    } else {
                        var err = { message : (typeof result.description != "undefined") ? result.description : 'Can not deploy this version' };
                        Ext.callback(options.callback, options.scope, [options, false, err]);
            			Ext.callback(options.failure, options.scope, [err, options]);
                    }
                }, self.key, options.env);
            },
            failure: function(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
            	Ext.callback(options.failure, options.scope, [err, options]);
            }
        });
    },

    /**
     * @private
     */
    undeploy: function(options) {
        var self = this;
        
        this.messaging.getService({
            name: "naming-rpc",
            success: function(namingRpc) {
            	namingRpc.undeployVersion(function(result) {
                    if(result.status == "success") {
                        Ext.callback(options.callback, options.scope, [options, true, true]);
            			Ext.callback(options.success, options.scope, [true, options]);
                    } else {
                        var err = { message : (typeof result.description != "undefined") ? result.description : 'Can not undeploy this version' };
                        Ext.callback(options.callback, options.scope, [options, false, err]);
            			Ext.callback(options.failure, options.scope, [err, options]);
                    }
                }, self.key, options.env);
            },
            failure: function() {
                Ext.callback(options.callback, options.scope, [options, false, null]);
            	Ext.callback(options.failure, options.scope, [null, options]);
            }
        });
    },

    /** 
     * @private
     */
    getApp: function(options) {
        this.getSingleLink("Apps", null, null, "Ext.io.App", function(err, app) {
            if(err) {
                Ext.callback(options.callback, options.scope, [options, false, err]);
                Ext.callback(options.failure, options.scope, [err, options]);
            } else {
                Ext.callback(options.callback, options.scope, [options, true, app]);
                Ext.callback(options.success, options.scope, [app, options]);
            }
        }, this);
    },

});
/**
 * 
 * @private
 *
 * SyncStore
 *
 * It maintains...
 *
 *  - an ID to OID index
 *  - a Change Stamp to OID index
 *
 */

Ext.define('Ext.data.SyncStore', {
	
	logger: Ext.util.Logger,

	asyncInitialize: function(config,callback,scope) {
		Ext.data.utilities.check('SyncStore', 'initialize', 'config', config, ['databaseName']);

        this.store= config.localStorageProxy || window.localStorage;
        this.id= config.databaseName;

		var hasRecords= this.getIds().length>0
		this.readConfig('databaseDefinition',function(data) {
			if(hasRecords && !data){
				this.logger.error('Ext.data.SyncStore.initialize: Tried to use an existing store,',config.databaseName,', as a syncstore.');
				callback.call(scope,{r:'error'});
			}else{
				// ok
				this.readConfig('index',function(data) {
					this.index= data;
					this.readConfig('csiv',function(data) {
						this.csiv= data ? Ext.create(Ext.io.ds.CSIV).decode(data) : undefined;
						if(!this.index || !this.csiv){
							this.reindex(function(){
								callback.call(scope,{r:'ok'});
							},this);
						}else{
							callback.call(scope,{r:'ok'});
						}
					},this);
				},this);
			}
		},this);
    },

	// crud

	create: function(records, callback, scope) {
		var ids= this.getIds();
		records.forEach(function(record){
			ids.push(record.getOid());
			this.setRecord(record);
		},this);
		this.setIds(ids);
		if(callback){
			callback.call(scope);
		}
	},

    readByOid: function(oid, callback, scope) {
    	var record= this.getRecord(oid);
		callback.call(scope,record);
    },

    readByOids: function(oids, callback, scope) {
    	var records= [];
        var i, l= oids.length;
        for(i=0;i<l;i++){
            this.readByOid(oids[i],function(record){
            	records.push(record);
            },this);
        }
		callback.call(scope,records);
    },

    readById: function(id, callback, scope) {
        this.lookupIDIndex(id,function(oid){
	    	//console.log('readById',id,'->',oid)
        	if(oid){
	        	this.readByOid(oid,callback,scope);
        	}else{
        		callback.call(scope);
        	}
        },this);    
    },

	readByCSV: function(csv, callback, scope) {
        //
        // Use the CS index to get a list of records that have changed since csv
        //
    	var oids= this.csiv.oidsFrom(csv);
    	this.readByOids(oids,callback,scope)
    },

    readAll: function(callback, scope){
    	this.readByOids(this.getIds(),callback,scope);
	},

    update: function(records, callback, scope) {
    	records.forEach(function(record){
    		this.setRecord(record);
    	},this)
    	if(callback){
			callback.call(scope);
    	}
    },

    destroy: function(oid, callback, scope) {
		if(Ext.isArray(oid)){
			var ids= this.getIds();
			var i, l= oid.length;
			for(i=0;i<l;i++){
				var id= oid[i];
	            Ext.Array.remove(ids, id);
	        	var key = this.getRecordKey(id);
	            this.store.removeItem(key);
			}
			this.setIds(ids);
			if(callback){
				callback.call(scope);
			}
		}else{
			this.destroy([oid],callback,scope);
		}
    },

	clear: function(callback, scope) {
        var ids = this.getIds(), len = ids.length, i;
        for (i = 0; i < len; i++) {
        	var key = this.getRecordKey(ids[i]);
            this.store.removeItem(key);
        }
        this.store.removeItem(this.id);
        this.store.removeItem(this.getRecordKey('index'));
        this.store.removeItem(this.getRecordKey('csiv'));
        this.index= {};
        this.csiv= Ext.create(Ext.io.ds.CSIV)
        callback.call(scope);
	},

    setModel: function(userModel) {
    	this.model= userModel;
    },

	// config

	readConfig: function(oid, callback, scope) {
		var item= this.store.getItem(this.getRecordKey(oid));
		var data= item ? Ext.decode(item) : {};
		callback.call(scope,data)
	},
	
	writeConfig: function(oid, data, callback, scope) {
		this.store.setItem(this.getRecordKey(oid),Ext.encode(data));
		callback.call(scope,data);
	},
	
	removeConfig: function(oid, callback, scope) {
		this.store.removeItem(this.getRecordKey(oid));
		callback.call(scope);
	},

	// id to oid index 

	updateIDIndex: function(id, oid, callback, scope) {
		this.index[id]= oid;
		this.writeConfig('index',this.index,callback,scope);
	},

	lookupIDIndex: function(id, callback, scope) {
		var oid= this.index[id];
		callback.call(scope,oid)
	},
	
	getIndex: function(callback,scope) {
		callback.call(scope,this.index);
	},

	setIndex: function(index,callback,scope) {
		if(index){
			this.index= index;
			this.writeConfig('index',this.index,callback,scope);
		}else{
			callback.call(scope);
		}
	},
	
	// cs to oid index
	
	getCSIndex: function(callback,scope) {
		callback.call(scope,this.csiv);
	},

	setCSIndex: function(csiv,callback,scope) {
		if(csiv){
			this.csiv= csiv;
			this.writeConfig('csiv',this.csiv.encode(),callback,scope);
		}else{
			callback.call(scope);
		}
	},

	// change replica number

    changeReplicaNumber: function(old_replica_number,new_replica_number,callback,scope) {
        this.readAll(function(records){
            var i, l= records.length;
            for(i=0;i<l;i++){
                var record= records[i];    
                var oid= record.getOid();
                if (record.changeReplicaNumber(old_replica_number,new_replica_number)) {
			    	if(record.getOid()!=oid){
				    	record.phantom= false;
	                    this.create([record]);
						this.destroy(oid);
			    	}else{
						this.update([record]);
			    	}
                }
            }
            this.reindex(callback,scope);            
        },this);
    },

	// reindex

	reindex: function(callback,scope){
		this.index= {};
		this.csiv= new Ext.io.ds.CSIV();
		this.readAll(function(records){
			var i, l= records.length;
            for(i=0;i<l;i++){
                var record= records[i];
                var oid= record.getOid();
				this.forEachCS(function(cs){
					this.csiv.add(cs,oid);
				},this);
				this.index[record.get(this.model.getIdProperty())]= oid;
            }
            callback.call(scope);
		},this);
	},	
	
	forEachCS: function(state,callback,scope) {
		for(name in state) {
			if (state.hasOwnProperty(name)) {
				var next_state= state[name];
				if (typeof next_state==='string'){
					callback.call(scope,new Ext.io.ds.CS(next_state));
				}else{
					callback.call(scope,new Ext.io.ds.CS(next_state[0]));
					this.forEachCS(callback,scope,next_state[1]); // [cs,state]
				}
			}
		}
	},


	getIds: function(){
		var ids= [];
		var item= this.store.getItem(this.id);
		if(item){
			ids= item.split(',');
		}
		//console.log('getIds',ids)
		return ids;
	},

    setIds: function(ids) {
        //iPad bug requires that we remove the item before setting it
        this.store.removeItem(this.id);
        this.store.setItem(this.id, ids.join(','));
		//console.log('setIds',ids)
    },

    getRecordKey: function(id) {
        return Ext.String.format("{0}-{1}", this.id, id);
    },

    getRecord: function(id) {
    	var record;
    	var key= this.getRecordKey(id);
    	var item= this.store.getItem(key)
        if(item!==null){
	        var x= Ext.decode(item);
	        var raw = x.data;
        	var data= {};
            var fields= this.model.getFields().items;
            var length= fields.length;
            var i = 0, field, name, obj, key;
	        for (i = 0; i < length; i++) {
	            field = fields[i];
	            name  = field.getName();
	            if (typeof field.getDecode() == 'function') {
	                data[name] = field.getDecode()(raw[name]);
	            } else {
	                if (field.getType().type == 'date') {
	                    data[name] = new Date(raw[name]);
	                } else {
	                    data[name] = raw[name];
	                }
	            }
	        }
	        record= new this.model(data);
	       	record.data._oid= raw._oid;
	        if(raw._ref!==null && raw._ref!==undefined) { record.data._ref= raw._ref; }
	        if(raw._ts!==null && raw._ts!=undefined) { record.data._ts= raw._ts; }
	        record.eco= Ext.create(Ext.io.ds.ECO,{oid:raw._oid,data:record.data,state:x.state});
			Ext.apply(record,Ext.data.ModelWrapper);
	        //console.log('get',key,item);
        }
        return record;
    },

    setRecord: function(record) {
    	//console.log('set',Ext.encode(record))

        var raw = record.eco.data,
            data    = {},
            fields  = this.model.getFields().items,
            length  = fields.length,
            i = 0,
            field, name, obj, key;

        for (; i < length; i++) {
            field = fields[i];
            name  = field.getName();

            if (typeof field.getEncode() == 'function') {
                data[name] = field.getEncode()(rawData[name], record);
            } else {
                if (field.getType().type == 'date') {
                    data[name] = raw[name].getTime();
                } else {
                    data[name] = raw[name];
                }
            }
            if(data[name]===null || data[name]===undefined){
	            data[name]= field.getDefaultValue()
            }
        }

        data._oid= record.getOid();
        if(raw._ref!==null && raw._ref!==undefined) { data._ref= raw._ref; }
        if(raw._ts!==null && raw._ts!==undefined) { data._ts= raw._ts; }

        //iPad bug requires that we remove the item before setting it
        var eco= record.eco;
        var oid= record.getOid();
        key = this.getRecordKey(oid);
        this.store.removeItem(key);
        var item= Ext.encode({data:data,state:eco.state});
        this.store.setItem(key,item);
        //console.log('set',key,item);
    },
	
});

/** 
 * @private
 *
 */
 
Ext.define('Ext.data.SyncProxy', {
    extend: 'Ext.data.Proxy',

    databaseDefinition: undefined,
    replicaDefinition: undefined,
    csv: undefined,
    generator: undefined,
    userModel: undefined,
    store: undefined,
    idProperty: undefined,
    idDefaultProperty: undefined,
    logger: Ext.util.Logger,
    
    asyncInitialize: function(config,callback,scope) {
        //
        Ext.data.utilities.check('SyncProxy', 'asyncInitialize', 'config', config, ['store','databaseDefinition','replicaDefinition']);
        //
        this.databaseName= config.databaseDefinition.databaseName;
        this.store= config.store;
        this.databaseDefinition= Ext.create(Ext.data.DatabaseDefinition,config.databaseDefinition);
        this.replicaDefinition= Ext.create(Ext.data.ReplicaDefinition,config.replicaDefinition);
        this.loadConfig(config,function(){
            this.logger.info("SyncProxy.asyncInitialize: Opened database '"+this.databaseName+"'")
            callback.call(scope,{r:'ok'});
        },this);
    },

    create: function(operation, callback, scope) {
        new Ext.data.Transaction(this,function(t){
            var records= operation.getRecords();
            records.forEach(function(record) {
                var cs= t.generateChangeStamp();
                var oid= cs.to_s();
                var eco= record.eco= Ext.create('Ext.io.ds.ECO',{
                    oid: oid,
                    data: record.getData(),
                    state: {}
                });
                Ext.apply(record,Ext.data.ModelWrapper);                
                eco.setValueCS(t,'_oid',oid,cs);
                eco.forEachValue(function(path,value) {
                    if (path[0]!=='_oid') {
                        eco.setCS(t,path,t.generateChangeStamp());
                    }
                },eco);
                // if there's no user id, then use the oid.
                var id= record.get(this.idProperty)
                if (id===undefined || id===this.idPropertyDefaultValue) {
                    record.set(this.idProperty,record.getOid());
                }
            },this)
            t.create(records);
            t.indexCreatedRecords(records,this.idProperty);
            t.commit(function(){
                records.forEach(function(record) {
                    record.needsAdd= false;
                    record.phantom= false;
                },this)
                operation.setSuccessful();
                operation.setCompleted();
                this.doCallback(callback,scope,operation);
            },this);
        },this);
    },

    read: function(operation, callback, scope) {
    
        function makeResultSet(records) {
            records= Ext.Array.filter(records,function(record){
                return record!==undefined && Ext.data.SyncModel.isNotDestroyed(record);
            },this);
            operation.setResultSet(Ext.create(Ext.data.ResultSet, {
                records: records,
                total  : records.length,
                loaded : true
            }));
            operation.setSuccessful();
            operation.setCompleted();
            this.doCallback(callback,scope,operation);
        };
        
        if (operation.id!==undefined) {
            this.store.readById(operation.id,function(record) {
                makeResultSet.call(this,[record]);
            },this);
        } else if (operation._oid!==undefined) {
            this.store.readByOid(operation._oid,function(record) {
                makeResultSet.call(this,[record]);
            },this);
        } else {
            this.store.readAll(function(records) {
                makeResultSet.call(this,records);
            },this);
        }
    },

    update: function(operation, callback, scope) {
        if(Ext.data.SyncModel.areDecorated(operation.getRecords())){
            new Ext.data.Transaction(this,function(t){
                var records= operation.getRecords();
                records.forEach(function(record) {
                    record.setUpdateState(t);
                },this);
                t.update(records);
                t.commit(function(){
                    operation.setSuccessful();
                    operation.setCompleted();
                    this.doCallback(callback,scope,operation);
                },this);
            },this);
        }else{
            this.logger.warn('SyncProxy.update: Tried to update a model that had not been read from the store.')
            this.logger.warn(Ext.encode(operation.getRecords()))
            this.doCallback(callback,scope,operation);
        }
    },

    destroy: function(operation, callback, scope) {
        //this.logger.info('SyncProxy.destroy:',operation)
        if(Ext.data.SyncModel.areDecorated(operation.getRecords())){
            new Ext.data.Transaction(this,function(t){
                var records= operation.getRecords();
                records.forEach(function(record) {
                    record.setDestroyState(t);
                },this);
                t.update(records);
                t.indexDestroyedRecords(records,this.idProperty);
                t.commit(function(){
                    operation.setSuccessful();
                    operation.setCompleted();
                    operation.action= 'destroy';
                    this.doCallback(callback,scope,operation);
                },this);
            },this);
        }else{
            this.logger.warn('SyncProxy.destroy: Tried to destroy a model that had not been read from the store.')
            this.logger.warn(Ext.encode(operation.getRecords()))
            this.doCallback(callback,scope,operation);
        }
    },

    clear: function(callback,scope) {
        this.store.clear(function(){
            this.store.removeConfig('databaseDefinition',function(){
                this.store.removeConfig('replicaDefinition',function(){
                    this.store.removeConfig('csv',function(){
                        this.store.removeConfig('generator',callback,scope);
                    },this);
                },this);
            },this);
        },this);
    },

    reset: function(callback,scope) {
        this.store.clear(function(){
            this.store.removeConfig('csv',function(){
                readConfig_CSV({},callback,scope);
            },this);
        },this);
    },

    setModel: function(userModel, setOnStore) {
        //
        // JCM should check that the developer has set up the 'id' sensibly.
        //
        this.userModel= userModel;
        this.idProperty= userModel.getIdProperty();
        // Get the default id value from the User Model
        var fields= userModel.getFields().items;
        var length= fields.length, field, i;
        for (i = 0; i < length; i++) {
            field = fields[i];
            if (field.getName()===this.idProperty) {
                this.idPropertyDefaultValue= field.getDefaultValue();
            }
        }
        // Setup the database definition with the ID Property, and Default ID Value  
        this.databaseDefinition.setIdProperty(this.idProperty);
        this.databaseDefinition.setIdPropertyDefaultValue(this.idPropertyDefaultValue);
        userModel.setIdentifier({type:'cs'}); // JCM we're overwriting theirs...
        // JCM write the definition?
        this.store.setModel(this.userModel);
    },

    replicaNumber: function() {
        return this.generator.r;
    },

    addReplicaNumbers: function(csv,callback,scope) {
        this.csv.addReplicaNumbers(csv);
        this.writeConfig_CSV(callback,scope);
    },

    setReplicaNumber: function(new_replica_number,callback,scope) {
        var old_replica_number= this.replicaNumber();
        this.logger.info('SyncProxy.setReplicaNumber: change from',old_replica_number,'to',new_replica_number)
        this.store.changeReplicaNumber(old_replica_number,new_replica_number,function(){
            this.replicaDefinition.changeReplicaNumber(new_replica_number);
            this.csv.changeReplicaNumber(old_replica_number,new_replica_number);
            this.generator.setReplicaNumber(new_replica_number);
            this.writeConfig_Replica(function(){
                this.writeConfig_Generator(function(){
                    this.writeConfig_CSV(callback,scope);
                },this);
            },this);
        },this);
    },

    getUpdates: function(csv,callback,scope) {
        //
        // The server might know about more replicas than the client.
        // We add those unknown replicas to the client's csv, so that
        // we will take account of them in the following.
        //
        csv.addReplicaNumbers(this.csv);

        //console.log('SyncProxy.getUpdates: remote',csv.to_s());
        //console.log('SyncProxy.getUpdates: local:',this.csv.to_s());


        var r= this.csv.dominant(csv);

                //console.log('SyncProxy.getUpdates: Get updates from',csv.to_s());
                //console.log('SyncProxy.getUpdates: Dominated Replicas:',Ext.Array.pluck(r.dominated,'r').join(', '));
                //console.log('SyncProxy.getUpdates: Dominant Replicas:',Ext.Array.pluck(r.dominant,'r').join(', '));
                //console.log('SyncProxy.getUpdates: Reverse Dominated Replicas:',Ext.Array.pluck(csv.dominant(this.csv).dominated,'r').join(', '));
                //console.log('SyncProxy.getUpdates: Reverse Dominant Replicas:',Ext.Array.pluck(csv.dominant(this.csv).dominant,'r').join(', '));


        if(r.dominant.length==0){
            var updates_csv= Ext.create(Ext.io.ds.CSV);
            var required_csv= Ext.create(Ext.io.ds.CSV);
            var r= csv.dominant(this.csv);
            required_csv.addReplicaNumbers(r.dominant); // we only need to send the difference in the csv's
            callback.call(scope,new Ext.data.Updates(),updates_csv,required_csv);
        }else{
            if(!csv.isEmpty()){
                this.logger.info('SyncProxy.getUpdates: Get updates from',csv.to_s());
                this.logger.info('SyncProxy.getUpdates: Dominated Replicas:',Ext.Array.pluck(r.dominated,'r').join(', '));
            }
            //
            // Get a list of updates that have been seen since the point
            // described by the csv.
            //
            var updates= [];
            this.store.readByCSV(csv, function(records){
                var i, l= records.length;
                for(i=0;i<l;i++){
                    updates= updates.concat(records[i].getUpdates(csv));
                }
                //
                // This sequence of updates will bring the client up to the point
                // described by the csv received plus the csv here. Note that there
                // could be no updates, but that the csv could have still been brought
                // forward, so we might need to send the resultant csv, even though
                // updates is empty. 
                //
                var updates_csv= Ext.create(Ext.io.ds.CSV);
                updates_csv.addX(r.dominant); // we only need to send the difference in the csv's
                //
                // We also compute the csv that will bring the server up to the
                // point described by the csv received. The client uses this to
                // determine the updates to send to the server.
                //
                var required_csv= Ext.create(Ext.io.ds.CSV);
                required_csv.addX(r.dominated); // we only need to send the difference in the csv's
                //
                callback.call(scope,new Ext.data.Updates(updates),updates_csv,required_csv)
            }, this);
        }        
    },

    putUpdates: function(updates,updates_csv,callback,scope) {
        new Ext.data.Transaction(this,function(t){
            if(updates.isEmpty()){
                //
                // Even though updates is empty, the received csv could still be more
                // recent than the local csv, so the local csv still needs to be updated.
                //
                t.updateCSV(updates_csv);
                t.commit(function(){
                    callback.call(scope,{r:'ok'});
                },this);
            }else{
                var computed_csv= Ext.create(Ext.io.ds.CSV);
                var oids= updates.oids();
                var ids= updates.idsChanged(this.idProperty);
                ids.forEach(function(id){
                    t.lookupIDIndex(id,function(oid){
                        oids.push(oid);
                    },this);
                },this);
                t.readByOids(oids,function(){ // prefetch
                    updates.forEach(function(update) {
                        this.applyUpdate(t,update,function(){},this); // read from memory
                        computed_csv.addCS(update.c);
                    },this);
                    this.putUpdates_done(t,updates,updates_csv,computed_csv,callback,scope);
                },this);
            }
        },this);
    },
    
    putUpdates_done: function(t,updates,updates_csv,computed_csv,callback,scope) {
        //
        // This sequence of updates will bring the client up to the point
        // described by the csv received plus the csv here. Note that there
        // could be no updates, but that the csv could have still been brought
        // forward. 
        //
        // We also compute a new csv from all the updates received, just in
        // case the peer didn't send one, or sent a bad one.
        //
        // Make sure to bump forward our clock, just in case one of our peers 
        // has run ahead.
        //
        t.updateCSV(computed_csv);
        t.updateCSV(updates_csv);
        t.commit(function(createdRecords,updatedRecords){
            // discard the created, then deleted
            createdRecords= Ext.Array.filter(createdRecords,Ext.data.SyncModel.isNotDestroyed);
            // move the updated, then deleted
            var x= Ext.Array.partition(updatedRecords,Ext.data.SyncModel.isDestroyed);
            var destroyedRecords= x[0];
            updatedRecords= x[1];
            callback.call(scope,{
                r: 'ok',
                created: createdRecords,
                updated: updatedRecords,
                removed: destroyedRecords
            });
        },this);
    },
    
    applyUpdate: function(t,update,callback,scope,last_ref) { // Attribute Value - Conflict Detection and Resolution
        t.readByOid(update.i,function(record) {
            if (record) {
                var ref= record.ref();
                if (ref && update.p[0]!='_') { // JCM this is a bit sneaky. we're checking that the update is not against a system field.
                    if (update.i===ref) {
                        this.logger.error("SyncProxy.applyUpdate: Infinite loop following reference. ",ref);
                    } else {
                        this.logger.debug('SyncProxy.applyUpdate:',Ext.data.Update.asString(update),'following reference to ',ref)
                        update.i= ref;
                        this.applyUpdate(t,update,callback,scope,ref);
                        // no callback!
                    }
                } else {
                    if (update.p===this.idProperty) {
                        this.applyUpdateToRecordForUniqueID(t,record,update,callback,scope);
                    } else {
                        this.applyUpdateToRecord(t,record,update);
                        callback.call(scope);
                    }
                }
            } else {
                this.logger.debug('SyncProxy.applyUpdate:',Ext.data.Update.asString(update),'accepted, creating new record')
                this.applyUpdateCreatingNewRecord(t,update);
                callback.call(scope);
            }
        },this);
    },

    applyUpdateCreatingNewRecord: function(t,update) {
        var record;
        // no record with that oid is in the local store...
        if (update.p==='_oid') {
            // ...which is ok, because the update is intending to create it
            record= this.createModelFromOid(t,update.v,update.c);
            //console.log('applyUpdate',Ext.encode(record.eco),'( create XXX )');
        } else {
            // ...which is not ok, because given the strict ordering of updates
            // by change stamp the update creating the object must be sent first.
            // But, let's be forgiving and create the record to receive the update. 
            this.logger.warn("Update received for unknown record "+update.i,Ext.data.Update.asString(update));
            record= this.createModelFromOid(t,update.i,update.i);
            record.setValueCS(t,update.p,update.v,update.c);
        }
        t.create([record]);
    },

    createModelFromOid: function(t,oid,cs) {
        this.logger.info('SyncProxy.createModelFromOid:',oid,cs)
        var record= new Model({});
        var eco= record.eco= Ext.create('Ext.io.ds.ECO',{
            oid: oid,
            data: record.data,
            state: {}
        });
        Ext.apply(record,Ext.data.ModelWrapper);                
        record.setValueCS(t,'_oid',oid,cs);
        return record;
    },
    
    applyUpdateToRecordForUniqueID: function(t,record,update,callback,scope) {
        t.lookupIDIndex(update.v,function(existing_record_oid){
            if (existing_record_oid) {
                t.readById(update.v,function(existing_record) {
                    this.do_applyUpdateToRecordForUniqueID(t,record,update);
                    var r_cs= new Ext.io.ds.CS(record.getOid());
                    var er_cs= new Ext.io.ds.CS(existing_record.getOid());
                    var r_before, r_after;
                    var x= er_cs.compare(r_cs);
                    if (x<0) {
                        this.logger.info('SyncProxy.applyUpdateToRecordForUniqueID:',Ext.data.Update.asString(update),'update came after');
                        r_before= existing_record;
                        r_after= record;
                    } else if (x>0){
                        this.logger.info('SyncProxy.applyUpdateToRecordForUniqueID:',Ext.data.Update.asString(update),'update came before',er_cs,r_cs,x);
                        r_before= record;
                        r_after= existing_record;
                    } else {
                        callback.call(scope);
                    }
                    if(x!==0){
                        this.resolveUniqueIDConflict(t,r_before,r_after);
                        t.updateIDIndex(update.v,r_before.getOid());
                        callback.call(scope);
                    }
                },this);
            } else {
                // the new id value did not exist at the time of the update
                this.logger.info('SyncProxy.applyUpdateToRecordForUniqueID:',Ext.data.Update.asString(update),'accepted, no existing record');
                this.do_applyUpdateToRecordForUniqueID(t,record,update);
                callback.call(scope)
            }
        },this);
    },

    do_applyUpdateToRecordForUniqueID: function(t,record,update) {
        var value_before= record.get(update.p);
        var value_after= update.v;
        if(this.applyUpdateToRecord(t,record,update)){
            t.updateIDIndex(value_after,record.getOid());
            if (value_before && value_before!==value_after) {
                t.updateIDIndex(value_before,undefined);
            }
        }
    },

    applyUpdateToRecord: function(t,record,update) {
        if (record.putUpdate(t,update)) {
            t.update([record])
            this.logger.info('SyncProxy.applyUpdateToRecord:',Ext.data.Update.asString(update),'accepted');
            return true;
        } else {
            this.logger.info('SyncProxy.applyUpdateToRecord:',Ext.data.Update.asString(update),'rejected');
            return false;
        }
    },

    resolveUniqueIDConflict: function(t,r1,r2) {
        //
        // merge r2 into r1
        //
        var csv= r1.getCSV();
        var updates= r2.getUpdates(csv);
        var r1_oid= r1.getOid();
        var i, l= updates.length;
        for(i=0;i<l;i++){
            var update= updates[i];
            if (update.p!==this.idProperty && update.p!=='_oid') {
                update.i= r1_oid;
                this.applyUpdateToRecord(t,r1,update);
            }            
        }
        //
        // mark r2 as a tombstone, with a reference to r1
        //
        var r2_oid= r2.getOid();
        update= {
            i: r2_oid,
            p: '_ref',
            v: r1_oid,
            c: t.generateChangeStamp()
        }
        this.applyUpdateToRecord(t,r2,update);
        var cs= t.generateChangeStamp();
        update= {
            i: r2_oid,
            p: '_ts',
            v: cs.to_s(),
            c: cs
        };
        this.applyUpdateToRecord(t,r2,update);
    },

    // read and write configuration

    loadConfig: function(config,callback,scope) {
        this.readConfig_Database(config,function(){
            this.readConfig_Replica(config,function(){
                this.readConfig_CSV(config,function(){
                    this.readConfig_Generator(config,function(){
                        callback.call(scope);
                    },this);
                },this);
            },this);
        },this);
    },

    readConfig_Database: function(config,callback,scope) {
        this.readConfig(Ext.data.DatabaseDefinition,'databaseDefinition',config.databaseDefinition,{},function(r,definition) {
            this.definition= definition;
            callback.call(scope,r,definition);
        },this);
    },

    readConfig_Replica: function(config,callback,scope) {
        this.readConfig(Ext.data.ReplicaDefinition,'replicaDefinition',config.replicaDefinition,{},function(r,replica) {
            this.replica= replica;
            callback.call(scope,r,replica);
        },this);
    },


    readConfig_Generator: function(config,callback,scope) {
        this.readConfig(Ext.io.ds.LogicalClock,'generator',{},{},function(r,generator){
            this.generator= generator;
            if(this.generator.r===undefined){
                this.generator.r= config.replicaDefinition.replicaNumber; 
            }
            if(config.clock){
                this.generator.setClock(config.clock);
            }
            callback.call(scope,r,generator);
        },this); 
    },

    readConfig_CSV: function(config,callback,scope) {
        this.readConfig(Ext.io.ds.CSV,'csv',{},{},function(r,csv){
            this.csv= csv;
            callback.call(scope,r,csv);
        },this); 
    },

    writeConfig_Database: function(callback,scope) {
        this.writeConfig('databaseDefinition',this.databaseDefinition,callback,scope);
    },

    writeConfig_Replica: function(callback,scope) {
        this.writeConfig('replicaDefinition',this.replicaDefinition,callback,scope);
    },
    
    writeConfig_Generator: function(callback,scope) {
        this.writeConfig('generator',this.generator,callback,scope);
    },

    writeConfig_CSV: function(callback,scope) {
        this.writeConfig('csv',this.csv,callback,scope);
    },
                
    writeConfig: function(id, object, callback, scope) {
        if(object){
            this.store.writeConfig(id,object.as_data(),callback,scope);
        }else{
            callback.call(scope);
        }
    },

    readConfig: function(Klass, id, default_data, overwrite_data, callback, scope) {
        this.store.readConfig(id,function(data) {
            var r= (data===undefined) ? 'created' : 'ok';
            if (default_data!==undefined) {
                if (data===undefined) {
                    data= default_data;
                } else {
                    for(var name in default_data) {
                        if (data[name]===undefined) {
                            data[name]= default_data[name];
                        }
                    }
                }
            }
            if (overwrite_data!==undefined) {
                if (data===undefined) {
                    data= overwrite_data;
                } else {
                    for(var name in overwrite_data) {
                        if (data[name]!==overwrite_data[name]) {
                            data[name]= overwrite_data[name];
                        }
                    }
                }
            }

            callback.call(scope,r,new Klass(data));
        },this);
    },

    doCallback: function(callback, scope, operation) {
        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },

});


/** 
 * @private
 *
 * Sync Storage Proxy (combines local and remote storage proxies)
 */

Ext.define('Ext.io.data.Proxy', {
    extend: 'Ext.data.proxy.Client',
    alias: 'proxy.syncstorage',

	proxyInitialized: false,
	proxyLocked: true,
	logger: Ext.util.Logger,
	
	constructor: function(config) {
		Ext.data.utilities.check('Ext.io.data.Proxy', 'constructor', 'config', config, ['id']);
		this.config= config;
		this.config.databaseName= config.id;
		this.proxyLocked= true;
		this.proxyInitialized= false;
		//
		// This could be the first call into Ext.io, so we must initialize it.
		//
		Ext.io.init();
		//
		// Check the Database Directory
		//   The store might be known about, but was cleared.
		//
		var db= Ext.io.storeDirectory.get(this.config.databaseName, "syncstore");
	    console.log("dbdbdbd");
	    console.log(db);
		if(db){
			Ext.io.storeDirectory.add(this.config.databaseName, "syncstore");
		}
		//
		//
		//
		this.callParent([config]);
    },

    create: function(){
    	var a= arguments;
		this.with_proxy(function(localProxy,remoteProxy){
			remoteProxy.create.apply(remoteProxy,a);
		},this);
    },

    read: function(){
    	var a= arguments;
		this.with_proxy(function(localProxy,remoteProxy){
			remoteProxy.read.apply(remoteProxy,a);
		},this);
    },

    update: function(){
    	var a= arguments;
		this.with_proxy(function(localProxy,remoteProxy){
			remoteProxy.update.apply(remoteProxy,a);
		},this);
    },

    destroy: function(){
    	var a= arguments;
		this.with_proxy(function(localProxy,remoteProxy){
			remoteProxy.destroy.apply(remoteProxy,a);
		},this);
    },

    setModel: function(){
    	var a= arguments;
		this.with_proxy(function(localProxy,remoteProxy){
			remoteProxy.setModel.apply(remoteProxy,a);
		},this);
    },

    sync: function(store,callback,scope) {
		//
		// 'store', is the store that's calling this sync function
		// 
		this.logger.info('Ext.io.data.Proxy.sync:',this.config.databaseName,'start');
		if(this.proxyLocked){
			this.logger.warn('Ext.io.data.Proxy.sync: Tried to access proxy, whilst another operation was in progress.');
		} else {
			this.with_proxy(function(localProxy,remoteProxy){
				this.proxyLocked= true;
				try {
					var changes= store.storeSync();
					store.removed= []; // clear the list of records to be deleted
					this.protocol.sync(function(r){
						if(r.r=='ok'){
							this.setDatabaseDefinitionRemote(true); // the server knows about the database now
						}
						var createdRecords= r.created;
						var updatedRecords= r.updated;
						var removedRecords= r.removed;
						if(createdRecords && createdRecords.length>0) {
							store.data.addAll(createdRecords);
			       			store.fireEvent('add', this, createdRecords, 0);
						}
						if(updatedRecords && updatedRecords.length>0) {
							store.data.addAll(updatedRecords);
			        		store.fireEvent('update', this, updatedRecords);
						}
						if(removedRecords && removedRecords.length>0) {
							var l= removedRecords.length;
							for(var i=0;i<l;i++){
								var id= removedRecords[i].getId();
								store.data.removeAt(store.data.findIndexBy(function(i){ // slower, but will match
									return i.getId()===id;
								}));
							}
			        		store.fireEvent('remove', this, removedRecords);
						}
						this.proxyLocked= false;
						store.fireEvent('aftersync');
						this.logger.info('Ext.io.data.Proxy.sync:',this.config.databaseName,'end');
						callback.call(scope,r)
					},this);
				} catch (e) {
					this.proxyLocked= false;
					this.logger.error('Ext.io.data.Proxy.sync: Exception thrown during synchronization');
					this.logger.error(e)
					this.logger.error(e.stack)
					throw e
				}
			},this);
		}
	},
	
	clear: function() {
		if(this.proxyInitialized) {
			this.proxyLocked= true;
			this.setDatabaseDefinitionLocal(false); // we no longer have a local copy of the data
			this.remoteProxy.clear(function(){
				delete this.localProxy;
				delete this.remoteProxy;
				delete this.protocol;
				this.proxyInitialized= false;
				this.proxyLocked= false;
			},this);
		}
	},
	
	// private

	setDatabaseDefinitionLocal: function(flag){
		Ext.io.storeDirectory.update(this.config.databaseName, "syncstore", {local: flag});
	},
	
	setDatabaseDefinitionRemote: function(flag){
		Ext.io.storeDirectory.update(this.config.databaseName, "syncstore", {remote: flag});
	},

	with_proxy: function(callback,scope) {
		if(this.proxyInitialized){
			callback.call(scope,this.localProxy,this.remoteProxy);
		}else{
			//
			// Local Storage Proxy
			//
			var syncStoreName= this.config.localSyncProxy||'Ext.data.SyncStore';
			this.localProxy= Ext.create(syncStoreName);
			this.localProxy.asyncInitialize(this.config,function(r){
				if(r.r==='ok'){
					//
					// Remote Storage Proxy
					//
					this.remoteProxy= Ext.create('Ext.data.SyncProxy');
					var config= {
						databaseDefinition: {
							databaseName: this.config.databaseName,
							generation: 0
						},
						replicaDefinition: {
							deviceId: this.config.deviceId||Ext.naming.IDStore.getId('device'),
							replicaNumber: 0
						},
						store: this.localProxy,
						clock: this.config.clock
					};
					this.remoteProxy.asyncInitialize(config,function(r){
						if(r.r==='ok'){
							this.protocol= new Ext.data.Protocol(this.remoteProxy);
							Ext.data.utilities.delegate(this,this.remoteProxy,['read','update','destroy']);
							//
							this.setDatabaseDefinitionLocal(true); // we have a local copy of the data now
							//
							this.proxyLocked= false; // we're open for business
							this.proxyInitialized= true;
						}else{
							this.logger.error('Ext.io.data.Proxy: Unable to create Ext.data.SyncProxy:',Ext.encode(r));
						}
						callback.call(scope,this.localProxy,this.remoteProxy);
					},this);
				}else{
					this.logger.error('Ext.io.data.Proxy: Unable to create',syncStoreName,':',Ext.encode(r));
					callback.call(scope,this);
				}			
			},this);
		}
    },	

});


/** 
 * @private
 *
 * A directory of stores in local storage.
 */
var extjsVersion = Ext.getVersion("extjs");
if(extjsVersion && extjsVersion.version === "4.1.0") {
    // stores disabled in ExtJS for now (store/proxy/model issues)
    if(typeof(process) !== "undefined" && process.title && process.title === "node") {
        // We don't log the error when running under node as it will cloud the mocha test output
        // Logger level cannot be set to "none", since here we are including SIO itself
        // i.e. require("../../deploy/sencha-io-debug.js");
    } else {
        Ext.util.Logger.error("Disabling SIO data directory since we seem to be running the ExtJS SDK, version", extjsVersion.version);
    }
} else {
    Ext.define("Ext.io.data.Directory.Model", {
        extend: "Ext.data.Model",
        config: {
            fields: [
                { name:'name', type: 'string' },
                { name:'type', type: 'string' },
                { name:'meta', type: 'auto' },
            ],
            proxy: {
                id: 'ext-io-data-directory',
                type: 'localstorage'
            },
        }
    });

    Ext.define('Ext.io.data.Directory', {
        store: undefined,
        
        constructor: function(config) {
            this.store = Ext.create('Ext.data.Store', {
                model: 'Ext.io.data.Directory.Model',
                sorters: [
                    {
                        property : 'name',
                        direction: 'ASC'
                    }               
                ],
                autoLoad: true,
                autoSync: true
            });
        },

        get: function(name) {
            var index = this.store.find("name", name);
            if(index == -1) { // not found
                return null;
            } else {
                return this.store.getAt(index).data;
            }
        },

        getAll: function() {
            var entries = this.store.getRange();
            var all = [];

            for(var i = 0; i < entries.length; i++) {
                all[i] = entries[i].data;   
            }

            return all;
        },

        each: function(callback, scope) {
          this.store.each(function(entry) {
              return callback.call(scope || entry.data, entry.data);
          }, this);  
        },

        add: function(name, type, meta) {
            var entry = Ext.create('Ext.io.data.Directory.Model', {
                name: name,
                type: type,
                meta: meta
            });

            this.store.add(entry);
        },

        update: function(name, type, meta) {
            var index = this.store.find("name", name);
            if(index == -1) { // not found
                this.add(name, type, meta);
            } else {
               var record = this.store.getAt(index);
               record.set("type", type);
               record.set("meta", meta);
               record.save();
            }
        },

        remove: function(name) {
            var index = this.store.find("name", name);
            if(index != -1) {
                this.store.removeAt(index);
            }

            return index;
        }
    });

}


Ext.Array.partition= function(a,fn,scope) {
		var r1= [], r2= [];
		if (a) {
			var j, l= a.length;
			for(var i= 0;i<l;i++) {
				j= a[i];
				if (j!==undefined) {
					if (fn.call(scope||j,j)) {
						r1.push(j);
					} else {
						r2.push(j);
					}
				}
			}
		}
		return [r1,r2];
	};




Ext.data.utilities= {

	delegate: function(from_instance, to_instance, methods) {
		if (to_instance===undefined) { 
			var message= "Error - Tried to delegate '"+methods+"' to undefined instance.";
			Ext.util.Logger.error(message);
			throw message;
		}
		methods.forEach(function(method){
			var to_method= to_instance[method];
			if (to_method===undefined) { 
				message= "Error - Tried to delegate undefined method '"+method+"' to "+to_instance;
				Ext.util.Logger.error(message);
				throw message;
			}
			from_instance[method]= function() {
				return to_method.apply(to_instance, arguments);
			}
		})
	},
	
	copy: function(from_instance,to_instance,properties) {
		var changed= false;
		properties.forEach(function(property){
			var from_v= from_instance[property]
			var to_v= to_instance[property]
			if (from_v!==undefined && from_v!==to_v) {
				to_instance[property]= from_v;
				changed= true;
			}
		});
		return changed;
	},

	check: function(class_name, method_name, instance_name, instance, properties) {
		if (instance===undefined) {
			var message= "Error - "+class_name+"."+method_name+" - "+instance_name+" not provided.";
			Ext.util.Logger.error(message);
			throw message;
		} else {
			properties.forEach(function(property) {
				var value= instance[property];
				if (value===undefined) {
					var message= "Error - "+class_name+"."+method_name+" - "+instance_name+"."+property+" not provided.";
					Ext.util.Logger.error(message);
					throw message;
				}
			});
		}
	},
		
};


/** 
 * @private
 *
 * Distributed Systems Things
 */
Ext.ns('Ext.io.ds');
/**
 * @private
 *
 * Real Clock
 */
Ext.define('Ext.io.ds.RealClock', {
	
	constructor: function() {
		this.epoch= new Date(2011,0,1);
	},
	
	now: function() {
		return this.ms_to_s(new Date().getTime()-this.epoch);	
	},
	
	/**
	 * @private
	 */
	ms_to_s: function(ms) {
		return Math.floor(ms/1000);
	},
 
});
/** 
 * @private
 *
 * Change Stamp
 *
 * It represents a point in 'time' for a single replica.
 * It's used like a timestamp, but has more components than time.
 */
Ext.define('Ext.io.ds.CS', {

	r: 0, // replica_number
	t: 0, // time, in seconds since the epoch, as defined by the CS Generator 
	s: 0, // sequence number

	constructor: function(config) {
		this.set(config);
	},
	
	set: function(x) {
		if (typeof x === 'string' || x instanceof String) {
			this.from_s(x)
		} else if (typeof x === 'object') {
			this.r= x.r||0;
			this.t= x.t||0;
			this.s= x.s||0;
		}
	},

	changeReplicaNumber: function(old_replica_number,new_replica_number) {
		if (this.r==old_replica_number) {
			this.r= new_replica_number;
			return true;
		}
		return false;
	},

 	greaterThan: function(x) {
	 	return this.compare(x)>0;
	},
 	
 	lessThan: function(x) { 
	 	return this.compare(x)<0; 
	},

	equals: function(x) { 
		return this.compare(x)===0
	},

	compare: function(x) {
		var r= this.t-x.t
		if (r==0) {
			r= this.s-x.s;
			if (r==0) {
				r= this.r-x.r
			}
		}
		return r;
	},
	
	cs_regex: /(\d+)-(\d+)-?(\d+)?/,
	
	from_s: function(t) {
    	var m= t.match(this.cs_regex);
		if (m && m.length>0) {
		    this.r= parseInt(m[1])
		    this.t= parseInt(m[2])
		    this.s= m[3] ? parseInt(m[3]) : 0
		} else {
			throw "Error - CS - Bad change stamp '"+t+"'."
		}
		return this;
	},
	
	to_s: function() {
		return this.r+"-"+this.t+(this.s>0 ? "-"+this.s : "");		
	}

});

/**
 * @private
 *
 * Logical Clock
 *
 * Generates Change Stamps.
 * It is Monotonic.
 * It never goes backwards.
 *
 */
Ext.define('Ext.io.ds.LogicalClock', {

	r: undefined, // replica_number
	t: undefined, // time, in seconds since epoch
	s: undefined, // sequence number
	
	clock: undefined, // a real clock, it provides the time
	local_offset: undefined,
	global_offset: undefined,
	
	constructor: function(config) {
		this.set(config);
	},
	
	set: function(data) {
		if(data){
			this.clock= data.clock || new Ext.io.ds.RealClock();
			this.r= data.r;
			this.t= data.t || this.clock.now();
			this.s= data.s || -1; // so that the next tick gets us to 0
			this.local_offset= data.local_offset || 0;
			this.global_offset= data.global_offset || 0;
		}
	},

	setClock: function(clock) {
		this.clock= clock;
		this.t= this.clock.now();
		this.s= -1; // so that the next tick gets us to 0
	},
	
	// JCM tick
 	generateChangeStamp: function() { // the next change stamp
    	var current_time= this.clock.now();
    	this.update_local_offset(current_time);
    	this.s+= 1;
    	if (this.s>255) { // JCM This is totally arbitrary, and it's hard coded too....
    		this.t= current_time;
    		this.local_offset+= 1;
    		this.s= 0;
    	}
		return new Ext.io.ds.CS({r:this.r,t:this.global_time(),s:this.s});
	},

 	seenCSV: function(csv) { // a change stamp vector we just received
		return this.seenChangeStamp(csv.maxChangeStamp());
	},

	seenChangeStamp: function(cs) { // a change stamp we just received
		var changed= false;
		if(cs){
	    	var current_time= this.clock.now();
			if (current_time>this.t) {
		    	changed= this.update_local_offset(current_time);
			}
			changed= changed||this.update_global_offset(cs);
		}
		return changed;
  	},
  
 	setReplicaNumber: function(replica_number) {
		var changed= this.r!==replica_number;
		this.r= replica_number;
		return changed;
	},

	/**
	 * @private
	 */
	update_local_offset: function(current_time) {
		var changed= false;
    	var delta= current_time-this.t;
    	if (delta>0) { // local clock moved forwards
    		var local_time= this.global_time();
    		this.t= current_time;
    		if (delta>this.local_offset) {
        		this.local_offset= 0;
      		} else {
        		this.local_offset-= delta;
    		}
    		var local_time_after= this.global_time();
			if (local_time_after>local_time) {
      			this.s= -1;
			}
			changed= true;
    	} else if (delta<0) { // local clock moved backwards
    		// JCM if delta is too big, then complain
    		this.t= current_time;
    		this.local_offset+= -delta;
			changed= true;
    	}
		return changed;
	},

	/**
	 * @private
	 */
	update_global_offset: function(remote_cs) {
		var changed= false;
		var local_cs= new Ext.io.ds.CS({r:this.r,t:this.global_time(),s:this.s+1})
		var local_t= local_cs.t;
    	var local_s= local_cs.s;
    	var remote_t= remote_cs.t;
    	var remote_s= remote_cs.s;
    	if (remote_t==local_t && remote_s>=local_s) {
			this.s= remote_s;
			changed= true;
    	} else if (remote_t>local_t) {
      		var delta= remote_t-local_t;
  			if (delta>0) { // remote clock moved forwards
  		  		// JCM guard against moving too far forward
      			this.global_offset+= delta;
    			this.s= remote_s;
				changed= true;
      		}
  		}
		return changed; 
  	},

	/**
	 * @private
	 */
  	global_time: function() {
    	return this.t+this.local_offset+this.global_offset;
	},
	
	as_data: function() {
		return {
			r: this.r,
			t: this.t,
			s: this.s,
			local_offset: this.local_offset,
			global_offset: this.global_offset,
		};
	},
	
});

/**
 * @private
 *
 * Change Stamp Vector
 *
 * Represents a global point in 'time'.
 */
Ext.define('Ext.io.ds.CSV', {

	v: undefined, // change stamps, replica number => change stamp

	constructor: function(config) {
		this.v= {};
		if (config===undefined){
		}else if (config instanceof Ext.io.ds.CSV) {
			this.addX(config);
		}else{
			this.addX(config.v);
		}
	},
	
	get: function(x) {
		if (x instanceof Ext.io.ds.CS) {
			return this.v[x.r];
		}else{
			return this.v[x];
		}
	},
	
	setReplicaNumber: function(replica_number) {
		this.addReplicaNumbers([replica_number]);
	},
	
	addReplicaNumbers: function(x) {
		var t= [];
		if (x instanceof Array) {
			if(x[0] instanceof Ext.io.ds.CS){
				t= Ext.Array.map(x,function(r){return this.addX(new Ext.io.ds.CS({r:x.r}))},this);
			}else{
				t= Ext.Array.map(x,function(r){return this.addX(new Ext.io.ds.CS({r:r}))},this);
			}
		} else if (x instanceof Ext.io.ds.CSV) {
			t= x.collect(function(cs){return this.addX(new Ext.io.ds.CS({r:cs.r}))},this);
		}
		return Ext.Array.contains(t,true);
	},

	addX: function(x) { // CSV, CS, '1-2-3', [x]
		var changed= false;
		if (x===undefined){
		} else if (x instanceof Ext.io.ds.CSV) {
			changed= this.addCSV(x);
		} else if (x instanceof Array) {
			var t= Ext.Array.map(x,this.addX,this)
			changed= Ext.Array.contains(t,true);
		} else if (x instanceof Ext.io.ds.CS) {
			changed= this.addCS(x);
		} else if (typeof x == 'string' || x instanceof String) {
			changed= this.addX(new Ext.io.ds.CS(x));
		}
		return changed;
	},

	addCS: function(x) {
		var changed= false;
		if (x!==undefined){
			var r= x.r;
			var t= this.v[r];
			if (!t || x.greaterThan(t)) {
			    this.v[r]= new Ext.io.ds.CS({r:x.r,t:x.t,s:x.s})
				changed= true;
			}
		}
		return changed;
	},

	addCSV: function(x) {
		var changed= false;
		if (x!==undefined){
			var t= x.collect(this.addCS,this);
			changed= Ext.Array.contains(t,true);
		}
		return changed;
	},

	changeReplicaNumber: function(old_replica_number,new_replica_number) {
		var t= this.v[old_replica_number];
		var changed= false;
		if (t) {
			t.r= new_replica_number;
			delete this.v[old_replica_number];
			this.v[new_replica_number]= t;
			changed= true;
		}
		return changed;
	},

	isEmpty: function() {
		for(var i in this.v) {
			return false;
		}
		return true;
	},
		
	maxChangeStamp: function() {
		if (!this.isEmpty()) {
			var r= new Ext.io.ds.CS();
			for (var i in this.v) {
				r = (this.v[i].greaterThan(r) ? this.v[i] : r);
			}
			return r;
		}
	},

	minChangeStamp: function() {
		if (!this.isEmpty()) {
			var r;
			for (var i in this.v) {
				r = (!r || this.v[i].lessThan(r) ? this.v[i] : r);
			}
			return r;
		}
	},
	
	intersect: function(x) {
		for (var i in x.v) {
			if (this.v[i]!==undefined) {
				this.v[i]=x.v[i];
			}
		}
	},

	dominates: function(x) { // true if this csv dominates x
		return Ext.Array.some(this.compare(x),function(i){ return i>0 });
	},
	
	dominated: function(x) { // returns a list of the dominated cs in x
		var r = [];
		for (var i in this.v) {
			if(this.v[i]!==undefined && this.compare(this.v[i])>0) {
				r.push(this.v[i]);
			}
		}
		return r;
	},

	dominant: function(x) { // this dominates over that
		var dominated= [];
		var dominant= []; 
		for (var i in this.v) {
			var v= this.v[i];
			if (v!==undefined){
				var r= x.compare(v);
				if(r<0) {
					dominant.push(v);
				}else if(r>0){
					dominated.push(v);
				}
			}
		}
		return {dominant:dominant,dominated:dominated};
	},
	
	equals: function(x) {
		return Ext.Array.every(this.compare(x),function(i){ return i===0 });
	},
	
	compare: function(x) {
		if (x instanceof Ext.io.ds.CS) {
			var cs= this.get(x);
			var cs2= x;
			return [cs ? cs.compare(cs2) : -1];
		} else if (x instanceof Ext.io.ds.CSV) {		
			var r= [];
			for(i in this.v) {
				var cs= this.v[i];
				if (cs instanceof Ext.io.ds.CS) {
					var cs2= x.get(cs);
					r.push(cs2 ? cs.compare(cs2) : 1);
				}
			}
			return r;
		} else {
			throw "Error - CSV - compare - Unknown type: "+(typeof x)+": "+x
		}
		return [-1];
	},
	
	encode: function() { // for the wire
		return this.collect(function(cs){
			// JCM can we safely ignore replicas with CS of 0... except for the highest known replica number...
			return cs.to_s();
		}).join('.');
	},
	
	decode: function(x) { // from the wire
		if(x){
			this.addX(x.split('.'));
		}
		return this;
	},
	
	to_s: function(indent) {
		return "CSV: "+this.collect(function(cs){return cs.to_s();}).join(', ');
	},

	as_data: function() { // for the disk
		return {
			v: this.collect(function(cs){return cs.to_s();}),
			id: 'csv'
		};
	},

	// private

	collect: function(fn,scope) {
		var r= [];
		for(var i in this.v){
			if(this.v.hasOwnProperty(i)){
				r.push(fn.call(scope||this,this.v[i]));
			}
		}
		return r;
	},
		
});
/**
 * @private
 *
 * Change Stamp Index
 *
 * Index of a set of Object Identifiers for a single replica, by time, t.
 */
Ext.define('Ext.io.ds.CSI', {
	
	map: {}, // t => set of oids
	v: [],   // t, in order
	dirty: false, // if v needs rebuild
	
	constructor: function() {
		this.clear();
	},
	
	clear: function() {
		this.map= {};
		this.v= [];
		this.dirty= false;
	},
	
	add: function(t,oid) {
		var l= this.map[t];
		if(l){
			l[oid]= true;
		}else{
			var l= {};
			l[oid]= true;
			this.map[t]= l;
			this.dirty= true;
		}
	},

	remove: function(t,oid) {
		var l= this.map[t];
		if(l){
			delete l[oid];
			this.dirty= true;
		}
	},

	oidsFrom: function(t) {
		var r= [];
		var keys= this.keysFrom(t);
		var l= keys.length;
		for(var i=0;i<l;i++){
			r= r.concat(this.oToA(this.map[keys[i]]));
		}
		return r;
	},
	
	keysFrom: function(t) {
		var r= [];
		var keys= this.keys();
		var l= keys.length;
		for(var i=0;i<l;i++){ // JCM should be a binary search, or reverse iteration
			var j= keys[i];
			if(j>=t){ // '=' because we only index by t, there could be updates with the same t and greater s
				r.push(j);
			}
		}
		return r;
	},

	//searchArray = function(needle, haystack, case_insensitive) {
	//	if (typeof(haystack) === 'undefined' || !haystack.length) return -1;
 	//
	//	var high = haystack.length - 1;
	//	var low = 0;
	//	case_insensitive = (typeof(case_insensitive) === 'undefined' || case_insensitive) ? true:false;
	//	needle = (case_insensitive) ? needle.toLowerCase():needle;
  	//
	//	while (low <= high) {
	//		mid = parseInt((low + high) / 2)
	//		element = (case_insensitive) ? haystack[mid].toLowerCase():haystack[mid];
	//		if (element > needle) {
	//			high = mid - 1;
	//		} else if (element < needle) {
	//			low = mid + 1;
	//		} else {
	//			return mid;
	//		}
	//	}
  	//
	//	return -1;
	//};
	
	encode: function() {
		var r= {};
		for(var i in this.map){
			if (this.map.hasOwnProperty(i) && !this.isEmpty(this.map[i])) {
				r[i]= this.oToA(this.map[i]);
			}
		}
		return r;
	},
	
	decode: function(v) {
		this.clear();
		for(var i in v){
			if (v.hasOwnProperty(i)) {
				var oids= v[i];
				for(var j=0;j<oids.length;j++){
					this.add(i,oids[j])
				}
			}
		}
		return this;
	},
	
	keys: function() {
		if(this.dirty){
			this.v= [];
			for(var i in this.map){
				if (this.map.hasOwnProperty(i) && !this.isEmpty(this.map[i])) {
					this.v.push(i);
				}
			}
			this.dirty= false; 
		}
		return this.v;
	},
	
	isEmpty: function(o) {
		for(var i in o) {
			return false;
		}
		return true;
	},

	/**
	 * @private
	 */	
	oToA: function(o){
		var r= [];
		if(o){
			for(var i in o){
				if (o.hasOwnProperty(i)) {
					r.push(i);
				}
			}
		}
		return r;
	},
	
	to_s: function(){
		var r= "";
		for(var i in this.map){
			if (this.map.hasOwnProperty(i) && !this.isEmpty(this.map[i])) {
				r= r+i+':'+this.oToA(this.map[i]);
			}
			r= r+", ";
		}
		return r;
	},
	
	
});

/**
 * @private
 *
 * Change Stamp Index Vector
 * 
 * In index for a set of Object Identifiers for all replicas, by Change Stamp.
 */
Ext.define('Ext.io.ds.CSIV', {

	v: {}, // r => Change Stamp Index
	
	constructor: function() {
		this.v= {};
	},
	
	oidsFrom: function(csv) {
		var r= csv.collect(function(cs){
			var csi= this.v[cs.r]
			if(csi){
				return csi.oidsFrom(cs.t);
			}
		},this);
		r= Ext.Array.flatten(r);
		r= Ext.Array.unique(r);
		r= Ext.Array.clean(r);
		return r;
	},
	
	add: function(cs,oid) {
		var csi= this.v[cs.r];
		if(csi===undefined){
			csi= this.v[cs.r]= new Ext.io.ds.CSI();
		}
		csi.add(cs.t,oid);
	},

	addArray: function(a,oid) {
		var l= a.length;
		for(var i=0;i<l;i++){
			var cs= a[i];
			if(cs){
				this.add(a[i],oid);
			}
		}
	},

	remove: function(cs,oid) {
		var csi= this.v[cs.r];
		if(csi){
			csi.remove(cs.t,oid);
		}
	},	

	removeArray: function(a,oid) {
		var l= a.length;
		for(var i=0;i<l;i++){
			var cs= a[i];
			if(cs){
				this.remove(a[i],oid);
			}
		}
	},

	encode: function() {
		var r= {};
		for(var i in this.v){
			if (this.v.hasOwnProperty(i)) {
				r[i]= this.v[i].encode();
			}
		}
		return {r:r};
	},
		
	decode: function(v) {
		this.v= {};
		if(v){
			for(var i in v.r){
				if (v.r.hasOwnProperty(i)) {
					this.v[i]= new Ext.io.ds.CSI().decode(v.r[i]);
				}
			}		
		}
		return this;
	},
	
	to_s: function() {
		var r= "";
		for(var i in this.v){
			if (this.v.hasOwnProperty(i)) {
				r= r+i+"=>["+this.v[i].to_s()+"], ";
			}
		}
		return r;
	},
			
});

/**
 * 
 * @private
 *
 * Eventually Consistent Object
 *
 * It's an object of name-value-changestamp tuples,
 * A value can be of a simple or complex type.
 * Complex types are either an Object or an Array
 */
Ext.define('Ext.io.ds.ECO', {

	constructor: function(config) {
		config= config||{};
        this.oid= config.oid;
		this.data= config.data||{};
		this.state= config.state||{};
	},

	setOid: function(oid) {
		this.oid= oid;	
	},

	getOid: function() {
		return this.oid;
	},

	getState: function() {
		return this.state;
	},

	/**
	 * Get the value for the path
	 */
	get: function(path) {
		return this.getValue(path);
	},

	/**
	 * Set the value for a path, with a new change stamp.
	 */
	set: function(path,value,t) {
		var updates= this.valueToUpdates(path,value);
		var l= updates.length;
		for(var i=0;i<l;i++) {
			var update= updates[i];
			this.setValueCS(t,update.n,update.v,t.generateChangeStamp());
		}
	},

	/**
	 * Apply an update to this Object.
	 */
	applyUpdate: function(t,update) {
		return this.setValueCS(t,update.p,update.v,update.c);
	},

	/**
	 * Get all the updates that have occured since CSV. 
	 */
	getUpdates: function(csv) {
		var updates= []; // JCM should be Ext.x.Updates?
		this.forEachValueCS(function(path,values,cs){
			if (cs) {
				var cs2= csv.get(cs);
				if (!cs2 || cs2.lessThan(cs)) {
					updates.push({
						i: this.getOid(),
						p: path.length==1 ? path[0] : path, 
						v: values.length==1 ? values[0] : values, 
						c: cs
					});
				}
			}
		},this);
		return updates;
	},

	/**
	 * Get a CSV for this Object.
	 */
	getCSV: function() {
		var csv= new Ext.io.ds.CSV();
		this.forEachCS(function(cs) {
			csv.addCS(cs);
		},this);
		return csv;
	},

	/**
	 * Get a list of all the Change Stamps in this Object.
	 */
	getAllCS: function() {
		var r= [];
		this.forEachCS(function(cs) {
			r.push(new Ext.io.ds.CS(cs));
		},this);
		return r;
	},

	/**
	 * Change a replica number.
	 */
	changeReplicaNumber: function(old_replica_number,new_replica_number) {
		var changed= false;
		this.forEachCS(function(cs) {
			var t= cs.changeReplicaNumber(old_replica_number,new_replica_number)
			changed= changed || t;
			return cs;
		},this);
		if (this.oid) {
			var id_cs= Ext.create(Ext.io.ds.CS,this.oid);
			if (id_cs.changeReplicaNumber(old_replica_number,new_replica_number)) {
				this.oid= id_cs.to_s();
				changed= true;
			}
		}
		return changed;
	},

	/**
	 * For each Value and Change Stamp of this Object.
	 */
	forEachValueCS: function(callback,scope,data,state,path,values) {
		data= data||this.data;
		state= state||this.state;
		path= path||[];
		values= values||[];
		//console.log('forEachPair',Ext.encode(data),Ext.encode(state),Ext.encode(path),Ext.encode(values));
		for(var name in state) {
			if (state.hasOwnProperty(name)) {
				var new_state= state[name];
				var new_data= data[name];
				var new_path= path.concat(name);
				var new_data_type= this.valueType(new_data);
				var new_value;
				switch (new_data_type) {
					case 'object':
						switch(new_data){
							case undefined:
								new_value= undefined;
								break;
							case null:
								new_value= null;
								break;
							default:
								new_value= {};
								break;
							}
						break;
					case 'array':
						new_value= [[]];
						break;
					default:
						new_value= new_data;
				}
				var new_values= values.concat(new_value);
				switch (this.valueType(new_state)) {
					case 'string':
						callback.call(scope,new_path,new_values,new Ext.io.ds.CS(new_state));
						break;
					case 'array':
						switch (new_data_type) {
							case 'undefined':
								Ext.util.Logger.wraning('ECO.forEachValueCS: There was no data for the state at path',new_path);
								Ext.util.Logger.wraning('ECO.forEachValueCS: ',Ext.encode(this.data));
								break;
							case 'object':
							case 'array':
								callback.call(scope,new_path,new_values,new Ext.io.ds.CS(new_state[0])); // [cs,state]
								this.forEachValueCS(callback,scope,new_data,new_state[1],new_path,new_values); // [cs,state]
								break;
							default:
								callback.call(scope,new_path,new_values,new Ext.io.ds.CS(new_state[0])); // [cs,state]
								break;
						}
					break;
				}
			}
		}
	},	
	
	/**
	 * @private
	 *
	 * For each Value of this Object.
	 */
	forEachValue: function(callback,scope,data,path) {
		data= data || this.data;
		path= path || [];
		var n, v;
		for(n in data) {
			if (data.hasOwnProperty(n)) {
				v= data[n];
				if (v!==this.state) {
					var path2= path.concat(n);
					callback.call(scope,path2,v);
					if (this.isComplexValueType(v)) {
						this.forEachValue(callback,scope,v,path2);
					}
				}
			}
		}
	},


	/**
	 * @private
	 *
	 * For each Change Stamp of this Object
	 */
	forEachCS: function(callback,scope,state) {
		state= state || this.state;
		for(name in state) {
			if (state.hasOwnProperty(name)) {
				var next_state= state[name];
				switch (this.valueType(next_state)) {
					case 'string':
						var cs= callback.call(scope,Ext.create('Ext.io.ds.CS',next_state));
						if (cs) { state[name]= cs.to_s(); }
						break;
					case 'array':
						var cs= callback.call(scope,Ext.create('Ext.io.ds.CS',next_state[0]));
						if (cs) { state[name][0]= cs.to_s(); } // [cs,state]
						this.forEachCS(callback,scope,next_state[1]); // [cs,state]
						break;
				}
			}
		}
	},


	/**
	 * @private
	 * 
	 * Return Value and Change Stamp for the path, {v:value, c:cs}
	 */
	getValueCS: function(path) {
		var data= this.data;
		var state= this.state;
		if (Ext.isArray(path)) {
			var l= path.length;
			var e= l-1;
			for(var i=0;i<l;i++) {
				var name= path[i];
				if (i===e) {
					return {
						v: data ? data[name] : data,
						c: this.extractCS(state,name)
					};
				} else {
					state= this.extractState(state,name);
					data= data ? data[name] : data;
				}
			}
		} else {
			return {
				v: data[path],
				c: this.extractCS(state,path)
			};
		}
	},

	/**
	 * @private
	 */
	getValue: function(path) {
		var data= this.data;
		if (Ext.isArray(path)) {
			var l= path.length;
			var e= l-1;
			for(var i=0;i<l;i++) {
				var name= path[i];
				if (i===e) {
					return data[name];
				} else {
					data= data[name];
				}
			}
		} else {
			return this.data[path];
		}
	},

	/**
	 * @private
	 */
	setValueCS: function(t,path,values,new_cs) {
		var self= this;

		//console.log('setValue',Ext.encode(path),Ext.encode(values),Ext.encode(new_cs));
		//console.log('setValue',Ext.encode(this.data));
	
		var assignValueCS= function(t,data,state,name,value,to_cs) {
			var changed= false;
			if (value!==undefined) {
				data[name]= value;
				changed= true;
			}
			if (to_cs!==undefined) {
				var from_cs= self.extractCS(state,name);
				self.assignCS(state,name,to_cs);
				t.updateCS(from_cs,to_cs,self.getOid());
				changed= true;
			}
			return changed;
		};

		var changed= false;
		if (!Ext.isArray(path)) {
			path= [path];
			values= [values];
		}
		var data= this.data;
		var state= this.state;
		var l= path.length;
		var e= l-1;
		for(var i=0;i<l;i++) {
			var name= path[i];
			var new_value= values[i]; 
			var old_cs= this.extractCS(state,name);
			var old_value= data[name];
			var old_value_type= this.valueType(old_value);
			var new_value_type= this.valueType(new_value);
			var sameComplexType= 
				((old_value_type==='object' && new_value_type==='object') ||
				(old_value_type==='array' && new_value_type==='array'));
			if (old_cs) {
				if (new_cs.greaterThan(old_cs)) {
					if (sameComplexType) {
						new_value= undefined; // re-assert, don't overwrite
					}
					// new_cs is gt old_cs, so accept update
					if (assignValueCS(t,data,state,name,new_value,new_cs)) {
						changed= true;
					}
				} else {
					// new_cs is not gt old_cs
					if (sameComplexType) {
						// but this value type along the path is the same, so keep going... 
					} else {
						// and this type along the path is not the same, so reject the update.
						return changed;
					}
				}
			} else {
				// no old_cs, so accept update
				if (assignValueCS(t,data,state,name,new_value,new_cs)) {
					changed= true;
				}
				//console.log('X',new_cs,'no old',data,state)
			}
			if (i!==e) {
				data= data[name];
				state= this.extractState(state,name,new_cs);
			}
		}
		//console.log('setValue => ',Ext.encode(this.data));
		return changed;
	},

	/**
	 * @private
	 *
	 * Get the Change Stamp for the path
	 */
	getCS: function(path) {
		var state= this.state;
		if (Ext.isArray(path)) {
			var l= path.length;
			var e= l-1;
			for(var i=0;i<l;i++) {
				var name= path[i];
				if (i===e) {
					return this.extractCS(state,name);
				} else {
					state= this.extractState(state,name);
				}
			}
		} else {
			return this.extractCS(state,path);
		}
	},
	
	/**
	 * @private
	 *
	 * Set the Change Stamp for the Path.
	 */
	setCS: function(t,path,cs) {
		var self= this;

		var setNameCS= function(t,state,name,to_cs) {
			var from_cs= self.extractCS(state,name);
			self.assignCS(state,name,to_cs);
			t.updateCS(from_cs,to_cs,self.getOid());
		};

		var state= this.state;
		if (Ext.isArray(path)) {
			var l= path.length;
			var e= l-1;
			for(var i=0;i<l;i++) {
				var name= path[i];
				if (i===e) {
					setNameCS(t,state,name,cs);
				} else {
					state= this.extractState(state,name);
				}
			}
		} else {
			setNameCS(t,state,path,cs);
		}
	},

	/**
	 * @private
	 *
	 * Extract the next state for this name from the state
	 */	
	extractState: function(state,name,cs) {
		var next_state= state[name];
		switch (this.valueType(next_state)) {
			case 'undefined':
				var new_state= {};
				state[name]= [cs,new_state];
				state= new_state;
				break;
			case 'string':
				var new_state= {};
				state[name]= [next_state,new_state];
				state= new_state;
				break;
			case 'array':
				state= next_state[1];
				break;
		}
		return state;
	},

	/**
	 * @private
	 * 
	 * Extract the Change Stamp from the state for this name
	 */
	extractCS: function(state,name) {
		var cs= undefined;
		var state= state[name];
		if (state) {
			switch (this.valueType(state)) {
				case 'string':
					cs= new Ext.io.ds.CS(state);
					break;
				case 'array':
					cs= new Ext.io.ds.CS(state[0]); // [cs,state]
					break;
			}
		} // else undefined
		return cs;
	},

	/**
	 * @private
	 *
	 * Assign the Change Stamp for this name
	 */
	assignCS: function(state,name,cs) {
		var cs_s= (cs instanceof Ext.io.ds.CS) ? cs.to_s() : cs;
		var state2= state[name];
		if (state2) {
			switch (this.valueType(state2)) {
				case 'string':
					state[name]= cs_s;
					break;
				case 'array':
					state2[0]= cs_s; // [cs,state]
					break;
			}
		} else {
			state[name]= cs_s;
		}
	},

	/**
	 * @private
	 *
	 * Returns undefined, number, boolean, string, object, array.
	 */
	valueType: function(value) { // 
		var t= typeof value;
		if (t==='object' && (value instanceof Array)) {
			t= 'array';
		}
		return t;
	},
	
	/**
	 * @private
	 *
	 * Returns true for an object or an array.
	 */
	isComplexValueType: function(value) {
		return (typeof value==='object');
	},

	/** 
	 * @private
	 *
	 * Create a list of updates from a value, either simple or complex.
	 *
	 */ 
	valueToUpdates: function(name,value) {
		if(this.isComplexValueType(value)) {
			var parent_value;
			switch(this.valueType(value)) {
				case 'object':
					parent_value= {}
					break;
				case 'array':
					parent_value= [];
					break;
			}
			var parent_update= {n: [name], v: [parent_value]};
			var updates= [parent_update];
			for(key in value) {
				if (value.hasOwnProperty(key)) {
					var children= this.valueToUpdates(key,value[key]);
					var l= children.length;
					for(var i=0;i<l;i++){
						update= children[i];
						updates= updates.concat({n:parent_update.n.concat(update.n),v:parent_update.v.concat(update.v)});
					}
				}
			}
			return updates;
		} else {
			return [{n: name, v: value}];
		}
	},
		
});


/**
 * 
 * @private
 *
 * Database Definition
 *
 */

Ext.define('Ext.data.DatabaseDefinition', {
    extend: 'Object',

	config: {
		databaseName: undefined,
		generation: undefined, // of the database
		idProperty: undefined,
		idPropertyDefaultValue: undefined,
		version: 2, // of the storage scheme
		// JCM include the epoch of the clock here?
	},	
	
	constructor: function(config,callback,scope) {
    	Ext.data.utilities.check('DatabaseDefinition', 'constructor', 'config', config, ['databaseName','generation']);
    	this.initConfig(config);
	},

	//set: function(config) {
	//	return Ext.data.utilities.copy(config,this,[
	//		'database_name',
	//		'generation',
	//		'system_name',
	//		'replica_number',
	//		'idProperty',
	//		'idPropertyDefaultValue',
	//		'version',
	//		'_id']);
	//},
    //
	//as_data: function() { // to store on the disk
	//	var data= this.encode();
	//	data.version= this.version;
	//	data[Ext.data.SyncModel.MODEL]= 'Ext.data.DatabaseDefinition';
	//	return data;
	//},
    //
	//encode: function() { // to send over the wire
	//	return {
	//		database_name: this.database_name,
	//		generation: this.generation,
	//		system_name: this.system_name,
	//		replica_number: this.replica_number,
	//		idProperty: this.idProperty,
	//		idPropertyDefaultValue: this.idPropertyDefaultValue,
	//	};
	//},

	// JCM perhaps an explicit decode would be better than the constructor?

});

/**
 * 
 * @private
 *
 * Replica Definition
 *
 */

Ext.define('Ext.data.ReplicaDefinition', { 
    extend: 'Object',

    config: {
		deviceId: undefined,
		replicaNumber: undefined,
    },
	
	constructor: function(config) {
    	Ext.data.utilities.check('ReplicaDefinition', 'constructor', 'config', config, ['deviceId','replicaNumber']);
    	this.initConfig(config);
	},

	changeReplicaNumber: function(replicaNumber) {
		var changed= (this.getReplicaNumber()!=replicaNumber); 
		this.setReplicaNumber(replicaNumber);
		return changed;
	},
		
	as_data: function() {
		return {
			deviceId: this.getDeviceId(),
			replicaNumber: this.getReplicaNumber()
		}
	},

});

/**
 * 
 * @private
 *
 * Replication Protocol
 *
 */

Ext.define('Ext.data.Protocol', {

	logger: Ext.util.Logger,

	constructor: function(local) {
		this.version= 2;
		this.local= local;
  	},

	sync: function(callback,scope) {
		var self= this;
		this.sendGetUpdate({},function(r){
			self.logger.debug('Protocol.sync: done',r)
			callback.call(scope,r)
		});
	},

	// private

	sendGetUpdate: function(r,callback) {
		this.logger.debug('Protocol.sendGetUpdate')
		var self= this;
		Ext.io.getService({
			name: "sync", 
			success: function(service) {
				var message= {
					dd: this.local.databaseDefinition.config,
					rd: this.local.replicaDefinition.config,
					csv: this.local.csv.encode()
				};
				service.getUpdates(
					function(response){
						self.receiveResponse(response,r,function(){
							var updates_csv= Ext.create(Ext.io.ds.CSV).decode(response.updates_csv);
							var required_csv= Ext.create(Ext.io.ds.CSV).decode(response.required_csv);
							self.updateLocalState(self.local,updates_csv,function(){
								var updates= new Ext.data.Updates().decode(response.updates);
								r.received= updates.length();
								self.local.putUpdates(updates,updates_csv,function(response){
									self.sendPutUpdate(required_csv,r,callback)
								},this);
							},this);
						});
					},
					message
				);
			},
			failure: callback,
			scope: this
		});
	},

	receiveResponse: function(response,r,callback){
		this.logger.debug('Protocol.receiveResponse',response)
    	switch(response.r){
		case 'ok':
			callback();
    		break;
 		case 'new_replica_number':
 			//
			// A replica number collision, or re-initialization, has occured. 
			// In either case we must change our local replica number.
			//
			r.new_replica_number= response.replicaNumber;
			this.logger.info('Protocol.receiveResponse: Change local replica number to',response.replicaNumber)
	    	this.local.setReplicaNumber(response.replicaNumber,function(){
				this.sendGetUpdate(r,callback);
			},this);
			break;
		case 'new_generation_number':
			//
			// The database generation has changed. We clear out the database,
			// and update the definition. 
			//
			if (response.generation>this.local.definition.generation) {
				r.new_generation_number= response.generation;
				this.local.definition.set({generation:response.generation},function(){
					this.local.reset(function(){
						this.sendGetUpdate(r,callback);
					},this);
				},this);
			} else {
				// local is the same, or greater than the server.
			}
			break;
		case 'error':
			this.logger.error("Protocol.receiveResponse: The server returned the error '"+response.message+"'");
			callback();
			break;
		default:
			this.logger.error('Protocol.receiveResponse: Received unknown message:',response);
			callback();
		}
	},

	sendPutUpdate: function(remote_csv,r,callback) {
		this.logger.debug('Protocol.sendPutUpdate',remote_csv)
		r.sent= 0;
		r.r= 'ok';
		if(!remote_csv.isEmpty()){
			this.local.getUpdates(remote_csv,function(updates,local_csv){
				if((updates && !updates.isEmpty()) || (local_csv && !local_csv.isEmpty())){
					Ext.io.getService({
						name:"sync", 
						success: function(service) {
							r.sent= updates.length();
							var message= {
								dd: this.local.databaseDefinition.config,
								rd: this.local.replicaDefinition.config,
								csv: this.local.csv.encode(),
								updates: Ext.encode(updates.encode())
							};
						    service.putUpdates(
							    function(r2){
							    	Ext.apply(r,r2);
							    	callback(r);
								},
							    message
							);
						},
						failure: callback,
						scope: this
					});
				}else{
					this.logger.debug('Protocol.sendPutUpdate: no work');
					callback(r);
				}
			},this);
		}else{
			this.logger.debug('Protocol.sendPutUpdate: no work');
			callback(r);
		}
	},

	updateLocalState: function(local,csv,callback,scope) {
		new Ext.data.Transaction(local,function(t){
			//
			// The remote CSV describes the state of updated-ness of the
			// server this client is talking to. We add any replica numbers
			// that are new to us to our local CSV.
			//
		  	t.updateReplicaNumbers(csv);
			//
			// And we update the CS generator with the maximum CS in the
			// CSV, so that the local time is bumped forward if one of 
			// the other replicas is ahead of us.
			//
			// We do this ahead of receiving updates to ensure that any
			// updates we generate will be ahead of the updates that
			// were just received. 
			//
			t.updateGenerator(csv);
			t.commit(callback,scope);
		},this);
	},

});


/**
 * 
 * @private
 *
 * Transaction
 *
 * A Transaction wraps an implementation of the proxy, 
 * providing for caching of reads, and group commit of writes.
 */
 
Ext.define('Ext.data.Transaction', { 

	logger: Ext.util.Logger,

	constructor: function(proxy,callback,scope) {
		this.proxy= proxy;
		this.store= proxy.store;
		this.generatorChanged= false;
		this.originalGenerator= proxy.generator;
		this.modifiedGenerator= Ext.create(Ext.io.ds.LogicalClock,proxy.generator);
		this.csvChanged= false;
		this.originalCSV= proxy.csv;
		this.modifiedCSV= Ext.create(Ext.io.ds.CSV,proxy.csv); // copy the csv
		this.cache= {}; // read cache of records
		this.toCreate= []; // records to create
		this.toUpdate= []; // records to update
		this.toDestroy= []; // records to destroy
		this.store.getIndex(function(index){
			this.indexChanged= false;
			this.index= index; // id to oid index
			this.store.getCSIndex(function(csiv){
				this.csivChanged= false;
				this.csiv= csiv
				callback.call(scope,this);
			},this);
		},this);
	},
	
	generateChangeStamp: function() {
		var cs= this.modifiedGenerator.generateChangeStamp();
		this.modifiedCSV.addCS(cs);
		this.generatorChanged= true;
		this.csvChanged= true;
		return cs;
	},

  	create: function(records) {
		this.addToCache(records);
		this.addToList(this.toCreate,records);
 	 },

    readById: function(id,callback,scope) {
        this.lookupIDIndex(id,function(oid){
            this.readByOid(oid,callback,scope);
        },this);
    },

 	readByOid: function(oid, callback, scope) {
		var record= this.cache[oid];
		if(record){
			callback.call(scope,record);
		}else{
			this.store.readByOid(oid,function(record){
				this.addToCache(record);
				callback.call(scope,record);
			},this);
		}
  	},

    readByOids: function(oids, callback, scope) {
    	var records= [];
    	var readOids= [];
        var i, l= oids.length;
        for(i=0;i<l;i++){
        	var oid= oids[i];
			var record= this.cache[oid];
			if(record){
				records.push(record);
			}else{
				readOids.push(oid)
			}
		}
        this.store.readByOids(readOids,function(records2){
			this.addToCache(records2);
			records= records.concat(records2);
			callback.call(scope,records);
        },this);
    },

 	update: function(records) {
		this.addToCache(records);
		this.addToList(this.toUpdate,records);
	},

	destroy: function(oid) {
		this.toDestroy.push(oid);
	},

	indexCreatedRecords: function(records, idProperty) {
        records.forEach(function(record){
        	var data= record.getData();
            var record_id= data[idProperty];
            if (record_id) {
                this.updateIDIndex(record_id,record.getOid());
            }
        },this);
    },

    indexDestroyedRecords: function(records, idProperty) {
        records.forEach(function(record){
        	var data= record.getData();
            var record_id= data[idProperty];
            if (record_id) {
                this.updateIDIndex(record_id,undefined);
            }
        },this);
    },

	updateIDIndex: function(id,oid) {
		this.indexChanged= this.index[id]!=oid;
		this.index[id]= oid;
	},

	lookupIDIndex: function(id,callback,scope) {
		callback.call(scope,this.index[id]);
	},
	
	updateCS: function(from,to,oid) {
		if(from && to){
			if(!from.equals(to)){
				this.csvChanged= this.modifiedCSV.addX(to) || this.csvChanged;
				this.csivChanged= true;
				//this.csiv.remove(from,oid);
				this.csiv.add(to,oid);
			}
		}else if(from){
			//this.csivChanged= true;
			//this.csiv.remove(from,oid);
		}else if(to){
			this.csvChanged= this.modifiedCSV.addX(to) || this.csvChanged;
			this.csivChanged= true;
			this.csiv.add(to,oid);
		}
	},
	
	updateCSV: function(csv) {
		this.csvChanged= this.modifiedCSV.addX(csv) || this.csvChanged;
	},
	
	updateReplicaNumbers: function(csv) {
		this.csvChanged= this.modifiedCSV.addReplicaNumbers(csv) || this.csvChanged;
	},
	
	updateGenerator: function(csv) {
		this.generatorChanged= this.originalGenerator.seenCSV(csv);
	},
	
	commit: function(callback, scope) {
		//
		// Work out which records are to be created or updated.
		//
		this.toCreate= Ext.Array.unique(this.toCreate);
		this.toUpdate= Ext.Array.unique(this.toUpdate);
		this.toUpdate= Ext.Array.difference(this.toUpdate,this.toCreate);
		var createRecords= this.getRecordsForList(this.toCreate);
		var updateRecords= this.getRecordsForList(this.toUpdate);
		this.store.create(createRecords,function(){
			this.store.update(updateRecords,function(){
				this.store.destroy(this.toDestroy,function(){
					this.store.setIndex(this.indexChanged ? this.index : undefined,function(){
						this.store.setCSIndex(this.csivChanged ? this.csiv : undefined,function(){
							this.writeConfig_CSV(function(){
								this.writeConfig_Generator(function(){
									callback.call(scope,createRecords,updateRecords);
								},this);
							},this);
						},this);
					},this);
				},this);
			},this);
		},this);
	},
	
	// private

	writeConfig_Generator: function(callback,scope){
		if(this.generatorChanged){
			this.originalGenerator.set(this.modifiedGenerator);
			this.proxy.writeConfig_Generator(callback,scope);
		}else{
			callback.call(scope);
		}
	},

	writeConfig_CSV: function(callback,scope){
		if(this.csvChanged){
			this.originalCSV.addCSV(this.modifiedCSV);
			this.generatorChanged= this.originalGenerator.seenCSV(this.originalCSV);
			this.proxy.writeConfig_CSV(callback,scope);
		}else{
			callback.call(scope);
		}
	},

	addToCache: function(records) {
		if(records){
			if(Ext.isArray(records)){
				var l= records.length;
				for(var i=0;i<l;i++){
					var record= records[i];
					this.addToCache(record);
				}
			}else{
				var oid= records.getOid();
				if(oid!==undefined){
					this.cache[oid]= records;
				}else{
					this.logger.error('Transaction.addToCache: Tried to add a record without an oid.',records);
				}
			}
		}
	},
	
	addToList: function(list,records) {
		if(records){
			if(Ext.isArray(records)){
				var l= records.length;
				for(var i=0;i<l;i++){
					var record= records[i];
					var oid= record.getOid();
					list.push(oid);
				}
			}else{
				list.push(records.getOid());
			}
		}
	},
	
	getRecordsForList: function(list) {
		var records= [];
		var l= list.length;
		for(var i=0;i<l;i++){
			var id= list[i];
			records.push(this.cache[id]);
		}
		return records;
	}
		
});

  
  

/**
 * 
 * @private
 *
 * Updates
 *
 * An ordered list of updates, where an update is an assertion of 
 * an attribute's value at a point in time, defined by a Change
 * Stamp.
 */

Ext.data.Update= {

    asString: function(u) {
    	if(Ext.isArray(u)){
    		return '['+Ext.Array.map(u,Ext.data.Update.asString).join(', ')+']';
    	}else if(u instanceof Ext.data.Updates){
    		return Ext.data.Update.asString(u.updates);
    	}else{
	        var p= Ext.isArray(u.p) ? u.p.join() : u.p;
	        var v= u.v;
	        switch (typeof u.v) {
	            case 'object':
	                v= Ext.encode(u.v);
	        }
	        return '('+u.i+' . '+p+' = \''+v+'\' @ '+u.c.to_s()+')';
    	}
    },
 	
 };

Ext.define('Ext.data.Updates', { 

	updates: undefined,
	
	constructor: function(x) {
		//
		// sort the updates into change stamp order,
		// as they have to be transmitted this way
		//
		this.updates= x||[];
		this.updates.forEach(function(update) {
			if (!(update.c instanceof Ext.io.ds.CS)) {
				update.c= new Ext.io.ds.CS(update.c)
			}
		});
		this.updates.sort(function(a,b) {return a.c.compare(b.c)});
	},
	
	push: function(update) {
		// assert - update must have a cs greater than the last element
		var last= this.updates[this.updates.length];
		if (!update.c.greaterThan(last.c)) { throw "Error - Updates - Tried to push updates in wrong order. "+Ext.encode(update)+" <= "+Ext.encode(last) }
		this.updates.push(update);
	},
	
	isEmpty: function() {
		return this.updates.length<1;
	},
	
	length: function() {
		return this.updates.length;
	},

	idsChanged: function(idProperty) {
		var ids= [];
		this.updates.forEach(function(update){
			if(update.p===idProperty){
				ids.push(update.v);
			}
		});
		return Ext.Array.unique(ids);
	},

	oids: function() {

		return Ext.Array.unique(Ext.Array.pluck(this.updates,'i'));
	},

	forEach: function(callback,scope) {
		this.updates.forEach(callback,scope);
	},

	chunks: function(chunk_size) {
		var r= [];
		var l= this.updates.length;
		var n= (l/chunk_size)+1;
		for(var i=0;i<n;i++) {
			var start= i*chunk_size;
			var end= start+chunk_size;
			var t= new Ext.data.Updates();
			t.updates= this.updates.slice(start,end)
			r.push(t);
		}
		return r;
	},

	/**
	 * Optimization- If a subsequent update has the same Object Identifier
	 * as the preceeding update then we omit the OID.
	 */
	encode: function() {
		// JCM optimize - "" around i and p and cs is not needed
		// JCM optimize - diff encode cs 1-123, +1-0, +0-1, 1-136-4, +1-0, ...
		var r= [];
		var l= this.updates.length;
		var prev_i, update, cs;
		for(var i=0;i<l;i++) {
			update= this.updates[i];
			cs= ((update.c instanceof Ext.io.ds.CS) ? update.c.to_s() : update.c);
			if (update.i===prev_i) {
				r.push([update.p, update.v, cs]);
			} else {
				r.push([update.i, update.p, update.v, cs]);
				prev_i= update.i;
			}
		}
		return r;
	},
		
	decode: function(x) {
		this.updates= [];
		if (x) {
			var l= x.length;
			var update, prev_i, id, p, v, c;
			for(var i=0;i<l;i++) {
				update= x[i];
				switch(update.length) {
					case 3:
						id= prev_i;
						p= update[0];
						v= update[1];
						c= update[2];
						break;
					case 4:
						id= update[0];
						p= update[1];
						v= update[2];
						c= update[3];
						prev_i= id;
						break;
				}
				c= ((c instanceof Ext.io.ds.CS) ? c : new Ext.io.ds.CS(c));
				this.updates.push({i:id,p:p,v:v,c:c});
			}
		}
		return this;
	},
	
});

  
  

/**
 * 
 * @private
 *
 * Sync Model
 *
 */

Ext.data.SyncModel= {	

    areDecorated: function(records) {
        return Ext.Array.every(records,function(record){
	    	return (record.eco!==undefined && record.eco!==null);
        });
    },

	isDestroyed: function(r) { // test if a record has been deleted
		var t= (r||this).data._ts
		return (t!==null && t!==undefined && t!=='');
	},

	isNotDestroyed: function(r) { // test if a record has been deleted
		var t= (r||this).data._ts;
		return (t===null || t===undefined || t==='');
	},

};


Ext.data.ModelWrapper= {

	getOid: function() {
		return this.eco.getOid();
	},

	getCS: function(path) {
		return this.eco.getCS(path);	
	},

	getCSV: function(){
		return this.eco.getCSV();
	},

	setValueCS: function(t,path,values,new_cs){
		return this.eco.setValueCS(t,path,values,new_cs);
	},

	ref: function() {
		return this.data._ref;
	},
    
	changeReplicaNumber: function(old_replica_number,new_replica_number) {
		return this.eco.changeReplicaNumber(old_replica_number,new_replica_number);
	},

	setUpdateState: function(t) {
		var changes= this.getChanges();
		for (name in changes) {
			if (name!==Ext.data.SyncModel.STATE && name!==Ext.data.SyncModel.OID) {
				this.setUpdateStateValue(t,[name],this.modified[name],changes[name]);
			}
		}
	},
	
	setUpdateStateValue: function(t,path,before_value,after_value) {
		//console.log('setUpdateStateValue',path,before_value,after_value)
		if (this.eco.isComplexValueType(after_value)) {
			if (before_value) {
				var added= {};
				if (this.eco.isComplexValueType(before_value)) {
					if (this.eco.valueType(before_value)===this.eco.valueType(after_value)) {
						added= Ext.Array.difference(after_value,before_value);
						var changed= Ext.Array.intersect(after_value,before_value);
						for(var name2 in changed) {
							if (changed.hasOwnProperty(name2)) {							
								if (before_value[name2]!==after_value[name2]) {
									added[name2]= after_value[name2]
								}
							}
						}
					} else {
						added= after_value;
						this.eco.setCS(t,path,t.generateChangeStamp()); // value had a different type before, a complex type
					}
				} else {
					added= after_value;
					this.eco.setCS(t,path,t.generateChangeStamp()); // value had a different type before, a primitive type
				}
			} else {
				added= after_value;
				this.eco.setCS(t,path,t.generateChangeStamp()); // value didn't exist before
			}
			for(var name2 in added) {
				if (added.hasOwnProperty(name2)) {
					var next_before_value= before_value ? before_value[name2] : undefined;
					this.setUpdateStateValue(t,path.concat(name2),next_before_value,after_value[name2]);
				}
			}
		} else {
			this.eco.setCS(t,path,t.generateChangeStamp()); // value has a primitive type
		}
	},

	setDestroyState: function(t) {
		var cs= t.generateChangeStamp();
		this.eco.setValueCS(t,'_ts',cs.to_s(),cs);
	},
	
	getUpdates: function(csv) {
		return this.eco.getUpdates(csv);
	},
	
	putUpdate: function(t,update) {
		return this.eco.setValueCS(t,update.p,update.v,update.c);
	},
	
};

Ext.define('Ext.data.identifier.CS', {
    alias: 'data.identifier.cs',
    
    config: {
        model: null
    },

    constructor: function(config) {
        this.initConfig(config);
    },

    generate: function(record) {
        return undefined;
    }
});




