/**
 * @name eidos
 * @description 支持依赖注入的模拟类
 * @author zhiyan
 * @date 2015-1-27
 */

(function( name, def ){
	var context = this;
	context[name] || ( context[name] = def());
	if (typeof module != "undefined" && module.exports) { module.exports = context[name]; }
	else if (typeof define == "function" && define.amd) { define(function(){ return context[name]; }); }
}).call( typeof global != 'undefined' ? global : this, "Eidos", function(){
	"use strict";

	function Eidos( name ){
		this.name = name || "";
	}

	Eidos.prototype.service = function( name, fn ){
		if( typeof fn === "function" ){
			this[name] = fn;
		}
	}
	Eidos.prototype.controller = function( fn ){
		var params = fn.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].split(","),
			that = this;
		params.forEach(function(v,i){
			v = v.replace(/\s/g,"");
			params[ i ] = that[ v ].bind(that) || function(){};
		});
		this.controller = function(){
			fn.apply( that , params );
		}
	}
	return Eidos;
});
