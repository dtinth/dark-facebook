
function clone(prototype) {
	var c = function() {};
	c.prototype = prototype;
	return new c();
}

function ChainedAction(prototype) {
	function Chain() {
	}
	Chain.prototype = clone(prototype);
	Chain.prototype.constructor = Chain;
	Chain.prototype.chain = function(action) {
		var next = new Chain();
		next.source = this;
		next.run = action;
		return next;
	};
	return new Chain();
}

module.exports = ChainedAction;

