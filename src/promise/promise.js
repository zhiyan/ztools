/**
 * polyfill of ES6 Promises
 * v0.0.1 zhiyan
 */

(function( name, context, def ){
	context[name] || ( context[name] = def);
	if (typeof module != "undefined" && module.exports) { module.exports = context[name]; }
	else if (typeof define == "function" && define.amd) { define(function(){ return context[name]; }); }
}).call( "Promise", typeof global != 'undefined' ? global : this, function(){
	"use strict";

	var timer = typeof setImmediate === "function" ? setImmediate : setTimeout;
	
	function go( q, msg ){
		timer(function(){
			if( q.length ){
				( q.pop() ).call(void 0, msg);
			}
		});
	}
	function resolve( msg ){
		go(this.queueSucc,msg);
	}

	function reject( msg ){
		go(this.queueFial,msg);
	}

	function Promise( fn ){

		var that = this;

		if( typeof fn !== 'function' ){
			throw TypeError("Not a function.");
		}
		this["then"] = function( resolve, reject ){
			if( typeof resolve !== "function" || typeof reject !== "function" ){
				throw TypeError("Not a function.");
			}
			this.queueSucc.push(resolve);
			this.queueFail.push(reject);
		};

		this.queueSucc = [];
		this.queueFail = [];

		try{
			fn.call( 
				void 0, 
				function( msg ){
					resolve.call(that, msg);
				} , 
				function( msg ){
					resolve.call(that, msg);
				});
		}catch( err ){
			reject.call(this,err);
		}
		return this;
	}

	Promise.reject = function( msg ){
		var constructor = this;
		return new constructor(function(resolve,reject){
			if( typeof resolve !== "function" || typeof reject !== "function" ){
				throw TypeError("Not a function.");
			}
			reject( msg );
		});
	};

	Promise.resolve = function( msg ){
		var constructor = this;
		return new constructor(function(resolve,reject){
			if( typeof resolve !== "function" || typeof reject !== "function" ){
				throw TypeError("Not a function.");
			}
			resolve( msg );
		});
	};
});
