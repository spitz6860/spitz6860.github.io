var a = [3,7,5,6,1]; 
var b = [2,4,0,3,1];

function permute(a, b) {
	var result = [];
	for (var i = 0; i < a.length; i++){ 
		result.push(a[b.indexOf(i)]);
	}
	return result;
}
console.log(permute(a,b));