(function() {
	'use strict';
	
	var ngSoap = angular.module('ngSoap', ['base64']);
	
	function $SoapParamSerializerProvider() {		
		this.$get = function() {
			return function soapParamSerializer(params) {
				if(!params) {
					return '';
				}
				
				return serializeParams(params);
			};
		};
		
		function serializeParams(params) {
			var xml = '';
			
			angular.forEach(params, function(param, key) {
				switch(typeof(param)) {
					case 'string':
					case 'number':
					case 'object': 
					case 'boolean':
						xml += '<' + key + '>' + serializeParam(param) + '</' + key + '>';
				}
			});
			
			return xml;
		}
				
		function serializeParam(param) {
			var value = '';
			if(angular.isString(param)) {
				value += param.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			}
			else if(angular.isDate(param)) {
				value += param.toISOString();
			}
			else if(angular.isObject(param)) {
				angular.forEach(param, function(p) {
					(/function\s+(\w*)\s*\(/ig).exec(p.constructor.toString());					
                    var type = RegExp.$1;
                        switch(type)
                        {
                            case '':
                                type = typeof(o[p]);
                            case 'String':
                                type = 'string'; break;
                            case 'Number':
                                type = 'int'; break;
                            case 'Boolean':
                                type = 'bool'; break;
                            case 'Date':
                                type = 'DateTime'; break;
                        }
                        value += '<' + type + '>' + serializeParam(p) + '</' + type + '>';
				});
			}
			else {
				value += param.toString();
			}
			
			return value;			
		}
	}
	
	function $SoapProvider($httpBackend, $q, $cacheFactory) {
		var defaultCache = $cacheFactory('$soap');
		
		var defaults = this.defaults = {
			
		};
		
		
		function $soap() {
			
		}
		
		$soap.defaults = defaults;
		
		return $soap;
	}
	
	$SoapProvider.$inject = ['$httpBackend', '$q', '$cacheFactory'];
	
	ngSoap.provider('$soap', $SoapProvider);
})();