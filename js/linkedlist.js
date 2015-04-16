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
				this.length--;
			} else {
				current = this.head;
				while(current && current.next) {
					if (current.next.data === val) {
						current.next = current.next.next;
						this.length--;
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
			result += current.data + '(' + typeof current.data + ')';
			while(current.next) {
				current = current.next;
				result += ' -> ' + current.data + '(' + typeof current.data + ')';
			}
		}
		return result;
	};

	return LinkedList;
})();

$(document).ready(function() {
	testLinkedList();
});

function testLinkedList() {
	var list = new LinkedList();
	$('.code-result').append("var list = new LinkedList();\n" + list.toString() + "\nlength: " + list.getLength() + "\n\n");
	list.append('5');
	$('.code-result').append("list.append('5');\n" + list.toString() + "\nlength: " + list.getLength() + "\n\n");
	list.append(5);
	$('.code-result').append("list.append('5');\n" + list.toString() + "\nlength: " + list.getLength() + "\n\n");
	list.append('item');
	$('.code-result').append("list.append('item');\n" + list.toString() + "\nlength: " + list.getLength() + "\n\n");
	list.append(true);
	$('.code-result').append("list.append(true);\n" + list.toString() + "\nlength: " + list.getLength() + "\n\n");
	list.remove('item');
	$('.code-result').append("list.remove('item');\n" + list.toString() + "\nlength: " + list.getLength() + "\n\n");
	list.remove('true');
	$('.code-result').append("list.remove('true');\n" + list.toString() + "\nlength: " + list.getLength() + "\n\n");
	list.remove('5');
	$('.code-result').append("list.remove('5');\n" + list.toString() + "\nlength: " + list.getLength() + "\n\n");
}