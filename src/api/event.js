const add = function(obj, type, fn) {
	if(obj.addEventListener) {
		obj.addEventListener(type, fn, true);
	} else if(obj.attachEvent) {
		obj.attachEvent("on"+type, fn);
	}
};
const remove = function(obj, type, fn) {
	try {
		if(obj.removeEventListener) {
			obj.removeEventListener(type, fn, true);
		} else if(obj.detachEvent) {
			obj.detachEvent("on"+type, fn);
		}
	} catch(err) {}
};
export default {
	add,
	remove,
}