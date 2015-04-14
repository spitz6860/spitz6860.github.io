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

		if (this.head === null) {
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
		if (this.head !== null) {
			var current = this.head;
			if (current.data === val) {
				this.head = current.next;
				this.length--;
			} else {
				var prev = current; 
				while(current.next !== null) {
					if (current.data === val) {
						prev.next = current.next;
						this.length--;
					}

					prev = current;
					current = current.next;
				}

				if (current.value === val) {
					prev.next == null;
					this.length--;
				}
 			}
		}
	};

	LinkedList.prototype.getLength = function() {
		return this.length;
	};

	LinkedList.prototype.toString = function() {
		var result = '';

		if (this.head !== null) {
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

var list = new LinkedList();
list.append(5);
list.append(3);
list.append(3);
list.append(3);
list.append(2);
console.log(list.toString());
list.remove(3);
list.remove(5);
console.log(list.toString());