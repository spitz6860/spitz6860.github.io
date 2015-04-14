var Node = (function () {
	function Node(data, next) {
		this.data = data;
		this.next = next;
	}
	return Node;
})();

var LinkedList = (function () {

	function LinkedList() {
		this.head = null;
		this.length = 0;
	}

	LinkedList.prototype.append = function(val) {
		var node = new Node(val, null);

		if (!this.head) {
			this.head = node;
		} else {
			current = this.head;
			while(current.next) {
				current = current.next;
			}
			current.next = node;
		}
		this.length++;
	};

	LinkedList.prototype.remove = function(val) {
		if (this.head) {
			if (this.head.data === val) {
				this.head = this.head.next;
			} else {
				current = this.head;
				while(current && current.next) {
					if (current.next.data === val) {
						current.next = current.next.next;
					}
					current = current.next;
				}
			}
		}
	};

	LinkedList.prototype.getLength = function() {
		return this.length;
	};

	LinkedList.prototype.toString = function() {
		var result = '';

		if (this.head) {
			// thank you loosely typed language
			var current = this.head;
			result += current.data;
			while(current.next) {
				current = current.next;
				result += ' -> ' + current.data;
			}
		}
		return result;
	};

	return LinkedList;
})();