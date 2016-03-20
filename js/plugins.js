/**
 * JS Library v0
 */

var UTILS = (function () {

	return {
		/**
		 * Check if a given value is a plain Object
		 *
		 * @param  {*}       o Any value to be checked
		 * @return {Boolean}   true if it's an Object
		 */
		isObject: function (o) {
			var toString = Object.prototype.toString;
			return (toString.call(o) === toString.call({}));
		},
		addEvent:function(elem,type,handler){
			if(typeof addEventListener!=="undefined"){
				elem.addEventListener(type,handler,false);
			}
			else if(typeof attachEvent!=="undefined"){
				elem.attachEvent("on"+type,handler);
			}
			else{
				elem["on"+type]=handler;
			}
		},
		 removeEvent:function(elem,type,handler){
			if(typeof removeEventListener!=="undefined"){
				elem.removeEventListener(type,handler,false);
			}
			else if(typeof attachEvent!=="undefined"){
				elem.detachEvent("on"+type,handler);
			}
			else{
				elem["on"+type]=null;
			}
		},
		/*preventDefault:function(event){
			if(typeof event.preventDefault!=="undefined"){
				event.preventDefault();

			}else {
				event.returnValue=false;
			}
		},*/


	};
}());








